import { HybridObject, NitroModules } from 'react-native-nitro-modules'

import { InputStream } from './streams.nitro'

export type Metadata = {
  name: string
  path: string
  root: string
  size: number
  type: string
  lastModified: number
}

type WellKnownDirectory = 'desktop' | 'documents' | 'downloads' | 'music' | 'pictures' | 'videos'

export type NativeFilePickerOptions = {
  multiple?: boolean
  startIn?: string
  extensions?: string[]
}

export interface FileSystem extends HybridObject<{ ios: 'swift' }> {
  createInputStream(path: string): InputStream

  getMetadata(path: string): Metadata
  getWellKnownDirectoryPath(directory: WellKnownDirectory): string

  showOpenFilePicker(options?: NativeFilePickerOptions): Promise<string[]>
}

export const FileSystem = NitroModules.createHybridObject<FileSystem>('FileSystem')
