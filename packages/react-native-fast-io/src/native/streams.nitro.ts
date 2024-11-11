import { getHybridObjectConstructor, HybridObject, NitroModules } from 'react-native-nitro-modules'

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

export type CompressionAlgorithm = 'gzip' | 'deflate' | 'deflate-raw'

export interface CompressorFactory extends HybridObject<{ ios: 'swift' }> {
  create(algorithm: CompressionAlgorithm): Compressor
}

interface Compressor extends HybridObject<{ ios: 'swift' }> {
  compress(chunk: ArrayBuffer): ArrayBuffer
  finalize(): ArrayBuffer
}

export interface DuplexStream extends HybridObject<{ ios: 'swift' }> {
  inputStream: InputStream
  outputStream: OutputStream
}

export const DuplexStream = getHybridObjectConstructor<DuplexStream>('DuplexStream')
export const CompressorFactory =
  NitroModules.createHybridObject<CompressorFactory>('CompressorFactory')
