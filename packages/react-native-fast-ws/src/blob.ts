import { ReadableStream } from 'web-streams-polyfill'

/**
 * https://w3c.github.io/FileAPI/#dfn-BlobPropertyBag
 */
interface BlobPropertyBag {
  type?: string
}

/**
 * https://w3c.github.io/FileAPI/#typedefdef-blobpart
 */
type BufferSource = ArrayBuffer | ArrayBufferView
type BlobPart = BufferSource | Blob | string

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

/**
 * https://w3c.github.io/FileAPI/#blob-section
 */
export class Blob {
  private parts: Array<BlobPart>

  /**
   * https://w3c.github.io/FileAPI/#attributes-blob
   */
  readonly size: number
  readonly type: string

  constructor(parts: Array<BlobPart> = [], options: BlobPropertyBag = {}) {
    this.parts = parts
    this.size = calculateSize(parts)
    this.type = options?.type?.toLowerCase() || ''
  }

  private async getData(): Promise<Uint8Array> {
    const view = new Uint8Array(this.size)
    let offset = 0

    for (const part of this.parts) {
      switch (true) {
        case part instanceof ArrayBuffer:
          view.set(new Uint8Array(part), offset)
          offset += part.byteLength
          break
        case ArrayBuffer.isView(part):
          view.set(new Uint8Array(part.buffer, part.byteOffset, part.byteLength), offset)
          offset += part.byteLength
          break
        case part instanceof Blob: {
          const partBuffer = await part.getData()
          view.set(new Uint8Array(partBuffer), offset)
          offset += partBuffer.byteLength
          break
        }
        case typeof part === 'string': {
          const encoded = new TextEncoder().encode(part)
          view.set(encoded, offset)
          offset += encoded.length
          break
        }
        default:
          throw new Error('Invalid blob part')
      }
    }

    return view
  }

  /**
   * https://w3c.github.io/FileAPI/#slice-method-algo
   */
  slice(start: number = 0, end: number = this.size, contentType: string = ''): Blob {
    const relativeStart = start < 0 ? Math.max(this.size + start, 0) : Math.min(start, this.size)
    const relativeEnd = end < 0 ? Math.max(this.size + end, 0) : Math.min(end, this.size)
    const span = Math.max(relativeEnd - relativeStart, 0)

    const parts: BlobPart[] = []
    let blobSize = 0

    for (const part of this.parts) {
      if (blobSize >= relativeEnd) break

      let partSize: number
      if (part instanceof ArrayBuffer || ArrayBuffer.isView(part)) {
        partSize = part.byteLength
      } else if (part instanceof Blob) {
        partSize = part.size
      } else if (typeof part === 'string') {
        partSize = new TextEncoder().encode(part).length
      } else {
        throw new Error('Invalid blob part')
      }

      if (blobSize + partSize > relativeStart) {
        const partStart = Math.max(0, relativeStart - blobSize)
        const partEnd = Math.min(partSize, partStart + span)

        if (part instanceof ArrayBuffer) {
          parts.push(part.slice(partStart, partEnd))
        } else if (ArrayBuffer.isView(part)) {
          parts.push(part.buffer.slice(part.byteOffset + partStart, part.byteOffset + partEnd))
        } else if (part instanceof Blob) {
          parts.push(part.slice(partStart, partEnd))
        } else if (typeof part === 'string') {
          const encoded = new TextEncoder().encode(part)
          parts.push(encoded.slice(partStart, partEnd))
        }

        blobSize += partEnd - partStart
      } else {
        blobSize += partSize
      }
    }

    return new Blob(parts, { type: contentType })
  }

  /**
   * https://w3c.github.io/FileAPI/#stream-method-algo
   */
  stream(): ReadableStream<Uint8Array> {
    return new ReadableStream({
      start: async (controller) => {
        controller.enqueue(await this.getData())
        controller.close()
      },
    })
  }

  /**
   * https://w3c.github.io/FileAPI/#arraybuffer-method-algo
   */
  async arrayBuffer(): Promise<ArrayBuffer> {
    const view = await this.getData()
    return view.buffer
  }

  /**
   * https://w3c.github.io/FileAPI/#bytes-method-algo
   */
  async bytes(): Promise<Uint8Array> {
    return await this.getData()
  }

  /**
   * https://w3c.github.io/FileAPI/#text-method-algo
   */
  async text(): Promise<string> {
    const view = await this.getData()
    return new TextDecoder().decode(view)
  }

  get [Symbol.toStringTag](): string {
    return 'Blob'
  }
}
