import React, { useEffect, useMemo, useState } from 'react'
import { ActivityIndicator, FlatList, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import './wpt/resources/testharness'

// Stream tests
import './wpt/streams'

// Compression tests
import { CompressionStream } from 'react-native-fast-io/streams'
global.CompressionStream = CompressionStream;
import './wpt/compression'

function colorForTestStatus(status: number) {
  switch (status) {
    case 0: //TestStatus.PASS:
      return 'green';
    case 1: //TestStatus.FAIL:
      return 'red';
    case 2: //TestStatus.TIMEOUT:
      return 'pink';
    case 3: //TestStatus.NOTRUN:
      return 'black';
    case 4: //TestStatus.PRECONDITION_FAILED:
      return 'darkred';
    default:
      return 'black';
  }
}

function useWptRunner() {
  const [areTestsRunning, setAreTestRunning] = useState<boolean | null>(null);
  const [tests, setTests] = useState<Record<string, Test>>({});

  const sortedTests = useMemo(() => {
    return Object.values(tests).sort((a, b) => {
      if (a.status != b.status) {
        // Sort by status (descending)
        return b.status - a.status; // inverted
      } else {
        // If statuses are the same, then sort by index (ascending)
        return (a.index || 0) - (b.index || 0)
      }
    });
  }, [tests]);

  const testsStats = useMemo<Record<number, number>>(() => {
    const groups = Object.create(null);
    sortedTests.forEach(t => {
      if (t.status in groups) {
        groups[t.status]++;
      } else {
        groups[t.status] = 1;
      }
    });
    return groups;
  }, [sortedTests]);

  useEffect(() => {
    add_start_callback(() => {
      // NOTE(mario): The first test has been started
      setAreTestRunning(true);
    });
    add_test_state_callback((test: Test) => {
      // NOTE(mario): Called when test's state changed
      setTests((oldState) => ({
        ...oldState,
        [test.name]: test,
      }));
    });
    add_completion_callback(() => {
      // NOTE(mario): All tests have completed
      setAreTestRunning(false);
    });
  }, []);

  return {
    areTestsRunning,
    sortedTests,
    testsStats,
  };
}

export function WebPlatformTestOutput({ title, areTestsRunning, sortedTests, testsStats }) {
  return (
    <View>
      <Text style={styles.header}>{title}</Text>

      <View style={{ flexDirection: 'row' }}>
        <Text style={{ color: colorForTestStatus(0) }}>{ testsStats?.[0] ?? 0 } passed</Text>
        <Text>, </Text>
        <Text style={{ color: colorForTestStatus(1) }}>{ testsStats?.[1] ?? 0 } failed</Text>
        <Text>, </Text>
        <Text style={{ color: colorForTestStatus(2) }}>{ testsStats?.[2] ?? 0 } timed out</Text>
        <Text>, </Text>
        <Text style={{ color: colorForTestStatus(3) }}>{ testsStats?.[3] ?? 0 } pending</Text>
      </View>

      { areTestsRunning && <ActivityIndicator /> || (
      <TouchableOpacity style={styles.button} onPress={() => {}}>
        <Text style={styles.buttonText}>Reload tests</Text>
      </TouchableOpacity>
      )}

      <FlatList
        data={sortedTests}
        renderItem={({item}) => {
          const test = item;
          return (
            <View>
              <View style={{
                flexDirection: 'row',
                minHeight: 40,
              }}>
                <Text style={{
                  flexWrap: 'wrap',
                  fontWeight: 'bold',
                  color: colorForTestStatus(test.status),
                }}>
                  {test.name}
                </Text>
                <Text style={{
                  color: colorForTestStatus(test.status),
                }}>
                  {test.format_status()}
                </Text>
              </View>
              {test.status === 1 && (<Text>{test.message}</Text>)}
            </View>
          );
        }}
        ItemSeparatorComponent={() => (
        <View style={{
          height: 1,
          backgroundColor: 'grey',
        }}/>)}
      />
    </View>
  )
}

export function WebPlatformTestRunner() {
  const { areTestsRunning, sortedTests, testsStats } = useWptRunner();

  return (
    <WebPlatformTestOutput
      title="Web Platform Tests"
      areTestsRunning={areTestsRunning}
      sortedTests={sortedTests}
      testsStats={testsStats}
    />
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    margin: 16,
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  button: {
    backgroundColor: '#007AFF',
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: 12,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },
  actions: {
    marginTop: 16,
  },
  loader: {
    marginTop: 12,
  },
  statusContainer: {
    marginTop: 16,
    padding: 12,
    backgroundColor: '#F5F5F5',
    borderRadius: 8,
  },
  status: {
    fontSize: 14,
    color: '#333',
  },
})
