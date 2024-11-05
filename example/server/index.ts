import { createServer } from './createServer'
import {
  CHAT_PAYLOAD,
  CHAT_PAYLOAD_BINARY,
  CHAT_SERVER_BINARY_PORT,
  CHAT_SERVER_PORT,
  COORDINATE_PAYLOAD,
  COORDINATE_PAYLOAD_BINARY,
  COORDINATE_SERVER_BINARY_PORT,
  COORDINATE_SERVER_PORT,
  IMAGE_SERVER_PORT,
} from './payloads'

async function run() {
  const stopChatServer = createServer(CHAT_PAYLOAD, CHAT_SERVER_PORT)
  const stopChatBinaryServer = createServer(CHAT_PAYLOAD_BINARY, CHAT_SERVER_BINARY_PORT)
  const stopCoordinateServer = createServer(COORDINATE_PAYLOAD, COORDINATE_SERVER_PORT)
  const stopCoordinateBinaryServer = createServer(
    COORDINATE_PAYLOAD_BINARY,
    COORDINATE_SERVER_BINARY_PORT
  )
  const stopImageServer = createServer(
    await Bun.file(__dirname + '/img.jpg').arrayBuffer(),
    IMAGE_SERVER_PORT
  )

  const stopAllServers = () => {
    stopChatServer()
    stopChatBinaryServer()
    stopCoordinateServer()
    stopCoordinateBinaryServer()
    stopImageServer()
  }

  process.on('SIGINT', () => {
    stopAllServers()
    process.exit(0)
  })
}

run()
