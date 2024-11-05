<div align="center">
  <h1>react-native-fast-ws</h1>
</div>

<p align="center">
  <img src="https://media1.tenor.com/m/7Ienx0j5cqoAAAAC/fast-and.gif" />
</p>

<p align="center">
  When your WebSockets hit the Nitro boost 🏎️💨
</p>


---

### Getting started

```
npm install react-native-fast-ws --save
```

> [!NOTE]
> This package requires React Native 0.76 or higher. You must also install and configure [Nitro Modules](https://github.com/mrousavy/nitro) to use this package.

> [!WARNING]
> This library is still under development. Use at your own risk. The API is experimental and subject to change. This project explores new ideas and approaches to WebSocket and Blob APIs, thanks to Nitro, and its scope may change.

### Usage

This library implements the [WebSocket Web API](https://developer.mozilla.org/en-US/docs/Web/API/WebSocket) and is meant to be a drop-in replacement for React Native's WebSocket implementation.

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

### Differences with React Native

- Can create `Blob`s from `ArrayBuffer`, `ArrayBufferView` too. With React Native, [you can only create Blob from string or another Blob](https://github.com/facebook/react-native/blob/af384a914a4e9ef6a5d25b00bc14b0483e5af879/packages/react-native/Libraries/Blob/BlobManager.js#L69-L73)
- Each `Blob` has `text()`, `arrayBuffer()`, and `stream()` methods. With React Native, you can only access the contents of `Blob` via [custom `data` field](https://github.com/facebook/react-native/blob/af384a914a4e9ef6a5d25b00bc14b0483e5af879/packages/react-native/Libraries/Blob/Blob.js#L75-L82)
- `Blob` does not depend on a native module. Uses `ArrayBuffer`s natively, thanks to Nitro Modules. With React Native, [Blob uses `RCTBlobManager` under the hood](https://github.com/facebook/react-native/blob/bd323929dc5be5666ee36043babec7d981a095dc/packages/react-native/Libraries/Blob/RCTBlobManager.h#L15) to create and hold references to the data.
- `Blob` is automatically deallocated when no longer in use. [You don't have to `close()` it manually](https://github.com/facebook/react-native/blob/bd323929dc5be5666ee36043babec7d981a095dc/packages/react-native/Libraries/Blob/Blob.js#L122-L138)
- You can send `Blob`, `ArrayBuffer`, and `ArrayBufferView` objects directly. [With React Native, they are serialized and sent as base64 strings](https://github.com/facebook/react-native/blob/af384a914a4e9ef6a5d25b00bc14b0483e5af879/packages/react-native/Libraries/WebSocket/WebSocket.js#L201-L203)
- Uses direct callbacks per WebSocket instance. [React Native broadcasts all events to JS and filters by connection ID, which is less efficient](https://github.com/facebook/react-native/blob/af384a914a4e9ef6a5d25b00bc14b0483e5af879/packages/react-native/React/CoreModules/RCTWebSocketModule.mm#L144-L157)
- It will throw when attempting to close WebSocket connection with a code other than 1000 or outside of range 3000-4999. This is spec compliant behavior and something [not supported by React Native's WebSocket implementation](https://github.com/facebook/react-native/blob/af384a914a4e9ef6a5d25b00bc14b0483e5af879/packages/react-native/Libraries/WebSocket/WebSocket.js#L221)

### Benchmarks

> [!NOTE]
> Benchmarks shown below operate in controlled environments and may not accurately reflect real-world performance. Results can vary significantly based on factors such as:
> - Device model and OS version
> - Network conditions and latency
> - Message payload size and type
> - Application state and concurrent operations

These benchmarks are provided to demonstrate theoretical performance benefits and should be used as a general reference rather than absolute performance indicators.

You can browse the benchmark code [here](example/tests/benchmark.tsx) and check each message payload [here](example/tests/payloads.ts).


### Small JSON payload - Text

<table>
  <tr>
    <th>Android</th>
    <th>iOS</th>
  </tr>
  <tr>
    <td>
      <table>
        <tr>
          <th></th>
          <th>FastWS</th>
          <th>RN</th>
          <th>Improvement</th>
        </tr>
        <tr>
          <td>Sending</td>
          <td>x</td>
          <td>x</td>
          <td>x</td>
        </tr>
        <tr>
          <td>Receiving</td>
          <td>x</td>
          <td>x</td>
          <td>x</td>
        </tr>
      </table>
    </td>
    <td>
      <table>
        <tr>
          <th></th>
          <th>FastWS</th>
          <th>RN</th>
          <th>Improvement</th>
        </tr>
        <tr>
          <td>Out 100x</td>
          <td style="background-color: #e6ffe6; color: #008000;">0.18ms</td>
          <td>0.66ms</td>
          <td style="color: #008000;">3.67x</td>
        </tr>
        <tr>
          <td>In 100x</td>
          <td style="background-color: #e6ffe6; color: #008000;">4.49ms</td>
          <td>12.01ms</td>
          <td style="color: #008000;">2.67x</td>
        </tr>
      </table>
      <table>
        <tr>
          <th></th>
          <th>FastWS</th>
          <th>RN</th>
          <th>Improvement</th>
        </tr>
        <tr>
          <td>Out 1000x</td>
          <td style="background-color: #e6ffe6; color: #008000;">1.63ms</td>
          <td>4.12ms</td>
          <td style="color: #008000;">2.53x</td>
        </tr>
        <tr>
          <td>In 1000x</td>
          <td style="background-color: #e6ffe6; color: #008000;">27.21ms</td>
          <td>82.98ms</td>
          <td style="color: #008000;">3.05x</td>
        </tr>
      </table>
      <table>
        <tr>
          <th></th>
          <th>FastWS</th>
          <th>RN</th>
          <th>Improvement</th>
        </tr>
        <tr>
          <td>Out 10000x</td>
          <td style="background-color: #e6ffe6; color: #008000;">12.58ms</td>
          <td>40.04ms</td>
          <td style="color: #008000;">3.18x</td>
        </tr>
        <tr>
          <td>In 10000x</td>
          <td style="background-color: #e6ffe6; color: #008000;">226.19ms</td>
          <td>818.58ms</td>
          <td style="color: #008000;">3.62x</td>
        </tr>
      </table>
    </td>
  </tr>
</table>

### Small JSON payload - Binary

<table>
  <tr>
    <th>Android</th>
    <th>iOS</th>
  </tr>
  <tr>
    <td>
      <table>
        <tr>
          <th></th>
          <th>FastWS</th>
          <th>RN</th>
          <th>Improvement</th>
        </tr>
        <tr>
          <td>Sending</td>
          <td>x</td>
          <td>x</td>
          <td>x</td>
        </tr>
        <tr>
          <td>Receiving</td>
          <td>x</td>
          <td>x</td>
          <td>x</td>
        </tr>
      </table>
    </td>
    <td>
      <table>
        <tr>
          <th></th>
          <th>FastWS</th>
          <th>RN</th>
          <th>Improvement</th>
        </tr>
        <tr>
          <td>Out 100x</td>
          <td style="background-color: #e6ffe6; color: #008000;">0.39ms</td>
          <td>1.44ms</td>
          <td style="color: #008000;">3.69x</td>
        </tr>
        <tr>
          <td>In 100x</td>
          <td style="background-color: #e6ffe6; color: #008000;">4.30ms</td>
          <td>12.34ms</td>
          <td style="color: #008000;">2.87x</td>
        </tr>
      </table>
      <table>
        <tr>
          <th></th>
          <th>FastWS</th>
          <th>RN</th>
          <th>Improvement</th>
        </tr>
        <tr>
          <td>Out 1000x</td>
          <td style="background-color: #e6ffe6; color: #008000;">3.50ms</td>
          <td>8.95ms</td>
          <td style="color: #008000;">2.56x</td>
        </tr>
        <tr>
          <td>In 1000x</td>
          <td style="background-color: #e6ffe6; color: #008000;">26.01ms</td>
          <td>85.12ms</td>
          <td style="color: #008000;">3.27x</td>
        </tr>
      </table>
      <table>
        <tr>
          <th></th>
          <td style="background-color: #e6ffe6; color: #008000;">FastWS</th>
          <th>RN</th>
          <th>Improvement</th>
        </tr>
        <tr>
          <td>Out 10000x</td>
          <td style="background-color: #e6ffe6; color: #008000;">25.72ms</td>
          <td>91.68ms</td>
          <td style="color: #008000;">3.56x</td>
        </tr>
        <tr>
          <td>In 10000x</td>
          <td style="background-color: #e6ffe6; color: #008000;">228.78ms</td>
          <td>851.87ms</td>
          <td style="color: #008000;">3.72x</td>
        </tr>
      </table>
    </td>
  </tr>
</table>

### Large JSON payload - Text

<table>
  <tr>
    <th>Android</th>
    <th>iOS</th>
  </tr>
  <tr>
    <td>
      <table>
        <tr>
          <th></th>
          <th>FastWS</th>
          <th>RN</th>
          <th>Improvement</th>
        </tr>
        <tr>
          <td>Sending (ms)</td>
          <td>x</td>
          <td>x</td>
          <td>x</td>
        </tr>
        <tr>
          <td>Receiving (ms)</td>
          <td>x</td>
          <td>x</td>
          <td>x</td>
        </tr>
      </table>
    </td>
    <td>
      <table>
        <tr>
          <th></th>
          <th>FastWS</th>
          <th>RN</th>
          <th>Improvement</th>
        </tr>
        <tr>
          <td>Out 100x</td>
          <td style="background-color: #e6ffe6; color: #008000;">0.35ms</td>
          <td>0.92ms</td>
          <td style="color: #008000;">2.63x</td>
        </tr>
        <tr>
          <td>In 100x</td>
          <td style="background-color: #e6ffe6; color: #008000;">4.55ms</td>
          <td>11.86ms</td>
          <td style="color: #008000;">2.61x</td>
        </tr>
      </table>
      <table>
        <tr>
          <th></th>
          <th>FastWS</th>
          <th>RN</th>
          <th>Improvement</th>
        </tr>
        <tr>
          <td>Out 1000x</td>
          <td style="background-color: #e6ffe6; color: #008000;">2.96ms</td>
          <td>5.99ms</td>
          <td style="color: #008000;">2.02x</td>
        </tr>
        <tr>
          <td>In 1000x</td>
          <td style="background-color: #e6ffe6; color: #008000;">27.84ms</td>
          <td>85.70ms</td>
          <td style="color: #008000;">3.08x</td>
        </tr>
      </table>
      <table>
        <tr>
          <th></th>
          <th>FastWS</th>
          <th>RN</th>
          <th>Improvement</th>
        </tr>
        <tr>
          <td>Out 10000x</td>
          <td style="background-color: #e6ffe6; color: #008000;">23.50ms</td>
          <td>56.78ms</td>
          <td style="color: #008000;">2.42x</td>
        </tr>
        <tr>
          <td>In 10000x</td>
          <td style="background-color: #e6ffe6; color: #008000;">266.34ms</td>
          <td>834.22ms</td>
          <td style="color: #008000;">3.13x</td>
        </tr>
      </table>
    </td>
  </tr>
</table>

### Large JSON payload - Binary

<table>
  <tr>
    <th>Android</th>
    <th>iOS</th>
  </tr>
  <tr>
    <td>
      <table>
        <tr>
          <th></th>
          <th>FastWS</th>
          <th>RN</th>
          <th>Improvement</th>
        </tr>
        <tr>
          <td>Sending</td>
          <td>x</td>
          <td>x</td>
          <td>x</td>
        </tr>
        <tr>
          <td>Receiving</td>
          <td>x</td>
          <td>x</td>
          <td>x</td>
        </tr>
      </table>
    </td>
    <td>
      <table>
        <tr>
          <th></th>
          <th>FastWS</th>
          <th>RN</th>
          <th>Improvement</th>
        </tr>
        <tr>
          <td>Out 100x</td>
          <td style="background-color: #e6ffe6; color: #008000;">0.47ms</td>
          <td>6.19ms</td>
          <td style="color: #008000;">13.17x</td>
        </tr>
        <tr>
          <td>In 100x</td>
          <td style="background-color: #e6ffe6; color: #008000;">4.25ms</td>
          <td>14.23ms</td>
          <td style="color: #008000;">3.35x</td>
        </tr>
      </table>
      <table>
        <tr>
          <th></th>
          <th>FastWS</th>
          <th>RN</th>
          <th>Improvement</th>
        </tr>
        <tr>
          <td>Out 1000x</td>
          <td style="background-color: #e6ffe6; color: #008000;">4.15ms</td>
          <td>39.45ms</td>
          <td style="color: #008000;">9.51x</td>
        </tr>
        <tr>
          <td>In 1000x</td>
          <td style="background-color: #e6ffe6; color: #008000;">26.28ms</td>
          <td>104.81ms</td>
          <td style="color: #008000;">3.99x</td>
        </tr>
      </table>
      <table>
        <tr>
          <th></th>
          <th>FastWS</th>
          <th>RN</th>
          <th>Improvement</th>
        </tr>
        <tr>
          <td>Out 10000x</td>
          <td style="background-color: #e6ffe6; color: #008000;">27.68ms</td>
          <td>416.15ms</td>
          <td style="color: #008000;">15.03x</td>
        </tr>
        <tr>
          <td>In 10000x</td>
          <td style="background-color: #e6ffe6; color: #008000;">238.39ms</td>
          <td>1056.80ms</td>
          <td style="color: #008000;">4.43x</td>
        </tr>
      </table>
    </td>
  </tr>
</table>

### Large Binary (Image - 234KB)

<table>
  <tr>
    <th>Android</th>
    <th>iOS</th>
  </tr>
  <tr>
    <td>
      <table>
        <tr>
          <th></th>
          <th>FastWS</th>
          <th>RN</th>
          <th>Improvement</th>
        </tr>
        <tr>
          <td>Sending</td>
          <td>x</td>
          <td>x</td>
          <td>x</td>
        </tr>
        <tr>
          <td>Receiving</td>
          <td>x</td>
          <td>x</td>
          <td>x</td>
        </tr>
      </table>
    </td>
    <td>
      <table>
        <tr>
          <th></th>
          <th>FastWS</th>
          <th>RN</th>
          <th>Improvement</th>
        </tr>
        <tr>
          <td>Receiving 100x</td>
          <td style="background-color: #e6ffe6; color: #008000;">10.43ms</td>
          <td>1750.91ms</td>
          <td style="color: #008000;">167.87x</td>
        </tr>
      </table>
    </td>
  </tr>
</table>

All tests were performed with local WebSocket server to minimize network variance. Each test was run 10 times and averaged.

In the future, we would like to add benchmarks for:
- CPU usage during message processing
- Memory footprint during large transfers
- Connection establishment time
- Concurrent connection handling
- Message latency under high load

Your contributions are welcome! Check out our [contributing guidelines](CONTRIBUTING.md) to help improve these benchmarks.

## Made with ❤️ at Callstack

React Native FastWS is an open source project and will always remain free to use. If you think it's cool, please star it 🌟. [Callstack](https://callstack.com) is a group of React and React Native geeks, contact us at [hello@callstack.com](mailto:hello@callstack.com) if you need any help with these or just want to say hi!

Like the project? ⚛️ [Join the team](https://callstack.com/careers/?utm_campaign=Senior_RN&utm_source=github&utm_medium=readme) who does amazing stuff for clients and drives React Native Open Source! 🔥
