import '@bacons/text-decoder/install'

import { useCallback, useState } from 'react'
import { AppRegistry } from 'react-native'
import { ActivityIndicator, Button, StyleSheet, Text, View } from 'react-native'
import { WebSocket as FastWebSocket } from 'react-native-fast-ws'

type Result = {
  outgoingTime: number
  incomingTime: number
  incomingFirstMessageTime: number
}

function App() {
  return (
    <View style={styles.container}>
      <TestCase payload="Hello World" title="Test String" />
      <TestCase payload={new TextEncoder().encode('Hello World')} title="Test Binary" />
    </View>
  )
}

function Results({
  fastResults,
  wsResults,
}: {
  title: string
  fastResults: Result
  wsResults: Result
}) {
  return (
    <View>
      <View style={styles.resultRowContainer}>
        <Text style={styles.resultItem}> </Text>
        <Text style={styles.resultItem}>{`FastWS`}</Text>
        <Text style={styles.resultItem}>{`WebSocket`}</Text>
      </View>
      <ResultsRow
        title="Sending (ms)"
        fastResult={fastResults.outgoingTime}
        wsResult={wsResults.outgoingTime}
      />
      <ResultsRow
        title="Received (ms)"
        fastResult={fastResults.incomingTime}
        wsResult={wsResults.incomingTime}
      />
      <ResultsRow
        title="TFM (ms)"
        fastResult={fastResults.incomingFirstMessageTime}
        wsResult={wsResults.incomingFirstMessageTime}
      />
    </View>
  )
}

function ResultsRow({
  title,
  fastResult,
  wsResult,
}: {
  title: string
  fastResult: number
  wsResult: number
}) {
  const isFastBetter = fastResult < wsResult
  return (
    <View style={styles.resultRowContainer}>
      <Text style={styles.resultItem}>{title}</Text>
      <ResultItem result={fastResult} isBetter={isFastBetter} />
      <ResultItem result={wsResult} isBetter={!isFastBetter} />
    </View>
  )
}

function ResultItem({ result, isBetter }: { result: number; isBetter: boolean }) {
  return (
    <Text
      style={[styles.resultItem, isBetter ? styles.betterResult : styles.worseResult]}
    >{`${result.toFixed(2)}`}</Text>
  )
}

function TestCase({ payload, title }: { payload: string | ArrayBuffer; title: string }) {
  const [fastResult, setFastResult] = useState<Result | null>(null)
  const [wsResult, setWsResult] = useState<Result | null>(null)
  const [loading, setLoading] = useState(false)
  const runTest = useCallback(async () => {
    if (loading) {
      return
    }
    setLoading(true)
    const fastRes = await testWebsocketMessages({
      // @ts-ignore
      Ws: FastWebSocket,
      outgoing: OUTGOING,
      incoming: INCOMING,
      payload,
    })
    setFastResult(fastRes)
    const wsRes = await testWebsocketMessages({
      Ws: WebSocket,
      outgoing: OUTGOING,
      incoming: INCOMING,
      payload,
    })
    setWsResult(wsRes)
    setLoading(false)
  }, [loading])

  return (
    <View>
      <Button onPress={runTest} title={title} />
      {fastResult && wsResult && !loading && (
        <Results fastResults={fastResult} wsResults={wsResult} title={title} />
      )}
      {loading && <ActivityIndicator />}
    </View>
  )
}

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

const styles = StyleSheet.create({
  container: {
    marginTop: 100,
  },
  resultRowContainer: {
    flexDirection: 'row',
    padding: 10,
  },
  resultItem: {
    flex: 1,
  },
  betterResult: {
    backgroundColor: 'green',
  },
  worseResult: {
    backgroundColor: 'red',
  },
})

AppRegistry.registerComponent('NitroPlayground', () => App)
