import { Event, EventTarget } from 'event-target-shim'
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

export class WebSocket extends EventTarget<
  {
    open: Event
    message: CustomEvent<{ message: string | ArrayBuffer }>
    error: CustomEvent<WebSocketError>
    close: CustomEvent<WebSocketClosed>
  },
  {},
  'loose'
> {
  /**
   * https://websockets.spec.whatwg.org/#ref-for-dom-websocket-url①
   */
  static readonly CONNECTING = WebSocketReadyState.CONNECTING
  static readonly OPEN = WebSocketReadyState.OPEN
  static readonly CLOSING = WebSocketReadyState.CLOSING
  static readonly CLOSED = WebSocketReadyState.CLOSED

  readonly url: string

  binaryType: 'arraybuffer' | 'blob' = 'blob'
  readyState: WebSocketReadyState = WebSocketReadyState.CONNECTING

  private readonly ws: HybridWebSocket

  constructor(url: string) {
    super()

    this.url = url
    this.ws = manager.create(url)

    this.ws.onOpen(() => {
      this.readyState = WebSocketReadyState.OPEN
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
      this.readyState = WebSocketReadyState.CLOSED
      this.dispatchEvent({ type: 'close', code: ABNORMAL_CLOSURE })

      this.close()
    })

    this.ws.onClose((event) => {
      this.readyState = WebSocketReadyState.CLOSED
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
      this.readyState === WebSocketReadyState.CLOSING ||
      this.readyState === WebSocketReadyState.CLOSED
    ) {
      return
    }

    this.readyState = WebSocketReadyState.CLOSING
    this.ws.close()
  }
}
