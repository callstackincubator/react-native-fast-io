import { defineEventAttribute, Event, EventTarget } from 'event-target-shim'
import { NitroModules } from 'react-native-nitro-modules'

import { Blob } from './blob'
import {
  WebSocket as HybridWebSocket,
  WebSocketClosed,
  WebSocketError,
  WebSocketManager,
} from './spec.nitro'

const manager = NitroModules.createHybridObject<WebSocketManager>('WebSocketManager')

type CustomEvent<T> = Event & T

export type OpenEvent = Event
export type MessageEvent = CustomEvent<{ message: string | ArrayBuffer }>
export type ErrorEvent = CustomEvent<WebSocketError>
export type CloseEvent = CustomEvent<WebSocketClosed>

enum WebSocketReadyState {
  CONNECTING = 0,
  OPEN = 1,
  CLOSING = 2,
  CLOSED = 3,
}

/**
 * https://datatracker.ietf.org/doc/html/rfc6455#section-7.1.5
 */
const ABNORMAL_CLOSURE = 1006

/**
 * https://websockets.spec.whatwg.org/#interface-definition
 */
export class WebSocket extends EventTarget<
  {
    open: OpenEvent
    message: MessageEvent
    error: ErrorEvent
    close: CloseEvent
  },
  {},
  'loose'
> {
  readonly CONNECTING = WebSocketReadyState.CONNECTING
  readonly OPEN = WebSocketReadyState.OPEN
  readonly CLOSING = WebSocketReadyState.CLOSING
  readonly CLOSED = WebSocketReadyState.CLOSED

  readonly url: string

  binaryType: 'arraybuffer' | 'blob' = 'blob'

  private _readyState: WebSocketReadyState = WebSocketReadyState.CONNECTING
  get readyState() {
    return this._readyState
  }

  get bufferedAmount() {
    throw new Error('Not implemented')
  }

  get extensions() {
    throw new Error('Not implemented')
  }

  private _protocol = ''
  get protocol() {
    return this._protocol
  }

  onopen: ((event: OpenEvent) => void) | null = null
  onmessage: ((event: MessageEvent) => void) | null = null
  onerror: ((event: ErrorEvent) => void) | null = null
  onclose: ((event: CloseEvent) => void) | null = null

  private readonly ws: HybridWebSocket

  constructor(url: string, protocols: string | string[] = []) {
    super()

    this.url = url
    this.ws = manager.create(url, Array.isArray(protocols) ? protocols : [protocols])

    this.ws.onOpen((protocol) => {
      this._readyState = WebSocketReadyState.OPEN
      this._protocol = protocol
      this.dispatchEvent({ type: 'open' })
    })

    this.ws.onMessage((message) => {
      this.dispatchEvent({ type: 'message', message })
    })

    this.ws.onArrayBuffer((buffer) => {
      if (this.binaryType === 'blob') {
        this.dispatchEvent({ type: 'message', message: new Blob([buffer]) })
        return
      }
      this.dispatchEvent({ type: 'message', message: buffer })
    })

    this.ws.onError((event) => {
      this.dispatchEvent({ type: 'error', ...event })

      /**
       * Sending `close` frame before proceeding to close the connection
       * https://datatracker.ietf.org/doc/html/rfc6455#section-7.1.7
       */
      this._readyState = WebSocketReadyState.CLOSED
      this.dispatchEvent({ type: 'close', code: ABNORMAL_CLOSURE })

      this.close()
    })

    this.ws.onClose((event) => {
      this._readyState = WebSocketReadyState.CLOSED
      this.dispatchEvent({ type: 'close', ...event })
    })

    this.ws.connect()
  }

  /**
   * https://websockets.spec.whatwg.org/#dom-websocket-send
   */

  send(message: string | ArrayBuffer | ArrayBufferView) {
    if (typeof message === 'string') {
      this.ws.send(message)
      return
    }

    if (message instanceof ArrayBuffer) {
      this.ws.sendArrayBuffer(message)
      return
    }

    if (ArrayBuffer.isView(message)) {
      this.ws.sendArrayBuffer(message.buffer)
      return
    }

    throw new TypeError('Invalid message type')
  }

  /**
   * https://websockets.spec.whatwg.org/#dom-websocket-close
   */
  close() {
    if (
      this._readyState === WebSocketReadyState.CLOSING ||
      this._readyState === WebSocketReadyState.CLOSED
    ) {
      return
    }

    this._readyState = WebSocketReadyState.CLOSING
    this.ws.close()
  }

  ping() {
    this.ws.ping()
  }
}

defineEventAttribute(WebSocket.prototype, 'open')
defineEventAttribute(WebSocket.prototype, 'message')
defineEventAttribute(WebSocket.prototype, 'error')
defineEventAttribute(WebSocket.prototype, 'close')
