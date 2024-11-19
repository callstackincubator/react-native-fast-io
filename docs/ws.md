# WebSocket

This library implements the [WebSocket Web API](https://developer.mozilla.org/en-US/docs/Web/API/WebSocket) and is meant to be a drop-in replacement for React Native's WebSocket implementation.

Under the hood, it uses:
- on iOS, built-in WebSocket API ([URLSessionWebSocketTask](https://developer.apple.com/documentation/foundation/urlsessionwebsockettask))
- on Android, OkHttp (same as React Native)

During our benchmarking, we found that this WebSocket implementation is 2-3x faster than React Native's implementation under common scenarios and even up to 150x faster when streaming large binary data (such as images).

## Usage

```ts
import { WebSocket, Blob } from 'react-native-fast-io';

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
ws.send(new Blob('string'));
ws.send(new Uint8Array([1, 2, 3, 4]));

// Close the connection when done
ws.close();
```

> [!NOTE]
> When setting `binaryType` to `'blob'`, the library will dispatch `MessageEvent`s with `Blob` objects. This is incompatible with React Native's `Blob`.

For more detailed information about the WebSocket API, check out the [MDN WebSocket documentation](https://developer.mozilla.org/en-US/docs/Web/API/WebSocket).

## Differences with React Native's `WebSocket`

- You can send `Blob`, `ArrayBuffer`, and `ArrayBufferView` objects directly. [With React Native, they are serialized and sent as base64 strings](https://github.com/facebook/react-native/blob/af384a914a4e9ef6a5d25b00bc14b0483e5af879/packages/react-native/Libraries/WebSocket/WebSocket.js#L201-L203)
- Uses direct callbacks per WebSocket instance. [React Native broadcasts all events to JS and filters by connection ID, which is less efficient](https://github.com/facebook/react-native/blob/af384a914a4e9ef6a5d25b00bc14b0483e5af879/packages/react-native/React/CoreModules/RCTWebSocketModule.mm#L144-L157)
- It will throw when attempting to close WebSocket connection with a code other than 1000 or outside of range 3000-4999. This is spec compliant behavior and something [not supported by React Native's WebSocket implementation](https://github.com/facebook/react-native/blob/af384a914a4e9ef6a5d25b00bc14b0483e5af879/packages/react-native/Libraries/WebSocket/WebSocket.js#L221)
