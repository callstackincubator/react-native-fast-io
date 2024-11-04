/// <reference types="bun-types" />

/**
 * Creates a WebSocket server that sends configurable responses
 */
export function createServer(payload: string | Bun.BufferSource, port: number) {
  const server = Bun.serve({
    fetch(req, server) {
      if (server.upgrade(req)) {
        return
      }
      return new Response('Upgrade failed', { status: 500 })
    },
    websocket: {
      message(ws, message: string) {
        if (typeof message !== 'string') {
          return
        }
        const count = parseInt(message)
        if (isNaN(count)) {
          return
        }
        try {
          for (let i = 0; i < count; i++) {
            ws.send(payload)
          }
        } catch (error) {
          console.error('Failed to parse message:', error)
        }
      },
    },
    port,
  })

  console.log(`WebSocket server listening on ws://localhost:${port}`)

  // Return cleanup function
  return () => server.stop()
}
