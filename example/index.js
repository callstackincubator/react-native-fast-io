import '@bacons/text-decoder/install'
import '@azure/core-asynciterator-polyfill'

import { AppRegistry } from 'react-native'

import { BenchmarkUI } from './tests/benchmark'

AppRegistry.registerComponent('NitroPlayground', () => BenchmarkUI)
