import { ReadableStream } from 'web-streams-polyfill'

import { FileSystem, Metadata } from '../native/fs.nitro'
import { Blob } from './blob'
import { toReadableStream } from './streams'

/**
 * https://w3c.github.io/FileAPI/#dfn-file
 */
class File extends Blob implements globalThis.File {
  name: string
  lastModified: number

  /**
   * https://w3c.github.io/FileAPI/#file-constructor
   */
  constructor(fileBits: BlobPart[], name: string, options: FilePropertyBag = {}) {
    super(fileBits, options)
    this.name = name
    this.lastModified = options.lastModified ?? Date.now()
  }

  get [Symbol.toStringTag](): string {
    return 'File'
  }

  get webkitRelativePath(): string {
    throw new Error('Not implemented')
  }
}

class NativeFile extends File {
  nativeStream: ReadableStream<Uint8Array>

  constructor({ name, path, size, lastModified }: Metadata) {
    const inputStream = FileSystem.createInputStream(path)

    super([], name, {
      lastModified,
    })

    this.nativeStream = toReadableStream(inputStream)
    this._size = size
  }

  stream() {
    return this.nativeStream
  }

  get [Symbol.toStringTag](): string {
    return 'File'
  }
}

class FileSystemFileHandle implements globalThis.FileSystemFileHandle {
  readonly kind = 'file'

  get name(): string {
    return this.#metadata.name
  }

  #metadata: Metadata

  constructor(path: string) {
    this.#metadata = FileSystem.getFileMetadata(path)
  }

  async getFile() {
    return new NativeFile(this.#metadata)
  }

  async createWritable(): Promise<FileSystemWritableFileStream> {
    throw new Error('Not implemented')
  }

  /**
   * https://fs.spec.whatwg.org/#file-system-locator-the-same-locator-as
   */
  async isSameEntry(other: FileSystemHandle): Promise<boolean> {
    return (
      other instanceof FileSystemFileHandle &&
      this.#metadata.root === other.#metadata.root &&
      this.#metadata.path === other.#metadata.path
    )
  }

  get [Symbol.toStringTag](): string {
    return 'FileSystemFileHandle'
  }
}

export async function showOpenFilePicker(): Promise<FileSystemFileHandle[]> {
  const paths = await FileSystem.showOpenFilePicker()
  return paths.map((path) => new FileSystemFileHandle(path))
}
