import { SafeAreaView, ScrollView } from 'react-native'

import { WebPlatformTestRunner } from './wpt-runner'
import { BenchmarkUI } from './benchmark'
import { FileSystemUI } from './filesystem'

export function App() {
  return (
    <SafeAreaView style={{ flex: 1, marginHorizontal: 16 }}>
      <ScrollView contentContainerStyle={{ gap: 16 }} showsVerticalScrollIndicator={false}>
        <WebPlatformTestRunner />
        <FileSystemUI />
        <BenchmarkUI />
      </ScrollView>
    </SafeAreaView>
  )
}
