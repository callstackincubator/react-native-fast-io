import React, { useState } from 'react'
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { fetch } from 'react-native-fast-io/fetch'
import { File, showOpenFilePicker } from 'react-native-fast-io/fs'
import { CompressionStream } from 'react-native-fast-io/streams'

import { BASE_URL } from './benchmark'

export function FileSystemUI() {
  const [file, setFile] = useState<File | null>(null)

  const pickFile = async (options?: Parameters<typeof showOpenFilePicker>[0]) => {
    const [fileHandle] = await showOpenFilePicker(options)
    const file = await fileHandle.getFile()
    // @ts-ignore
    setFile(file)
  }

  const sendFile = async (compression?: 'gzip' | 'deflate' | 'deflate-raw') => {
    if (!file) {
      return
    }
    const body = compression ? file.stream().pipeThrough(new CompressionStream(compression)) : file

    await fetch(`http://${BASE_URL}:3002/upload`, {
      method: 'POST',
      body,
    })
  }

  const logContents = async () => {
    for await (const chunk of file!.stream()) {
      console.log('Chunk length: ', chunk.length)
    }
  }

  return (
    <View>
      <Text style={styles.header}>File System Test</Text>

      <TouchableOpacity style={styles.button} onPress={() => pickFile()}>
        <Text style={styles.buttonText}>Pick any file</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.button}
        onPress={() => pickFile({ types: [{ accept: { 'image/*': ['.png', '.jpg', '.jpeg'] } }] })}
      >
        <Text style={styles.buttonText}>Pick image</Text>
      </TouchableOpacity>

      {file && (
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
          <TouchableOpacity style={styles.button} onPress={() => logContents()}>
            <Text style={styles.buttonText}>Log contents</Text>
          </TouchableOpacity>
        </View>
      )}

      {file && (
        <View style={styles.statusContainer}>
          <Text style={styles.status}>{file.name}</Text>
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
