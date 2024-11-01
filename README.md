<p align="center">
  <h1>react-native-fast-ws</h1>
</p>

<p align="center">
  <img src="https://media1.tenor.com/m/7Ienx0j5cqoAAAAC/fast-and.gif" />
</p>

<p align="center">
  When your WebSockets hit the Nitro boost 🏎️💨
</p>


---

> [!WARNING]
> This library is still under development. Use at your own risk. The API is experimental and subject to change. This project explores new ideas and approaches to WebSocket and Blob APIs, thanks to Nitro, and its scope may change.

### Getting started

```
npm install react-native-fast-ws --save
```

> [!NOTE]
> This package requires React Native 0.76 and New Architecture. You must also install and configure [Nitro Modules](https://github.com/mrousavy/nitro) to use this package.

### Usage

This library implements the [WebSocket Web API](https://developer.mozilla.org/en-US/docs/Web/API/WebSocket). If you've used WebSockets in the browser, you'll feel right at home:

```ts
// Create a new WebSocket instance
const ws = new WebSocket('wss://echo.websocket.org');

// Using event listeners (recommended)
ws.addEventListener('open', (event) => {
  console.log('Connected to server');
  ws.send('Hello Server!');
});

// Or using event handlers
ws.onopen = (event) => {
  console.log('Connected to server');
};

// Listen to messages
ws.addEventListener('message', (event) => {
  console.log('Received:', event.data);
});

// Send different types of data
ws.send('Plain text message');
ws.send(new Blob(['Binary data']));
ws.send(new Uint8Array([1, 2, 3, 4]));

// Close the connection when done
ws.close();
```

For more detailed information about the WebSocket API, check out the [MDN WebSocket documentation](https://developer.mozilla.org/en-US/docs/Web/API/WebSocket).

### TODOs

- Provide Android support
- Document things not implemented in spec, or different from spec
- Stable release at [React Native London Conf](https://www.reactnativelondon.co.uk)
- Extract Blob to a separate package

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

These benchmarks are provided to demonstrate theoretical performance benefits and should be used as a general reference rather than absolute performance indicators.

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

All tests were performed with local WebSocket server to minimize network variance. Each test was run 5 times and averaged.

In the future, we would like to add benchmarks for CPU and memory usage, since that's where FastWS should shine. Your contributions are welcome!

## Made with ❤️ at Callstack

React Native FastWS is an open source project and will always remain free to use. If you think it's cool, please star it 🌟. [Callstack](https://callstack.com) is a group of React and React Native geeks, contact us at [hello@callstack.com](mailto:hello@callstack.com) if you need any help with these or just want to say hi!

Like the project? ⚛️ [Join the team](https://callstack.com/careers/?utm_campaign=Senior_RN&utm_source=github&utm_medium=readme) who does amazing stuff for clients and drives React Native Open Source! 🔥
