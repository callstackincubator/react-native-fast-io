import { AnyMap, HybridObject, NitroModules } from 'react-native-nitro-modules'

import { InputStream } from './streams.nitro'

export type RequestMethod = 'POST' | 'GET' | 'PUT' | 'DELETE' | 'PATCH' | 'HEAD' | 'OPTIONS'

export type RequestOptions = {
  url: string
  method: RequestMethod
  body: InputStream | null
  headers: Record<string, string>
}

export type Response = {
  status: number
  body: InputStream
  headers: AnyMap
}

export interface Network extends HybridObject<{ ios: 'swift'; android: 'kotlin' }> {
  request(opts: RequestOptions): Promise<Response>
}

export const Network = NitroModules.createHybridObject<Network>('Network')
