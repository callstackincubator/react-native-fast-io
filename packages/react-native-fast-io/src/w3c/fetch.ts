import '@bacons/text-decoder/install'

import { Network, RequestMethod } from '../native/network.nitro'
import { Blob } from './blob'
import { File } from './fs'
import { fromReadableStream, ReadableStream, stringToStream } from './streams'

const decoder = new TextDecoder()

function mergeArrayBuffers(buffers: ArrayBuffer[]): Uint8Array {
  const start = performance.now()
  const totalLength = buffers.reduce((sum, buffer) => sum + buffer.byteLength, 0)

  const mergedArray = new Uint8Array(totalLength)

  let offset = 0
  for (const buffer of buffers) {
    const uint8Array = new Uint8Array(buffer)
    mergedArray.set(uint8Array, offset)
    offset += uint8Array.length
  }
  console.log('mergeArrayBuffers took: ' + (performance.now() - start) + 'ms')

  return mergedArray
}

export async function fetch(
  url: string,
  {
    body,
    method,
    headers = {},
  }: {
    body?: ReadableStream | Blob | File | string | undefined
    method: RequestMethod
    headers?: Record<string, string>
  }
) {
  let bodyStream: ReadableStream | undefined = undefined

  if (typeof body === 'string') {
    bodyStream = stringToStream(body)
    if (headers['Content-Length'] === undefined && headers['content-length'] === undefined) {
      headers['Content-Length'] = body.length.toString()
    }
  } else if (body instanceof Blob || body instanceof File) {
    bodyStream = body.stream()
  } else {
    bodyStream = body
  }

  const response = await Network.request({
    method,
    url,
    body: bodyStream ? fromReadableStream(bodyStream) : null,
    headers,
  })

  async function bytes() {
    const chunks: ArrayBuffer[] = []

    let chunk: ArrayBuffer

    response.body.open()

    do {
      chunk = await response.body.read()

      if (chunk.byteLength > 0) {
        chunks.push(chunk)
      }
    } while (chunk.byteLength > 0)

    return mergeArrayBuffers(chunks)
  }

  async function arrayBuffer() {
    return (await bytes()).buffer
  }

  async function text() {
    return decoder.decode(await bytes())
  }

  async function json() {
    const result = await text()
    try {
      return JSON.parse(result)
    } catch (error) {
      throw new Error('Invalid JSON: ' + error + '\n' + result)
    }
  }

  return {
    status: response.status,
    headers: response.headers,
    body: response.body,
    json,
    text,
    arrayBuffer,
    bytes,
    ok: response.status >= 200 && response.status < 300,
  }
}
