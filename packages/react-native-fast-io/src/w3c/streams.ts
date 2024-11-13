import { CompressorFactory, DuplexStream, InputStream, OutputStream } from '../native/streams.nitro'

export const toReadableStream = (inputStream: InputStream) => {
  console.log('Creating ReadableStream from InputStream')
  const stream = new ReadableStream<Uint8Array>({
    async start() {
      console.log('ReadableStream.start()')
      try {
        await inputStream.open()
        console.log('InputStream opened successfully')
      } catch (error) {
        console.error('Error opening InputStream:', error)
        throw error
      }
    },
    async pull(controller) {
      console.log('ReadableStream.pull()')
      try {
        const buffer = await inputStream.read()
        console.log(`Read ${buffer.byteLength} bytes from InputStream`)

        if (buffer.byteLength === 0) {
          console.log('End of stream reached, closing controller')
          controller.close()
          return
        }

        controller.enqueue(new Uint8Array(buffer))
        console.log('Enqueued data to controller')
      } catch (error) {
        console.error('Error reading from InputStream:', error)
        throw error
      }
    },
    cancel() {
      console.log('ReadableStream.cancel()')
      try {
        inputStream.close()
        console.log('InputStream closed successfully')
      } catch (error) {
        console.error('Error closing InputStream:', error)
      }
    },
  })

  return stream
}

export const toWritableStream = (outputStream: OutputStream) => {
  console.log('Creating WritableStream from OutputStream')
  return new WritableStream({
    async start() {
      console.log('WritableStream.start()')
      try {
        await outputStream.open()
        console.log('OutputStream opened successfully')
      } catch (error) {
        console.error('Error opening OutputStream:', error)
        throw error
      }
    },
    async write(chunk: Uint8Array) {
      console.log(`WritableStream.write() with ${chunk.byteLength} bytes`)
      if (chunk.byteLength === 0) {
        console.log('Skipping empty chunk')
        return
      }

      try {
        await outputStream.write(chunk.buffer)
        console.log('Successfully wrote chunk to OutputStream')
      } catch (error) {
        console.error('Error writing to OutputStream:', error)
        throw error
      }
    },
    close() {
      console.log('WritableStream.close()')
      try {
        outputStream.close()
        console.log('OutputStream closed successfully')
      } catch (error) {
        console.error('Error closing OutputStream:', error)
      }
    },
    abort() {
      console.log('WritableStream.abort()')
      try {
        outputStream.close()
        console.log('OutputStream closed successfully on abort')
      } catch (error) {
        console.error('Error closing OutputStream on abort:', error)
      }
    },
  })
}

export const fromReadableStream = (stream: ReadableStream): InputStream => {
  console.log('Creating InputStream from ReadableStream')
  const duplexStream = new DuplexStream()
  console.log('Created DuplexStream')

  const writableStream = toWritableStream(duplexStream.outputStream)
  console.log('Piping ReadableStream to WritableStream')
  stream.pipeTo(writableStream).catch((error) => {
    console.error('Error piping stream:', error)
  })

  return duplexStream.inputStream
}

export class CompressionStream implements globalThis.CompressionStream {
  readonly readable: ReadableStream<Uint8Array>
  readonly writable: WritableStream<Uint8Array>

  constructor(format: CompressionFormat) {
    console.log(`Creating CompressionStream with format: ${format}`)
    const compressor = CompressorFactory.create(format)
    console.log('Created compressor')

    const { readable, writable } = new TransformStream<Uint8Array>({
      transform(chunk, controller) {
        console.log(`Compressing chunk of ${chunk.byteLength} bytes`)
        try {
          const compressedData = compressor.compress(chunk.buffer)
          console.log(`Compressed to ${compressedData.byteLength} bytes`)
          controller.enqueue(new Uint8Array(compressedData))
          console.log('Enqueued compressed data')
        } catch (error) {
          console.error('Error during compression:', error)
          throw error
        }
      },
      flush(controller) {
        console.log('Finalizing compression')
        try {
          const finalData = compressor.finalize()
          console.log(`Final compressed data: ${finalData.byteLength} bytes`)
          if (finalData.byteLength > 0) {
            controller.enqueue(new Uint8Array(finalData))
            console.log('Enqueued final compressed data')
          }
        } catch (error) {
          console.error('Error finalizing compression:', error)
          throw error
        }
      },
    })

    this.readable = readable
    this.writable = writable
    console.log('CompressionStream ready')
  }
}
