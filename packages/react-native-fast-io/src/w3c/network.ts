import { NitroModules } from 'react-native-nitro-modules'
import { ReadableStream } from 'web-streams-polyfill'

import type { Network, RequestMethod } from '../native/network.nitro'
import { fromReadableStream } from './streams'

const Network = NitroModules.createHybridObject<Network>('Network')

export function fetch(
  url: string,
  { body, method }: { body: ReadableStream; method: RequestMethod }
) {
  return Network.request({ method, url, body: fromReadableStream(body) })
}
