/// <reference types="bun-types" />

/**
 * This file is a simple WebSocket server that sends back messages to the client.
 * It is meant to be run directly with Bun.
 */

Bun.serve({
  fetch(req, server) {
    // upgrade the request to a WebSocket
    if (server.upgrade(req)) {
      return // do not return a Response
    }
    return new Response('Upgrade failed', { status: 500 })
  },
  websocket: {
    message(ws, message: string) {
      if (typeof message !== 'string' || !message.startsWith('{')) {
        return
      }

      const { count, binary } = JSON.parse(message)

      for (let i = 0; i < count; i++) {
        const msg = 'ack'.repeat(25)
        ws.send(binary ? new TextEncoder().encode(msg) : msg)
      }
    },
  }, // handlers
  port: 3000,
})
