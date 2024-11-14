import { getHybridObjectConstructor, HybridObject, NitroModules } from 'react-native-nitro-modules'

export interface InputStream extends HybridObject<{ ios: 'swift'; android: 'kotlin' }> {
  read(): Promise<ArrayBuffer>

  open(): void
  close(): void
}

export interface OutputStream extends HybridObject<{ ios: 'swift'; android: 'kotlin' }> {
  write(buffer: ArrayBuffer): Promise<void>

  open(): void
  close(): void
}

interface DuplexStream extends HybridObject<{ ios: 'swift'; android: 'kotlin' }> {
  inputStream: InputStream
  outputStream: OutputStream
}

export const DuplexStream = getHybridObjectConstructor<DuplexStream>('DuplexStream')

interface StreamFactory extends HybridObject<{ ios: 'swift'; android: 'kotlin' }> {
  readonly bufferSize: number
  createInputStream(path: string): InputStream
}

export const StreamFactory = NitroModules.createHybridObject<StreamFactory>('StreamFactory')

export type CompressionAlgorithm = 'gzip' | 'deflate' | 'deflate-raw'

interface CompressorFactory extends HybridObject<{ ios: 'c++'; android: 'c++' }> {
  create(algorithm: CompressionAlgorithm): Compressor
}

interface Compressor extends HybridObject<{ ios: 'c++'; android: 'c++' }> {
  compress(chunk: ArrayBuffer): ArrayBuffer
  finalize(): ArrayBuffer
}

export const CompressorFactory =
  NitroModules.createHybridObject<CompressorFactory>('CompressorFactory')
