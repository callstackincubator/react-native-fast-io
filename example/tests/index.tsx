import { SafeAreaView, ScrollView } from 'react-native'

import { BenchmarkUI } from './benchmark'
import { FileSystemUI } from './filesystem'
import { RequestTestUI } from './Request'

export function App() {
  return (
    <SafeAreaView style={{ flex: 1, marginHorizontal: 16 }}>
      <ScrollView contentContainerStyle={{ gap: 16 }} showsVerticalScrollIndicator={false}>
        <RequestTestUI />
        <FileSystemUI />
        <BenchmarkUI />
      </ScrollView>
    </SafeAreaView>
  )
}
