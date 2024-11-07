import { ReadableStream } from 'web-streams-polyfill'

/**
 * https://w3c.github.io/FileAPI/#dfn-BlobPropertyBag
 */
export interface BlobPropertyBag {
  type?: string
}

/**
 * https://w3c.github.io/FileAPI/#typedefdef-blobpart
 */
type BufferSource = ArrayBuffer | ArrayBufferView
export type BlobPart = BufferSource | Blob | string

/**
 * https://w3c.github.io/FileAPI/#blob-section
 */
export class Blob {
  private parts: Array<BlobPart>

  /**
   * https://w3c.github.io/FileAPI/#attributes-blob
   */
  readonly type: string
  get size(): number {
    return calculateSize(this.parts)
  }

  constructor(parts: Array<BlobPart> = [], options: BlobPropertyBag = {}) {
    this.parts = parts
    this.type = options?.type?.toLowerCase() || ''
  }

  /**
   * https://w3c.github.io/FileAPI/#slice-method-algo
   */
  slice(): Blob {
    throw new Error('Not implemented')
  }

  /**
   * https://w3c.github.io/FileAPI/#stream-method-algo
   */
  stream() {
    const streams = this.parts.map((part) => {
      if (part instanceof Blob) {
        return part.stream()
      }
      return new ReadableStream<Uint8Array>({
        start(controller) {
          // tbd: handle all types and convert to Uint8Array
          // @ts-ignore
          controller.enqueue(part)
          controller.close()
        },
      })
    })

    return new ReadableStream<Uint8Array>({
      async start(controller) {
        try {
          for (const stream of streams) {
            const reader = stream.getReader()
            // eslint-disable-next-line no-constant-condition
            while (true) {
              const { done, value } = await reader.read()
              if (done) break
              controller.enqueue(value)
            }
          }
          controller.close()
        } catch (error) {
          controller.error(error)
        }
      },
    })
  }

  /**
   * https://w3c.github.io/FileAPI/#arraybuffer-method-algo
   */
  async arrayBuffer(): Promise<ArrayBuffer> {
    const result = new ArrayBuffer(this.size)
    const view = new Uint8Array(result)

    let offset = 0
    for await (const chunk of this.stream()) {
      view.set(chunk, offset)
      offset += chunk.length
    }

    return result
  }

  /**
   * https://w3c.github.io/FileAPI/#bytes-method-algo
   */
  async bytes(): Promise<Uint8Array> {
    const buffer = await this.arrayBuffer()
    return new Uint8Array(buffer)
  }

  /**
   * https://w3c.github.io/FileAPI/#text-method-algo
   */
  async text(): Promise<string> {
    const buffer = await this.arrayBuffer()
    return new TextDecoder().decode(buffer)
  }

  get [Symbol.toStringTag](): string {
    return 'Blob'
  }
}

// tbd: verify this
function calculateSize(parts: Array<BlobPart>): number {
  return parts.reduce((acc, part) => {
    if (part instanceof ArrayBuffer || ArrayBuffer.isView(part)) {
      return acc + part.byteLength
    }
    if (part instanceof Blob) {
      return acc + part.size
    }
    if (typeof part === 'string') {
      return acc + new TextEncoder().encode(part).length
    }
    return acc
  }, 0)
}
