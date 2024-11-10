import { HybridObject, NitroModules } from 'react-native-nitro-modules'

import { InputStream } from './streams.nitro'

export type Metadata = {
  name: string
  path: string
  root: string
  size: number
  lastModified: number
}

export interface FileSystem extends HybridObject<{ ios: 'swift' }> {
  createInputStream(path: string): InputStream
  getFileMetadata(path: string): Metadata

  showOpenFilePicker(): Promise<string[]>
}

export const FileSystem = NitroModules.createHybridObject<FileSystem>('FileSystem')
