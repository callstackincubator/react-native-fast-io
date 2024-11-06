import { HybridObject } from 'react-native-nitro-modules'

type BinaryType = 'arraybuffer' | 'blob'

export interface WebSocket extends HybridObject<{ ios: 'swift'; android: 'kotlin' }> {
  binaryType: BinaryType

  send(message: string): void
  sendArrayBuffer(buffer: ArrayBuffer): void
  sendBlob(blob: Blob): void

  connect(): void
  close(code: number, reason: string): void
  ping(): void

  onOpen(callback: (selectedProtocol: string) => void): void
  onClose(callback: (code: number, reason: string) => void): void
  onError(callback: (error: string) => void): void

  onMessage(callback: (message: string) => void): void
  onArrayBuffer(callback: (buffer: ArrayBuffer) => void): void
  onBlob(callback: (blob: Blob) => void): void
}

export interface WebSocketManager extends HybridObject<{ ios: 'swift'; android: 'kotlin' }> {
  create(url: string, protocols: string[]): WebSocket
}

export interface Blob extends HybridObject<{ ios: 'swift' }> {
  arrayBuffer(): Promise<ArrayBuffer>
}
