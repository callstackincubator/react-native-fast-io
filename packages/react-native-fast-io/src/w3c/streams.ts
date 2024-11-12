import {
  CompressorFactory,
  DuplexStream,
  InputStream,
  OutputStream,
  StreamFactory,
} from '../native/streams.nitro'

export const toReadableStream = (inputStream: InputStream) => {
  const stream = new ReadableStream<Uint8Array>({
    start() {
      inputStream.open()
    },
    pull(controller) {
      const buffer = new ArrayBuffer(StreamFactory.bufferSize)

      if (!inputStream.hasBytesAvailable()) {
        inputStream.close()
        controller.close()
        return
      }

      const bytesRead = inputStream.read(buffer, StreamFactory.bufferSize)
      if (bytesRead < 0) {
        inputStream.close()
        controller.error('Error reading from stream.')
        return
      }

      if (bytesRead > 0) {
        controller.enqueue(new Uint8Array(buffer.slice(0, bytesRead)))
      }
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

      // tbd: implement better backpressure mechanism
      while (!outputStream.hasSpaceAvailable()) {
        await new Promise((resolve) => setTimeout(resolve, 1))
      }

      const bytesWritten = outputStream.write(chunk.buffer, chunk.byteLength)
      if (bytesWritten < 0) {
        throw new Error('Failed to write to output stream')
      }
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
    try {
      const compressor = CompressorFactory.create(format)

      const { readable, writable } = new TransformStream<Uint8Array>({
        transform(chunk, controller) {
          try {
            const compressedData = compressor.compress(chunk.buffer)
            controller.enqueue(new Uint8Array(compressedData))
          } catch (error) {
            console.error(error)
          }
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
    } catch (error) {
      console.error(error)
    }
  }
}
