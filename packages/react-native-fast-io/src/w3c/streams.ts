import { ReadableStream, TransformStream, WritableStream } from 'web-streams-polyfill'

import { CompressorFactory, DuplexStream, InputStream, OutputStream } from '../native/streams.nitro'

export const toReadableStream = (inputStream: InputStream) => {
  const stream = new ReadableStream<Uint8Array>({
    start() {
      inputStream.open()
    },
    async pull(controller) {
      const buffer = await inputStream.read()
      if (buffer.byteLength == 0) {
        controller.close()
        return
      }

      const chunk = new Uint8Array(buffer)
      controller.enqueue(chunk)
    },
    cancel() {
      inputStream.close()
    },
  })

  return stream
}

export const toWritableStream = (outputStream: OutputStream) => {
  return new WritableStream({
    start() {
      outputStream.open()
    },
    async write(chunk: Uint8Array) {
      if (chunk.byteLength === 0) {
        return
      }
      await outputStream.write(chunk.buffer)
    },
    close() {
      outputStream.close()
    },
    abort() {
      outputStream.close()
    },
  })
}

export const fromReadableStream = (stream: ReadableStream): InputStream => {
  const duplexStream = new DuplexStream()

  const writableStream = toWritableStream(duplexStream.outputStream)
  stream.pipeTo(writableStream)

  return duplexStream.inputStream
}

export class CompressionStream implements globalThis.CompressionStream {
  readonly readable: ReadableStream<Uint8Array>
  readonly writable: WritableStream<Uint8Array>

  constructor(format: CompressionFormat) {
    const compressor = CompressorFactory.create(format)

    const { readable, writable } = new TransformStream<Uint8Array>({
      transform(chunk, controller) {
        const compressedData = compressor.compress(chunk.buffer)
        controller.enqueue(new Uint8Array(compressedData))
      },
      flush(controller) {
        const finalData = compressor.finalize()
        if (finalData.byteLength > 0) {
          controller.enqueue(new Uint8Array(finalData))
        }
      },
    })

    this.readable = readable
    this.writable = writable
  }
}

export { ReadableStream, TransformStream, WritableStream }
