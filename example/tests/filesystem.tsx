import React, { useState } from 'react'
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { CompressionStream, fetch, showOpenFilePicker } from 'react-native-fast-io'

export function FileSystemUI() {
  const [fileHandle, setFileHandle] = useState<FileSystemFileHandle | null>(null)

  const pickFile = async () => {
    const [fileHandle] = await showOpenFilePicker()
    // @ts-ignore
    setFileHandle(fileHandle)
  }

  const sendFile = async (compression?: 'gzip' | 'deflate' | 'deflate-raw') => {
    if (!fileHandle) {
      return
    }

    const file = await fileHandle.getFile()
    const body = compression ? file.stream().pipeThrough(new CompressionStream(compression)) : file

    await fetch('http://localhost:3002/upload', {
      method: 'POST',
      body,
    })
  }

  return (
    <View>
      <Text style={styles.header}>File System Test</Text>

      <TouchableOpacity style={styles.button} onPress={pickFile}>
        <Text style={styles.buttonText}>Pick File</Text>
      </TouchableOpacity>

      {fileHandle && (
        <View style={styles.actions}>
          <TouchableOpacity style={styles.button} onPress={() => sendFile()}>
            <Text style={styles.buttonText}>Send Uncompressed</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress={() => sendFile('gzip')}>
            <Text style={styles.buttonText}>Send Gzipped</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress={() => sendFile('deflate')}>
            <Text style={styles.buttonText}>Send Deflated</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress={() => sendFile('deflate-raw')}>
            <Text style={styles.buttonText}>Send Deflated Raw</Text>
          </TouchableOpacity>
        </View>
      )}

      {fileHandle && (
        <View style={styles.statusContainer}>
          <Text style={styles.status}>{fileHandle.name}</Text>
        </View>
      )}
    </View>
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
