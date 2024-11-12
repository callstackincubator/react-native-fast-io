import { HybridObject, NitroModules } from 'react-native-nitro-modules'

import { InputStream } from './streams.nitro'

export type RequestMethod = 'POST' | 'GET'

export type RequestOptions = {
  url: string
  method: RequestMethod
  body?: InputStream
}

export interface Network extends HybridObject<{ ios: 'swift' }> {
  request(opts: RequestOptions): Promise<void>
}

export const Network = NitroModules.createHybridObject<Network>('Network')
