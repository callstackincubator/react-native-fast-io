import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { fetch } from 'react-native-fast-io'
export { TextDecoder } from '@bacons/text-decoder'

export function RequestTestUI() {
  return (
    <View>
      <Text style={styles.header}>Fetch Request Test</Text>
      <TouchableOpacity
        style={styles.button}
        onPress={async () => {
          try {
            const response = await fetch('https://echo.free.beeceptor.com/?test=1', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({ key: 'value' }),
            })
            const start = performance.now()
            console.log(await response.json())
            console.log(response.headers)
            console.log('fetch took: ' + (performance.now() - start) + 'ms')
          } catch (error) {
            console.error(error)
          }
        }}
      >
        <Text style={styles.buttonText}>Send GET</Text>
      </TouchableOpacity>
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
