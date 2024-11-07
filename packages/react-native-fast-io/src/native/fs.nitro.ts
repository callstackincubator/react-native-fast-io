import { HybridObject, NitroModules } from 'react-native-nitro-modules'

import { InputStream } from './streams.nitro'

export interface FileSystem extends HybridObject<{ ios: 'swift' }> {
  createInputStream(path: string): InputStream
}

export const FileSystem = NitroModules.createHybridObject<FileSystem>('FileSystem')
