import { HybridObject } from 'react-native-nitro-modules'

export interface WebSocket extends HybridObject<{ ios: 'swift'; android: 'kotlin' }> {
  send(message: string): void
  sendArrayBuffer(buffer: ArrayBuffer): void

  connect(): void
  close(): void
  ping(): void

  onOpen(callback: (selectedProtocol: string) => void): void
  onClose(callback: (code: number, reason: string) => void): void
  onError(callback: (error: string) => void): void

  onMessage(callback: (message: string) => void): void
  onArrayBuffer(callback: (buffer: ArrayBuffer) => void): void
}

export interface WebSocketManager extends HybridObject<{ ios: 'swift' }> {
  create(url: string, protocols: string[]): WebSocket
}
