const path = require('path')
const pkg = require('../packages/react-native-fast-io/package.json')

module.exports = {
  project: {
    ios: {
      automaticPodsInstallation: true,
    },
  },
  dependencies: {
    [pkg.name]: {
      root: path.join(__dirname, '..', 'packages', 'react-native-fast-io'),
    },
  },
}
