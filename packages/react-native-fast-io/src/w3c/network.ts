import { Network, RequestMethod } from '../native/network.nitro'
import { Blob } from './blob'
import { fromReadableStream } from './streams'

export function fetch(
  url: string,
  { body, method }: { body: ReadableStream | Blob; method: RequestMethod }
) {
  const nativeBody = body instanceof Blob ? body.stream() : body
  return Network.request({ method, url, body: fromReadableStream(nativeBody) })
}
