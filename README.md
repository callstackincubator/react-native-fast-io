`react-native-fast-ws`
======

Blazing fast WebSocket client for React Native built on top of [Nitro](https://mrousavy.github.io/nitro).

> [!WARNING]
> This library is still under development. Use at your own risk. The API is experimental and subject to change. This project explores new ideas and approaches to WebSocket and Blob APIs, thanks to Nitro, and its scope may change.

### Getting started

```
npm install react-native-fast-ws --save
```

> [!NOTE]
> This package requires React Native 0.76 and New Architecture. You must also install and configure [Nitro Modules](https://github.com/mrousavy/nitro) to use this package.

### TODOs

- Provide Android support
- Document things not implemented in spec, or different from spec
- Fix outstanding (and known) issues
- Figure out a better name and logo
- Stable release at [React Native London Conf](https://www.reactnativelondon.co.uk)
- Extract Blob to a separate package
- Documentation

If you want to contribute, please reach out (you can find me on [X/Twitter](https://x.com/grabbou)).

### Differences with React Native

**Blob**
- Can create `Blob` from `ArrayBuffer`, `ArrayBufferView`, `Blob`, or `string`. With React Native, [you can only create Blob from string or another Blob](https://github.com/facebook/react-native/blob/main/packages/react-native/Libraries/Blob/BlobManager.js#L69-L73)
- Has `text()`, `arrayBuffer()`, and `stream()` methods. With React Native, you can only access the contents of `Blob` via [custom `data` field](https://github.com/facebook/react-native/blob/main/packages/react-native/Libraries/Blob/Blob.js#L75-L82)
- Does not depend on a native module. Uses `ArrayBuffer`s natively, thanks to Nitro Modules. With React Native, [Blob uses `RCTBlobManager` under the hood](https://github.com/facebook/react-native/blob/bd323929dc5be5666ee36043babec7d981a095dc/packages/react-native/Libraries/Blob/RCTBlobManager.h#L15) to create and hold references to the data
- Automatically deallocated when no longer in use. [You don't have to `close()` it manually](https://github.com/facebook/react-native/blob/bd323929dc5be5666ee36043babec7d981a095dc/packages/react-native/Libraries/Blob/Blob.js#L122-L138)

**Websockets**
- Emits events (`open`, `message`, `error`, `close`) that extend from [`Event`](https://dom.spec.whatwg.org/#event)
- On iOS, uses built-in APIs for WebSockets (available on iOS 13+). React Native uses `SocketRocket` instead
- Uses callbacks instead of `RCTEventEmitter` to communicate new messages back to the JavaScript

### Compatibility table

The table below compares the features and APIs available in react-native-fast-ws against the [WebSocket specification](https://websockets.spec.whatwg.org/) and React Native's built-in WebSocket implementation. A ✅ indicates full support, ⚠️ indicates partial support with limitations, and ❌ indicates no support.

#### WebSocket

| Feature | Specification | FastWS | React Native |
|---------|--------------|-----------------------|------------------------|

#### Blob

| Feature | Specification | FastWS | React Native |
|---------|--------------|-----------------------|------------------------|

### Benchmarks

> [!NOTE]
> Benchmarks shown below operate in controlled environments and may not accurately reflect real-world performance. Results can vary significantly based on factors such as:
> - Device model and OS version
> - Network conditions and latency
> - Message payload size and type
> - Application state and concurrent operations
> 
> These benchmarks are provided to demonstrate theoretical performance benefits and should be used as a general reference rather than absolute performance indicators.

#### iOS (iPhone 16 Pro, iOS 18.0)

| Operation | React Native | FastWS | Improvement |
|-----------|--------------|--------|-------------|
| Send 10k strings | x | x | x |
| Receive 10k strings | x | x | x |
| Send 10k ArrayBuffers | x | x | x |
| Receive 10k ArrayBuffers | x | x | x |

#### Android (Medium Phone, Android 15)

| Operation | React Native | FastWS | Improvement |
|-----------|--------------|--------|-------------|
| Send 10k strings | x | x | x |
| Receive 10k strings | x | x | x |
| Send 10k ArrayBuffers | x | x | x |
| Receive 10k ArrayBuffers | x | x | x |

_All tests were performed with local WebSocket server to minimize network variance. Each test was run 5 times and averaged._

### Developing

Run the example app to test changes:

```bash
// Start the demo server
bun server.ts

// Run the app
cd example && npm run ios
```

You can also start the app from Xcode, in case you want to make changes to the native code. In that case, open `example/ios/NitroPlayground.xcworkspace` and hit run.
