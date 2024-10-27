import '@bacons/text-decoder/install'

import { AppRegistry, View } from 'react-native'
import { WebSocket as FastWebSocket } from 'react-native-fast-ws'

function App() {
  return <View />
}

AppRegistry.registerComponent('NitroPlayground', () => App)

const testWebsocketMessages = async (opts: {
  Ws: new (uri: string) => WebSocket
  outgoing: number
  incoming: number
  payload: string | ArrayBuffer
}): Promise<{
  outgoingTime: number
  incomingTime: number
  incomingFirstMessageTime: number
}> =>
  new Promise((resolve) => {
    const inst = new opts.Ws('ws://localhost:3000')

    let outgoingTime: number
    let incomingTime: number
    let incomingFirstMessageTime: number
    let received = 0

    inst.addEventListener('message', () => {
      if (received === 0) {
        incomingFirstMessageTime = performance.now() - incomingFirstMessageTime
        incomingTime = performance.now()
      }

      received++

      if (received === opts.incoming) {
        inst.close()
      }
    })

    inst.addEventListener('close', () => {
      resolve({
        outgoingTime,
        incomingTime: performance.now() - incomingTime,
        incomingFirstMessageTime,
      })
    })

    inst.addEventListener('open', () => {
      const start = performance.now()

      for (let i = 0; i < opts.outgoing; i++) {
        inst.send(opts.payload)
      }

      outgoingTime = performance.now() - start

      incomingFirstMessageTime = performance.now()

      inst.send(JSON.stringify({ count: opts.incoming, binary: typeof opts.payload !== 'string' }))
    })
  })

const INCOMING = 10000
const OUTGOING = 10000

setTimeout(async () => {
  const results: [string, string, number, number, number][] = []

  const resFastBinary = await testWebsocketMessages({
    // @ts-ignore
    Ws: FastWebSocket,
    outgoing: OUTGOING,
    incoming: INCOMING,
    payload: new TextEncoder().encode('Hello World'),
  })

  results.push([
    'FastWS',
    'Binary',
    resFastBinary.outgoingTime,
    resFastBinary.incomingTime,
    resFastBinary.incomingFirstMessageTime,
  ])

  const resWebSocketBinary = await testWebsocketMessages({
    Ws: WebSocket,
    outgoing: OUTGOING,
    incoming: INCOMING,
    payload: new TextEncoder().encode('Hello World'),
  })

  results.push([
    'WebSocket',
    'Binary',
    resWebSocketBinary.outgoingTime,
    resWebSocketBinary.incomingTime,
    resWebSocketBinary.incomingFirstMessageTime,
  ])

  const resFastString = await testWebsocketMessages({
    // @ts-ignore
    Ws: FastWebSocket,
    outgoing: OUTGOING,
    incoming: INCOMING,
    payload: 'Hello World',
  })

  results.push([
    'FastWS',
    'String',
    resFastString.outgoingTime,
    resFastString.incomingTime,
    resFastString.incomingFirstMessageTime,
  ])

  const resWebSocketString = await testWebsocketMessages({
    Ws: WebSocket,
    outgoing: OUTGOING,
    incoming: INCOMING,
    payload: 'Hello World',
  })

  results.push([
    'WebSocket',
    'String',
    resWebSocketString.outgoingTime,
    resWebSocketString.incomingTime,
    resWebSocketString.incomingFirstMessageTime,
  ])

  // Print the table header
  console.log('Type       | Payload | Sending (ms) | Received (ms) | TFM (ms)')
  console.log('-----------------------------------------------------------------')

  // Print each row of results
  results.forEach((result) => {
    console.log(
      `${result[0].padEnd(10)} | ${result[1].padEnd(7)} | ${result[2].toFixed(2).padEnd(12)} | ${result[3].toFixed(2).padEnd(13)} | ${result[4].toFixed(2).padEnd(8)}`
    )
  })
}, 1000)
