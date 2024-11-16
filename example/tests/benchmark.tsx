import React, { useCallback, useMemo, useState } from 'react'
import {
  ActivityIndicator,
  Clipboard,
  Platform,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native'
import { WebSocket as FastWS } from 'react-native-fast-io'

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

type TestResults = {
  fast: TestResult
  native: TestResult
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

export const BASE_URL = Platform.OS === 'android' ? '10.0.2.2' : 'localhost'

export function BenchmarkUI() {
  return (
    <View style={styles.container}>
      <Text style={styles.header}>WebSocket Benchmark</Text>
      {TESTS.map((test) => (
        <TestSection key={test.name} test={test} />
      ))}
    </View>
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
  const [latestResults, setLatestResults] = useState<TestResults | null>(null)
  const [allResults, setAllResults] = useState<TestResults[]>([])
  const [loading, setLoading] = useState(false)

  const runTest = useCallback(async () => {
    setLoading(true)
    try {
      const fastResult = await runSingleTest({
        // @ts-ignore
        Ws: FastWS,
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

      const results = { fast: fastResult, native: wsResult }
      setLatestResults(results)
      setAllResults((prev) => [...prev, results])
    } finally {
      setLoading(false)
    }
  }, [test, messageCount])

  const cleanedResults = useMemo(() => {
    if (allResults.length < 3) return null // Need at least 3 results for meaningful outlier removal

    const fastOutgoing = removeOutliers(allResults.map((r) => r.fast.outgoingTime))
    const fastIncoming = removeOutliers(allResults.map((r) => r.fast.incomingTime))
    const wsOutgoing = removeOutliers(allResults.map((r) => r.native.outgoingTime))
    const wsIncoming = removeOutliers(allResults.map((r) => r.native.incomingTime))

    const average = (arr: number[]) => arr.reduce((a, b) => a + b, 0) / arr.length

    return {
      fast: {
        outgoingTime: average(fastOutgoing),
        incomingTime: average(fastIncoming),
        totalTime: average(fastOutgoing) + average(fastIncoming),
        messageCount,
        implementation: 'FastWS' as const,
        testCase: test.name,
      },
      native: {
        outgoingTime: average(wsOutgoing),
        incomingTime: average(wsIncoming),
        totalTime: average(wsOutgoing) + average(wsIncoming),
        messageCount,
        implementation: 'WebSocket' as const,
        testCase: test.name,
      },
      samplesUsed: {
        fastOutgoing: fastOutgoing.length,
        fastIncoming: fastIncoming.length,
        wsOutgoing: wsOutgoing.length,
        wsIncoming: wsIncoming.length,
        total: allResults.length,
      },
    }
  }, [allResults, messageCount, test.name])

  const handleCopyTable = useCallback(() => {
    if (!cleanedResults) return

    const table = formatTableAsMarkdown({
      fast: cleanedResults.fast,
      native: cleanedResults.native,
    })

    Clipboard.setString(table)
  }, [cleanedResults])

  return (
    <View style={styles.testCase}>
      <TouchableOpacity style={styles.runButton} onPress={runTest} disabled={loading}>
        <Text style={styles.buttonText}>
          {loading ? 'Running...' : `Run ${messageCount} messages`}
        </Text>
      </TouchableOpacity>

      {loading && <ActivityIndicator style={styles.loader} />}

      {latestResults && (
        <>
          <Text style={styles.resultLabel}>Latest Run</Text>
          <ResultsTable fastResults={latestResults.fast} wsResults={latestResults.native} />
        </>
      )}

      {cleanedResults && allResults.length >= 3 && (
        <>
          <Text style={styles.resultLabel}>
            Cleaned Average (using {cleanedResults.samplesUsed.total} runs, outliers removed)
          </Text>
          <ResultsTable fastResults={cleanedResults.fast} wsResults={cleanedResults.native} />
          <Text style={styles.sampleInfo}>
            Samples used after outlier removal:{'\n'}
            FastWS: {cleanedResults.samplesUsed.fastOutgoing}/
            {cleanedResults.samplesUsed.fastIncoming} (out/in){'\n'}
            WebSocket: {cleanedResults.samplesUsed.wsOutgoing}/
            {cleanedResults.samplesUsed.wsIncoming} (out/in)
          </Text>
          <TouchableOpacity style={styles.copyButton} onPress={handleCopyTable}>
            <Text style={styles.copyButtonText}>Copy Table</Text>
          </TouchableOpacity>
        </>
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
        label="Out"
        fastValue={fastResults.outgoingTime}
        wsValue={wsResults.outgoingTime}
      />
      <ResultRow label="In" fastValue={fastResults.incomingTime} wsValue={wsResults.incomingTime} />
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
    const ws = new Ws(`ws://${BASE_URL}:${port}`)
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

// Add helper function for outlier removal using IQR method
function removeOutliers(numbers: number[]): number[] {
  const sorted = [...numbers].sort((a, b) => a - b)
  const q1 = sorted[Math.floor(sorted.length * 0.25)]
  const q3 = sorted[Math.floor(sorted.length * 0.75)]
  const iqr = q3 - q1
  const lowerBound = q1 - 1.5 * iqr
  const upperBound = q3 + 1.5 * iqr
  return numbers.filter((x) => x >= lowerBound && x <= upperBound)
}

function formatTableAsMarkdown({ fast, native }: { fast: TestResult; native: TestResult }): string {
  return `<table>
    <tr>
      <th>${fast.messageCount}x</th>
      <th>FastWS</th>
      <th>RN</th>
      <th></th>
    </tr>
    <tr>
      <td>Out </td>
      <td>${fast.outgoingTime.toFixed(2)}ms</td>
      <td>${native.outgoingTime.toFixed(2)}ms</td>
      <td>${(native.outgoingTime / fast.outgoingTime).toFixed(2)}x</td>
    </tr>
    <tr>
      <td>In</td>
      <td>${fast.incomingTime.toFixed(2)}ms</td>
      <td>${native.incomingTime.toFixed(2)}ms</td>
      <td>${(native.incomingTime / fast.incomingTime).toFixed(2)}x</td>
    </tr>
  </table>`
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
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
  resultLabel: {
    fontSize: 16,
    fontWeight: '600',
    marginTop: 16,
    marginBottom: 8,
    color: '#666',
  },
  sampleInfo: {
    fontSize: 12,
    color: '#666',
    marginTop: 4,
    marginLeft: 8,
  },
  copyButton: {
    marginTop: 8,
    padding: 8,
    backgroundColor: '#666',
    borderRadius: 4,
    alignItems: 'center',
  },
  copyButtonText: {
    color: 'white',
    fontSize: 14,
    fontWeight: '500',
  },
})
