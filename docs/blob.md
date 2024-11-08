# Blob

## Usage

[TBD]

## Differences with React Native's `Blob`

- Can create `Blob`s from `ArrayBuffer`, `ArrayBufferView` too. With React Native, [you can only create Blob from string or another Blob](https://github.com/facebook/react-native/blob/af384a914a4e9ef6a5d25b00bc14b0483e5af879/packages/react-native/Libraries/Blob/BlobManager.js#L69-L73)
- Each `Blob` has `text()`, `arrayBuffer()`, and `stream()` methods. With React Native, you can only access the contents of `Blob` via [custom `data` field](https://github.com/facebook/react-native/blob/af384a914a4e9ef6a5d25b00bc14b0483e5af879/packages/react-native/Libraries/Blob/Blob.js#L75-L82)
- `Blob` does not depend on a native module. Uses `ArrayBuffer`s natively, thanks to Nitro Modules. With React Native, [Blob uses `RCTBlobManager` under the hood](https://github.com/facebook/react-native/blob/bd323929dc5be5666ee36043babec7d981a095dc/packages/react-native/Libraries/Blob/RCTBlobManager.h#L15) to create and hold references to the data.
- `Blob` is automatically deallocated when no longer in use. [You don't have to `close()` it manually](https://github.com/facebook/react-native/blob/bd323929dc5be5666ee36043babec7d981a095dc/packages/react-native/Libraries/Blob/Blob.js#L122-L138)
