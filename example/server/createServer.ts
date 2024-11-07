/// <reference types="bun-types" />

/**
 * Creates a WebSocket server that sends configurable responses and handles file uploads
 */
export function createServer(payload: string | Bun.BufferSource, port: number) {
  const server = Bun.serve({
    async fetch(req, server) {
      // Handle WebSocket upgrade
      if (server.upgrade(req)) {
        return
      }

      // Handle POST /upload
      if (req.method === 'POST' && req.url.endsWith('/upload')) {
        try {
          console.log('Waiting for body...')

          if (!req.body) {
            return new Response('No body provided', { status: 400 })
          }

          for await (const chunk of req.body) {
            console.log('Chunk:', chunk)
          }

          return new Response('Upload successful', { status: 200 })
        } catch (error) {
          console.error('Upload error:', error)
          return new Response('Upload failed', { status: 500 })
        }
      }

      // Default response for other routes
      return new Response('Not found', { status: 404 })
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

  console.log(`Server listening on http://localhost:${port}`)

  // Return cleanup function
  return () => server.stop()
}
