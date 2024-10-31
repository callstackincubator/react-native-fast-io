`react-native-fast-ws`
======

Blazing fast WebSocket client for React Native built on top of [Nitro](https://mrousavy.github.io/nitro).

> [!WARNING]
> This library is still under development. Use at your own risk. The API is experimental and subject to change. This project explores new ideas and approaches to WebSocket and Blob APIs, thanks to Nitro, and its scope may change.

### Getting started

```
npm install react-native-fast-ws react-native-nitro-modules
```

### TODOs

- Provide Android support
- Fix outstanding (and known) issues
- Figure out a better name and logo
- Stable release at [React Native London Conf](https://www.reactnativelondon.co.uk)
- Extract Blob to a separate package
- Documentation

If you want to contribute, please reach out (you can find me on [X/Twitter](https://x.com/grabbou)).

### Differences with React Native

**Blob**
- Fully [W3C compliant](https://w3c.github.io/FileAPI/#blob-section)
- Can create `Blob` from `ArrayBuffer`, `ArrayBufferView`, `Blob`, or `string`. With React Native, [you can only create Blob from string or another Blob](https://github.com/facebook/react-native/blob/main/packages/react-native/Libraries/Blob/BlobManager.js#L69-L73)
- Has `text()`, `arrayBuffer()`, and `stream()` methods. With React Native, you can only access the contents of `Blob` via [custom `data` field](https://github.com/facebook/react-native/blob/main/packages/react-native/Libraries/Blob/Blob.js#L75-L82)
- Does not depend on a native module. Uses `ArrayBuffer`s natively, thanks to Nitro Modules. With React Native, [Blob uses `RCTBlobManager` under the hood](https://github.com/facebook/react-native/blob/bd323929dc5be5666ee36043babec7d981a095dc/packages/react-native/Libraries/Blob/RCTBlobManager.h#L15) to create and hold references to the data
- Automatically deallocated when no longer in use. [You don't have to `close()` it manually](https://github.com/facebook/react-native/blob/bd323929dc5be5666ee36043babec7d981a095dc/packages/react-native/Libraries/Blob/Blob.js#L122-L138)

**Websockets**
- On iOS, uses built-in APIs for WebSockets (available on iOS 13+). React Native uses `SocketRocket` instead
- Does not use `EventEmitter` to communicate new messages back to the JavaScript. With Nitro, we can call callbacks directly 

### Developing

Run the example app to test changes:

```bash
// Start the demo server
bun server.ts

// Run the app
cd example && npm run ios
```

You can also start the app from Xcode, in case you want to make changes to the native code. In that case, open `example/ios/NitroPlayground.xcworkspace` and hit run.
