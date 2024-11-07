import { ReadableStream } from 'web-streams-polyfill'

import { FileSystem } from '../native/fs.nitro'
import { Blob, BlobPart, BlobPropertyBag } from './blob'
import { toReadableStream } from './streams'

/**
 * https://w3c.github.io/FileAPI/#dfn-FilePropertyBag
 */
export interface FilePropertyBag extends BlobPropertyBag {
  lastModified?: number
}

/**
 * https://w3c.github.io/FileAPI/#dfn-file
 */
class File extends Blob {
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
}

class NativeFile extends File {
  nativeStream: ReadableStream<Uint8Array>
  override get size(): number {
    // tbd: use real size, otherwise will overflow buffer for other images
    return 234_347
  }

  constructor(path: string) {
    // tbd: return file descriptor
    const inputStream = FileSystem.createInputStream(path)

    super(
      [],
      // tbd: get name
      path,
      {
        // tbd: get last modified from native
        lastModified: Date.now(),
      }
    )

    this.nativeStream = toReadableStream(inputStream)
  }

  stream() {
    return this.nativeStream
  }

  get [Symbol.toStringTag](): string {
    return 'File'
  }
}

// tbd: convert this to FileSystemFileHandle
export const readAsFile = (path: string) => {
  return new NativeFile(path)
}
