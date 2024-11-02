import {
  Event,
  EventTarget,
  getEventAttributeValue,
  setEventAttributeValue,
} from 'event-target-shim'
import { NitroModules } from 'react-native-nitro-modules'

import { Blob } from './blob'
import { WebSocket as HybridWebSocket, WebSocketManager } from './WebSocket.nitro'

const manager = NitroModules.createHybridObject<WebSocketManager>('WebSocketManager')

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
 * Events
 */
export type OpenEvent = Event

export class MessageEvent extends Event {
  readonly data: string | Blob | ArrayBuffer
  constructor(data: string | Blob | ArrayBuffer) {
    super('message')
    this.data = data
  }
}

export class ErrorEvent extends Event {
  readonly error: string
  constructor(error: string) {
    super('error')
    this.error = error
  }
}

export class CloseEvent extends Event {
  readonly code: number
  readonly reason: string
  constructor(code: number = 0, reason: string = '') {
    super('close')
    this.code = code
    this.reason = reason
  }
  get wasClean() {
    throw new Error('Not implemented')
  }
}

/**
 * https://websockets.spec.whatwg.org/#interface-definition
 */
export class WebSocket
  extends EventTarget
  implements
    EventTarget<{
      open: OpenEvent
      message: MessageEvent
      error: ErrorEvent
      close: CloseEvent
    }>
{
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

  private readonly ws: HybridWebSocket

  constructor(url: string, protocols: string | string[] = []) {
    super()

    this.url = url
    this.ws = manager.create(url, Array.isArray(protocols) ? protocols : [protocols])

    this.ws.onOpen((protocol) => {
      this._readyState = WebSocketReadyState.OPEN
      this._protocol = protocol
      this.dispatchEvent(new Event('open'))
    })

    this.ws.onMessage((data) => {
      this.dispatchEvent(new MessageEvent(data))
    })

    this.ws.onArrayBuffer((buffer) => {
      if (this.binaryType === 'blob') {
        this.dispatchEvent(new MessageEvent(new Blob([buffer])))
        return
      }
      this.dispatchEvent(new MessageEvent(buffer))
    })

    this.ws.onError((message) => {
      this.dispatchEvent(new ErrorEvent(message))

      /**
       * Sending `close` frame before proceeding to close the connection
       * https://datatracker.ietf.org/doc/html/rfc6455#section-7.1.7
       */
      this._readyState = WebSocketReadyState.CLOSED
      this.dispatchEvent(new CloseEvent(ABNORMAL_CLOSURE))

      this.close()
    })

    this.ws.onClose((code, reason) => {
      this._readyState = WebSocketReadyState.CLOSED
      this.dispatchEvent(new CloseEvent(code, reason))
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

  get onopen() {
    return getEventAttributeValue(this, 'open')
  }
  set onopen(value) {
    setEventAttributeValue(this, 'open', value)
  }

  get onmessage() {
    return getEventAttributeValue(this, 'message')
  }
  set onmessage(value) {
    setEventAttributeValue(this, 'message', value)
  }

  get onerror() {
    return getEventAttributeValue(this, 'error')
  }
  set onerror(value) {
    setEventAttributeValue(this, 'error', value)
  }

  get onclose() {
    return getEventAttributeValue(this, 'close')
  }
  set onclose(value) {
    setEventAttributeValue(this, 'close', value)
  }
}
