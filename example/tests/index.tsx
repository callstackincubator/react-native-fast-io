import { SafeAreaView, ScrollView } from 'react-native'

import { BenchmarkUI } from './benchmark'
import { FileSystemUI } from './filesystem'

export function App() {
  return (
    <SafeAreaView style={{ flex: 1, marginHorizontal: 16 }}>
      <ScrollView contentContainerStyle={{ gap: 16 }} showsVerticalScrollIndicator={false}>
        <FileSystemUI />
        <BenchmarkUI />
      </ScrollView>
    </SafeAreaView>
  )
}
