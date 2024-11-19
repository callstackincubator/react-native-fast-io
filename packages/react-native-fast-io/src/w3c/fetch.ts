import { Network, RequestMethod } from '../native/network.nitro'
import { Blob } from './blob'
import { File } from './fs'
import { fromReadableStream, ReadableStream } from './streams'

export function fetch(
  url: string,
  { body, method }: { body: ReadableStream | Blob | File; method: RequestMethod }
) {
  const nativeBody = body instanceof Blob || body instanceof File ? body.stream() : body
  return Network.request({ method, url, body: fromReadableStream(nativeBody) })
}
