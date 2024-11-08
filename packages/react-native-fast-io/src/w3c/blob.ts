export class Blob implements globalThis.Blob {
  private parts: Array<BlobPart>

  readonly type: string

  protected _size: number
  get size(): number {
    return this._size
  }

  constructor(parts: Array<BlobPart> = [], options: BlobPropertyBag = {}) {
    this.parts = parts
    this.type = options?.type?.toLowerCase() || ''
    this._size = calculateSize(parts)
  }

  /**
   * https://w3c.github.io/FileAPI/#slice-method-algo
   */
  slice(): Blob {
    throw new Error('Not implemented')
  }

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
            for await (const chunk of stream) {
              controller.enqueue(chunk)
            }
          }
          controller.close()
        } catch (error) {
          controller.error(error)
        }
      },
    })
  }

  async arrayBuffer() {
    const view = await this.bytes()
    return view.buffer
  }

  async bytes() {
    const result = new ArrayBuffer(this.size)
    const view = new Uint8Array(result)

    let offset = 0
    for await (const chunk of this.stream()) {
      view.set(chunk, offset)
      offset += chunk.length
    }

    return view
  }

  async text() {
    const buffer = await this.bytes()
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
