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

## Benchmarks

> [!IMPORTANT]
> Benchmarks shown below operate in controlled environments and may not accurately reflect real-world performance. Results can vary significantly based on factors such as:
> - Device model and OS version
> - Network conditions and latency
> - Message payload size and type
> - Application state and concurrent operations

> [!CAUTION]
> These benchmarks are provided to demonstrate theoretical performance benefits and should be used as a general reference rather than absolute performance indicators.

### Methodology

All tests were performed with local WebSocket server to minimize network variance. Each test was run enough times to have 10 samples, after removing outliers. You can browse the benchmark code [here](example/tests/benchmark.tsx) and check each message payload [here](example/tests/payloads.ts).

In the future, we would like to add benchmarks for:
- CPU usage during message processing
- Memory footprint during large transfers
- Connection establishment time
- Concurrent connection handling
- Message latency under high load

Your contributions are welcome! Check out our [contributing guidelines](CONTRIBUTING.md) to help improve these benchmarks.

### Results

#### Small JSON payload - Text

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

#### Small JSON payload - Binary

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

#### Large JSON payload - Text

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
          <td>3.36ms</td>
          <td>21.15ms</td>
          <td>6.30x</td>
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
          <td>Out </td>
          <td>9.83ms</td>
          <td>21.67ms</td>
          <td>2.20x</td>
        </tr>
        <tr>
          <td>In</td>
          <td>18.00ms</td>
          <td>210.93ms</td>
          <td>11.72x</td>
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

#### Large JSON payload - Binary

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
          <td>1.59ms</td>
          <td>13.59ms</td>
          <td>8.52x</td>
        </tr>
        <tr>
          <td>In</td>
          <td>2.79ms</td>
          <td>26.77ms</td>
          <td>9.58x</td>
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
          <td>Out </td>
          <td>16.47ms</td>
          <td>120.34ms</td>
          <td>7.31x</td>
        </tr>
        <tr>
          <td>In</td>
          <td>21.73ms</td>
          <td>250.45ms</td>
          <td>11.53x</td>
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
          <td>Out </td>
          <td>113.43ms</td>
          <td>1317.29ms</td>
          <td>11.61x</td>
        </tr>
        <tr>
          <td>In</td>
          <td>426.67ms</td>
          <td>2971.67ms</td>
          <td>6.96x</td>
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

#### Large Binary (Image - 234KB)

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

