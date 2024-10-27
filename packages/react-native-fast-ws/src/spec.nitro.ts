import { HybridObject } from 'react-native-nitro-modules'

export interface WebSocketOpen {
  proto: string
}

export interface WebSocketClosed {
  code: number
  reason: string
}

export interface WebSocketError {
  message: string
}

export interface WebSocket extends HybridObject<{ ios: 'swift' }> {
  send(message: string): void
  sendArrayBuffer(buffer: ArrayBuffer): void

  connect(): void
  close(): void

  onOpen(callback: () => void): void
  onClose(callback: (event: WebSocketClosed) => void): void
  onError(callback: (event: WebSocketError) => void): void

  // Currently variants are not supported, so we have dedicated method for each
  onMessage(callback: (message: string) => void): void
  onArrayBuffer(callback: (buffer: ArrayBuffer) => void): void
}

export interface WebSocketManager extends HybridObject<{ ios: 'swift' }> {
  create(url: string): WebSocket
}
