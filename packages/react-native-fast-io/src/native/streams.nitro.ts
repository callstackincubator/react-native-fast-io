import { getHybridObjectConstructor, HybridObject } from 'react-native-nitro-modules'

export interface InputStream extends HybridObject<{ ios: 'swift' }> {
  hasBytesAvailable(): boolean
  read(buffer: ArrayBuffer, maxLength: number): number

  open(): void
  close(): void
}

export interface OutputStream extends HybridObject<{ ios: 'swift' }> {
  hasSpaceAvailable(): boolean
  write(buffer: ArrayBuffer, maxLength: number): number

  open(): void
  close(): void
}

export interface PassThroughStream extends HybridObject<{ ios: 'swift' }> {
  inputStream: InputStream
  outputStream: OutputStream
}

export const PassThroughStream = getHybridObjectConstructor<PassThroughStream>('PassThroughStream')
