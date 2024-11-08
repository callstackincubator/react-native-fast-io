import { HybridObject, NitroModules } from 'react-native-nitro-modules'

import { InputStream } from './streams.nitro'

type Metadata = {
  name: string
  size: number
  lastModified: number
}

export interface FileSystem extends HybridObject<{ ios: 'swift' }> {
  createInputStream(path: string): InputStream
  getFileMetadata(path: string): Metadata
}

export const FileSystem = NitroModules.createHybridObject<FileSystem>('FileSystem')
