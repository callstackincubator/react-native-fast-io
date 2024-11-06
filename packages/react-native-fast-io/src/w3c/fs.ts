import { NitroModules } from 'react-native-nitro-modules'

import type { FileSystem } from '../native/fs.nitro'
import { toReadableStream } from './streams'

const FileSystem = NitroModules.createHybridObject<FileSystem>('FileSystem')

export const createReadableStream = (path: string) => {
  const inputStream = FileSystem.createInputStream(path)
  return toReadableStream(inputStream)
}
