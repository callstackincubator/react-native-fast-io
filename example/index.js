import '@bacons/text-decoder/install'
import 'web-streams-polyfill/polyfill'
import '@azure/core-asynciterator-polyfill'

import { AppRegistry } from 'react-native'

import { App } from './tests'

AppRegistry.registerComponent('NitroPlayground', () => App)
