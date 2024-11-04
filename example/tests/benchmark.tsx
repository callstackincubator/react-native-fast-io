import React, { useCallback, useState } from 'react'
import {
  ActivityIndicator,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native'
import { WebSocket as FastWebSocket } from 'react-native-fast-ws'

import {
  CHAT_PAYLOAD,
  CHAT_PAYLOAD_BINARY,
  CHAT_SERVER_BINARY_PORT,
  CHAT_SERVER_PORT,
  COORDINATE_PAYLOAD,
  COORDINATE_PAYLOAD_BINARY,
  COORDINATE_SERVER_BINARY_PORT,
  COORDINATE_SERVER_PORT,
  IMAGE_SERVER_PORT,
} from '../server/payloads'

type TestResult = {
  outgoingTime: number
  incomingTime: number
  messageCount: number
  implementation: 'FastWS' | 'WebSocket'
  testCase: string
  totalTime: number
}

type TestCase = {
  Ws: new (uri: string) => WebSocket
  port: number
  messageCount: number
  testCase: string
  payload?: string | ArrayBuffer | Uint8Array
}

const TESTS = [
  {
    name: 'Chat Text',
    port: CHAT_SERVER_PORT,
    payload: CHAT_PAYLOAD,
    runs: [100, 1000, 10000],
  },
  {
    name: 'Chat Binary',
    port: CHAT_SERVER_BINARY_PORT,
    payload: CHAT_PAYLOAD_BINARY,
    runs: [100, 1000, 10000],
  },
  {
    name: 'Coordinates Text',
    port: COORDINATE_SERVER_PORT,
    payload: COORDINATE_PAYLOAD,
    runs: [100, 1000, 10000],
  },
  {
    name: 'Coordinates Binary',
    port: COORDINATE_SERVER_BINARY_PORT,
    payload: COORDINATE_PAYLOAD_BINARY,
    runs: [100, 1000, 10000],
  },
  {
    name: 'Image Binary',
    port: IMAGE_SERVER_PORT,
    runs: [100],
  },
]

const BASE_URL = Platform.OS === 'android' ? 'ws://10.0.2.2' : 'ws://localhost'

export function BenchmarkUI() {
  return (
    <ScrollView style={styles.container}>
      <Text style={styles.header}>WebSocket Benchmark</Text>
      {TESTS.map((test) => (
        <TestSection key={test.name} test={test} />
      ))}
    </ScrollView>
  )
}

function TestSection({ test }: { test: (typeof TESTS)[0] }) {
  return (
    <View style={styles.section}>
      <Text style={styles.sectionHeader}>{test.name}</Text>
      {test.runs.map((count) => (
        <TestCase key={`${test.name}-${count}`} test={test} messageCount={count} />
      ))}
    </View>
  )
}

function TestCase({ test, messageCount }: { test: (typeof TESTS)[0]; messageCount: number }) {
  const [results, setResults] = useState<{
    fast: TestResult
    native: TestResult
  } | null>(null)
  const [loading, setLoading] = useState(false)

  const runTest = useCallback(async () => {
    setLoading(true)
    try {
      const fastResult = await runSingleTest({
        // @ts-ignore
        Ws: FastWebSocket,
        port: test.port,
        messageCount,
        testCase: test.name,
        payload: test.payload,
      })

      const wsResult = await runSingleTest({
        Ws: WebSocket,
        port: test.port,
        messageCount,
        testCase: test.name,
        payload: test.payload,
      })

      setResults({ fast: fastResult, native: wsResult })
    } finally {
      setLoading(false)
    }
  }, [test, messageCount])

  return (
    <View style={styles.testCase}>
      <TouchableOpacity style={styles.runButton} onPress={runTest} disabled={loading}>
        <Text style={styles.buttonText}>
          {loading ? 'Running...' : `Run ${messageCount} messages`}
        </Text>
      </TouchableOpacity>

      {loading && <ActivityIndicator style={styles.loader} />}

      {results && !loading && (
        <ResultsTable fastResults={results.fast} wsResults={results.native} />
      )}
    </View>
  )
}

function ResultsTable({
  fastResults,
  wsResults,
}: {
  fastResults: TestResult
  wsResults: TestResult
}) {
  return (
    <View style={styles.results}>
      <ResultsHeader />
      <ResultRow
        label="Sending"
        fastValue={fastResults.outgoingTime}
        wsValue={wsResults.outgoingTime}
      />
      <ResultRow
        label="Receiving"
        fastValue={fastResults.incomingTime}
        wsValue={wsResults.incomingTime}
      />
      <ResultRow label="Total" fastValue={fastResults.totalTime} wsValue={wsResults.totalTime} />
    </View>
  )
}

function ResultsHeader() {
  return (
    <View style={styles.resultRow}>
      <Text style={[styles.resultCell, styles.headerCell]}></Text>
      <Text style={[styles.resultCell, styles.headerCell]}>FastWS</Text>
      <Text style={[styles.resultCell, styles.headerCell]}>WebSocket</Text>
    </View>
  )
}

function ResultRow({
  label,
  fastValue,
  wsValue,
}: {
  label: string
  fastValue: number
  wsValue: number
}) {
  const isFastBetter = fastValue < wsValue
  return (
    <View style={styles.resultRow}>
      <Text style={styles.resultCell}>{label}</Text>
      <Text style={[styles.resultCell, isFastBetter ? styles.betterResult : styles.worseResult]}>
        {fastValue.toFixed(2)}ms
      </Text>
      <Text style={[styles.resultCell, !isFastBetter ? styles.betterResult : styles.worseResult]}>
        {wsValue.toFixed(2)}ms
      </Text>
    </View>
  )
}

async function runSingleTest(opts: TestCase): Promise<TestResult> {
  const { Ws, port, messageCount, testCase, payload } = opts

  return new Promise((resolve) => {
    const ws = new Ws(`${BASE_URL}:${port}`)
    let outgoingTime: number
    let incomingTime: number
    let received = 0

    ws.onmessage = () => {
      if (received === 0) {
        incomingTime = performance.now()
      }

      received++

      if (received === messageCount) {
        incomingTime = performance.now() - incomingTime
        ws.close()
        resolve({
          outgoingTime,
          incomingTime,
          messageCount,
          implementation: Ws.name as 'FastWS' | 'WebSocket',
          testCase,
          totalTime: outgoingTime + incomingTime,
        })
      }
    }

    ws.onopen = () => {
      outgoingTime = performance.now()
      if (payload) {
        for (let i = 0; i < messageCount; i++) {
          ws.send(payload)
        }
      }
      outgoingTime = performance.now() - outgoingTime
      ws.send(messageCount.toString())
    }
  })
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  section: {
    marginBottom: 24,
  },
  sectionHeader: {
    fontSize: 20,
    fontWeight: '600',
    marginBottom: 12,
  },
  testCase: {
    marginBottom: 16,
  },
  runButton: {
    backgroundColor: '#007AFF',
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },
  loader: {
    marginTop: 12,
  },
  results: {
    marginTop: 12,
    borderRadius: 8,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: '#E1E1E1',
  },
  resultRow: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: '#E1E1E1',
  },
  resultCell: {
    flex: 1,
    padding: 8,
    textAlign: 'center',
  },
  headerCell: {
    fontWeight: '600',
    backgroundColor: '#F5F5F5',
  },
  betterResult: {
    backgroundColor: '#E8F5E9',
    color: '#2E7D32',
  },
  worseResult: {
    backgroundColor: '#FFEBEE',
    color: '#C62828',
  },
})
