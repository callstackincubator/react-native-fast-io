/**
 * This file contains the payloads that are used in the test.
 */

const encoder = new TextEncoder()

export const CHAT_PAYLOAD = JSON.stringify({
  id: '123e4567-e89b-12d3-a456-426614174000',
  type: 'message',
  content: {
    text: 'Hello! How are you doing today? 👋',
    mentions: ['@mike'],
    attachments: [],
  },
  room: {
    id: 'room_456',
    type: 'direct',
  },
  metadata: {
    client: 'react-native-fast-io/1.0.0',
  },
})

export const CHAT_PAYLOAD_BINARY = encoder.encode(JSON.stringify(CHAT_PAYLOAD))

export const COORDINATE_PAYLOAD = JSON.stringify({
  coords: [456, 750],
})
export const COORDINATE_PAYLOAD_BINARY = encoder.encode(JSON.stringify(COORDINATE_PAYLOAD))

export const CHAT_SERVER_PORT = 3000
export const CHAT_SERVER_BINARY_PORT = 3001

export const COORDINATE_SERVER_PORT = 3002
export const COORDINATE_SERVER_BINARY_PORT = 3003

export const IMAGE_SERVER_PORT = 3004
