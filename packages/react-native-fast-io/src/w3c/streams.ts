import { ReadableStream, WritableStream } from 'web-streams-polyfill'

import { InputStream, OutputStream, PassThroughStream } from '../native/streams.nitro'

export const toReadableStream = (inputStream: InputStream) => {
  const stream = new ReadableStream<Uint8Array>({
    async start() {
      inputStream.open()
    },

    pull(controller) {
      const chunkSize = 1024 * 64
      const buffer = new ArrayBuffer(chunkSize)

      if (!inputStream.hasBytesAvailable()) {
        inputStream.close()
        controller.close()
        return
      }

      const bytesRead = inputStream.read(buffer, chunkSize)
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

    async write(chunk: ArrayBuffer) {
      if (!outputStream.hasSpaceAvailable()) {
        throw new Error('No space available in output stream')
      }

      const bytesWritten = outputStream.write(chunk, chunk.byteLength)
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
  const passThroughStream = new PassThroughStream()

  const writableStream = toWritableStream(passThroughStream.outputStream)
  stream.pipeTo(writableStream)

  return passThroughStream.inputStream
}
