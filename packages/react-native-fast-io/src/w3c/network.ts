import { ReadableStream } from 'web-streams-polyfill'

import { Network, RequestMethod } from '../native/network.nitro'
import { fromReadableStream } from './streams'

export function fetch(
  url: string,
  { body, method }: { body: ReadableStream; method: RequestMethod }
) {
  return Network.request({ method, url, body: fromReadableStream(body) })
}
