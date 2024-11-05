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

// Send erent types of data
ws.send('Plain text message');
ws.send(new Blob(['Binary data']));
ws.send(new Uint8Array([1, 2, 3, 4]));

// Close the connection when done
ws.close();
```

For more detailed information about the WebSocket API, check out the [MDN WebSocket documentation](https://developer.mozilla.org/en-US/docs/Web/API/WebSocket).

### erences with React Native

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
          <th>100x</th>
          <th>FastWS</th>
          <th>RN</th>
          <th></th>
        </tr>
        <tr>
          <td>Out</td>
          <td>0.81ms</td>
          <td>1.40ms</td>
          <td>1.73x</td>
        </tr>
        <tr>
          <td>In</td>
          <td>2.67ms</td>
          <td>20.76ms</td>
          <td>7.76x</td>
        </tr>
      </table>
      <table>
        <tr>
          <th>10000x</th>
          <th>FastWS</th>
          <th>RN</th>
          <th></th>
        </tr>
        <tr>
          <td>Out</td>
          <td>3.91ms</td>
          <td>14.06ms</td>
          <td>3.60x</td>
        </tr>
        <tr>
          <td>In</td>
          <td>17.26ms</td>
          <td>208.32ms</td>
          <td>12.07x</td>
        </tr>
      </table>
      <table>
        <tr>
          <th>10000x</th>
          <th>FastWS</th>
          <th>RN</th>
          <th></th>
        </tr>
        <tr>
          <td>Out</td>
          <td>32.86ms</td>
          <td>176.36ms</td>
          <td>5.37x</td>
        </tr>
        <tr>
          <td>In</td>
          <td>126.74ms</td>
          <td>2096.35ms</td>
          <td>16.54x</td>
        </tr>
      </table>
    </td>
    <td>
      <table>
        <tr>
          <th>100x</th>
          <th>FastWS</th>
          <th>RN</th>
          <th></th>
        </tr>
        <tr>
          <td>Out</td>
          <td>0.20ms</td>
          <td>0.66ms</td>
          <td>3.34x</td>
        </tr>
        <tr>
          <td>In</td>
          <td>4.24ms</td>
          <td>11.79ms</td>
          <td>2.78x</td>
        </tr>
      </table>
      <table>
        <tr>
          <th>1000x</th>
          <th>FastWS</th>
          <th>RN</th>
          <th></th>
        </tr>
        <tr>
          <td>Out</td>
          <td>2.12ms</td>
          <td>4.23ms</td>
          <td>1.99x</td>
        </tr>
        <tr>
          <td>In</td>
          <td>27.42ms</td>
          <td>81.75ms</td>
          <td>2.98x</td>
        </tr>
      </table>
      <table>
        <tr>
          <th>10000x</th>
          <th>FastWS</th>
          <th>RN</th>
          <th></th>
        </tr>
        <tr>
          <td>Out</td>
          <td>13.70ms</td>
          <td>40.52ms</td>
          <td>2.96x</td>
        </tr>
        <tr>
          <td>In</td>
          <td>227.62ms</td>
          <td>812.45ms</td>
          <td>3.57x</td>
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
          <th>100x</th>
          <th>FastWS</th>
          <th>RN</th>
          <th></th>
        </tr>
        <tr>
          <td>Out</td>
          <td>1.29ms</td>
          <td>1.32ms</td>
          <td>1.02x</td>
        </tr>
        <tr>
          <td>In</td>
          <td>3.71ms</td>
          <td>23.42ms</td>
          <td>6.31x</td>
        </tr>
      </table>
      <table>
        <tr>
          <th>1000x</th>
          <th>FastWS</th>
          <th>RN</th>
          <th></th>
        </tr>
        <tr>
          <td>Out</td>
          <td>15.80ms</td>
          <td>27.34ms</td>
          <td>1.73x</td>
        </tr>
        <tr>
          <td>In</td>
          <td>22.58ms</td>
          <td>212.51ms</td>
          <td>9.41x</td>
        </tr>
      </table>
      <table>
        <tr>
          <th>10000x</th>
          <th>FastWS</th>
          <th>RN</th>
          <th></th>
        </tr>
        <tr>
          <td>Out</td>
          <td>122.48ms</td>
          <td>349.38ms</td>
          <td>2.85x</td>
        </tr>
        <tr>
          <td>In</td>
          <td>234.25ms</td>
          <td>2128.34ms</td>
          <td>9.09x</td>
        </tr>
      </table>
    </td>
    <td>
      <table>
        <tr>
          <th>100x</th>
          <th>FastWS</th>
          <th>RN</th>
          <th></th>
        </tr>
        <tr>
          <td>Out</td>
          <td>0.48ms</td>
          <td>1.41ms</td>
          <td>2.92x</td>
        </tr>
        <tr>
          <td>In</td>
          <td>4.40ms</td>
          <td>12.24ms</td>
          <td>2.79x</td>
        </tr>
      </table>
      <table>
        <tr>
          <th>1000x</th>
          <th>FastWS</th>
          <th>RN</th>
          <th></th>
        </tr>
        <tr>
          <td>Out</td>
          <td>4.36ms</td>
          <td>9.10ms</td>
          <td>2.09x</td>
        </tr>
        <tr>
          <td>In</td>
          <td>27.38ms</td>
          <td>85.23ms</td>
          <td>3.11x</td>
        </tr>
      </table>
      <table>
        <tr>
          <th>10000x</th>
          <th>FastWS</th>
          <th>RN</th>
          <th></th>
        </tr>
        <tr>
          <td>Out</td>
          <td>27.49ms</td>
          <td>91.04ms</td>
          <td>3.31x</td>
        </tr>
        <tr>
          <td>In</td>
          <td>231.99ms</td>
          <td>854.76ms</td>
          <td>3.68x</td>
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
          <th>100x</th>
          <th>FastWS</th>
          <th>RN</th>
          <th></th>
        </tr>
        <tr>
          <td>Out</td>
          <td>1.78ms</td>
          <td>3.70ms</td>
          <td>2.07x</td>
        </tr>
        <tr>
          <td>In</td>
          <td>1.43ms</td>
          <td>24.53ms</td>
          <td>17.17x</td>
        </tr>
      </table>
      <table>
        <tr>
          <th>1000x</th>
          <th>FastWS</th>
          <th>RN</th>
          <th></th>
        </tr>
        <tr>
          <td>Out</td>
          <td>14.80ms</td>
          <td>18.66ms</td>
          <td>1.26x</td>
        </tr>
        <tr>
          <td>In</td>
          <td>17.60ms</td>
          <td>207.00ms</td>
          <td>11.76x</td>
        </tr>
      </table>
      <table>
        <tr>
          <th>10000x</th>
          <th>FastWS</th>
          <th>RN</th>
          <th></th>
        </tr>
        <tr>
          <td>Out</td>
          <td>79.65ms</td>
          <td>218.06ms</td>
          <td>2.74x</td>
        </tr>
        <tr>
          <td>In</td>
          <td>251.55ms</td>
          <td>2179.68ms</td>
          <td>8.67x</td>
        </tr>
      </table>
    </td>
    <td>
      <table>
        <tr>
          <th>100x</th>
          <th>FastWS</th>
          <th>RN</th>
          <th></th>
        </tr>
        <tr>
          <td>Out</td>
          <td>0.36ms</td>
          <td>0.85ms</td>
          <td>2.34x</td>
        </tr>
        <tr>
          <td>In</td>
          <td>4.38ms</td>
          <td>10.82ms</td>
          <td>2.47x</td>
        </tr>
      </table>
      <table>
        <tr>
          <th>1000x</th>
          <th>FastWS</th>
          <th>RN</th>
          <th></th>
        </tr>
        <tr>
          <td>Out</td>
          <td>3.42ms</td>
          <td>6.03ms</td>
          <td>1.76x</td>
        </tr>
        <tr>
          <td>In</td>
          <td>28.66ms</td>
          <td>86.16ms</td>
          <td>3.01x</td>
        </tr>
      </table>
      <table>
        <tr>
          <th>10000x</th>
          <th>FastWS</th>
          <th>RN</th>
          <th></th>
        </tr>
        <tr>
          <td>Out</td>
          <td>23.08ms</td>
          <td>57.33ms</td>
          <td>2.48x</td>
        </tr>
        <tr>
          <td>In</td>
          <td>265.89ms</td>
          <td>836.70ms</td>
          <td>3.15x</td>
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
          <th>100x</th>
          <th>FastWS</th>
          <th>RN</th>
          <th></th>
        </tr>
        <tr>
          <td>Out</td>
          <td>3.02ms</td>
          <td>10.50ms</td>
          <td>3.48x</td>
        </tr>
        <tr>
          <td>In</td>
          <td>1.59ms</td>
          <td>27.96ms</td>
          <td>17.58x</td>
        </tr>
      </table>
      <table>
        <tr>
          <th>1000x</th>
          <th>FastWS</th>
          <th>RN</th>
          <th></th>
        </tr>
        <tr>
          <td>Out</td>
          <td>18.00ms</td>
          <td>105.60ms</td>
          <td>5.87x</td>
        </tr>
        <tr>
          <td>In</td>
          <td>23.72ms</td>
          <td>248.20ms</td>
          <td>10.47x</td>
        </tr>
      </table>
      <table>
        <tr>
          <th>10000x</th>
          <th>FastWS</th>
          <th>RN</th>
          <th></th>
        </tr>
        <tr>
          <td>Out</td>
          <td>X</td>
          <td>X</td>
          <td>X</td>
        </tr>
        <tr>
          <td>In</td>
          <td>X</td>
          <td>X</td>
          <td>X</td>
        </tr>
      </table>
    </td>
    <td>
      <table>
        <tr>
          <th>100x</th>
          <th>FastWS</th>
          <th>RN</th>
          <th></th>
        </tr>
        <tr>
          <td>Out</td>
          <td>0.50ms</td>
          <td>6.13ms</td>
          <td>12.29x</td>
        </tr>
        <tr>
          <td>In</td>
          <td>4.55ms</td>
          <td>14.47ms</td>
          <td>3.18x</td>
        </tr>
      </table>
      <table>
        <tr>
          <th>1000x</th>
          <th>FastWS</th>
          <th>RN</th>
          <th></th>
        </tr>
        <tr>
          <td>Out</td>
          <td>4.27ms</td>
          <td>39.44ms</td>
          <td>9.24x</td>
        </tr>
        <tr>
          <td>In</td>
          <td>26.82ms</td>
          <td>104.71ms</td>
          <td>3.90x</td>
        </tr>
      </table>
      <table>
        <tr>
          <th>10000x</th>
          <th>FastWS</th>
          <th>RN</th>
          <th></th>
        </tr>
        <tr>
          <td>Out</td>
          <td>29.12ms</td>
          <td>417.89ms</td>
          <td>14.35x</td>
        </tr>
        <tr>
          <td>In</td>
          <td>240.16ms</td>
          <td>1060.69ms</td>
          <td>4.42x</td>
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
          <th></th>
        </tr>
        <tr>
          <td>Out</td>
          <td>x</td>
          <td>x</td>
          <td>x</td>
        </tr>
        <tr>
          <td>In</td>
          <td>x</td>
          <td>x</td>
          <td>x</td>
        </tr>
      </table>
    </td>
    <td>
      <table>
        <tr>
          <th>100x</th>
          <th>FastWS</th>
          <th>RN</th>
          <th></th>
        </tr>
        <tr>
          <td>In</td>
          <td>11.71ms</td>
          <td>1770.53ms</td>
          <td>151.20x</td>
        </tr>
      </table>
    </td>
  </tr>
</table>

### Key Insights

**Platform Behavior**
- iOS shows better baseline performance than Android with React Native's WebSocket
- FastWS performs consistently across both platforms
- Most dramatic improvements seen in binary data handling

**Performance Patterns**
- Smallest improvements: Small message counts
- Largest improvements: Binary data and high message counts
- React Native shows exponential slowdown with message count, while FastWS scales more linearly
- Binary format shows advantages for large payloads, especially at higher message counts

### Methodology

All tests were performed with local WebSocket server to minimize network variance. Each test was run enough times to have 10 samples, after removing outliers.

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
