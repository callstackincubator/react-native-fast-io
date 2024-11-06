import { TextDecoder } from 'node:util'

import { describe, expect, it } from 'vitest'
import { ReadableStream } from 'web-streams-polyfill'

import { Blob } from '../blob'

describe('Blob', () => {
  describe('constructor', () => {
    it('should create an empty Blob', () => {
      const blob = new Blob()
      expect(blob.size).toBe(0)
      expect(blob.type).toBe('')
    })

    it('should create a Blob from string', () => {
      const blob = new Blob(['Hello, world!'])
      expect(blob.size).toBe(13)
      expect(blob.type).toBe('')
    })

    it('should create a Blob from ArrayBuffer', () => {
      const buffer = new ArrayBuffer(8)
      const blob = new Blob([buffer])
      expect(blob.size).toBe(8)
      expect(blob.type).toBe('')
    })

    it('should create a Blob from Uint8Array', () => {
      const array = new Uint8Array([1, 2, 3, 4])
      const blob = new Blob([array])
      expect(blob.size).toBe(4)
      expect(blob.type).toBe('')
    })

    it('should create a Blob with type', () => {
      const blob = new Blob(['<html></html>'], { type: 'text/html' })
      expect(blob.type).toBe('text/html')
    })

    it('should lowercase the type', () => {
      const blob = new Blob([''], { type: 'TEXT/HTML' })
      expect(blob.type).toBe('text/html')
    })

    it('should create a Blob from Blob', () => {
      const blob = new Blob(['Hello, world!'])
      const blob2 = new Blob([blob])
      expect(blob2.size).toBe(13)
      expect(blob2.type).toBe('')
    })

    it('should create a Blob from multiple parts', () => {
      const blob = new Blob(['Hello, ', 'world!'])
      expect(blob.size).toBe(13)
      expect(blob.type).toBe('')
    })
  })

  describe('slice', () => {
    const originalBlob = new Blob(['Hello,', ' ', new Blob(['world!'])])

    it('should slice without arguments', () => {
      const sliced = originalBlob.slice()
      expect(sliced.size).toBe(originalBlob.size)
    })

    it('should slice with start only', () => {
      const sliced = originalBlob.slice(7)
      expect(sliced.size).toBe(6)
    })

    it('should slice with start and end', () => {
      const sliced = originalBlob.slice(0, 5)
      expect(sliced.size).toBe(5)
    })

    it('should handle negative indices', () => {
      const sliced = originalBlob.slice(-6, -1)
      expect(sliced.size).toBe(5)
    })

    it('should handle out of range indices', () => {
      const sliced = originalBlob.slice(20, 30)
      expect(sliced.size).toBe(0)
    })

    it('should set content type', () => {
      const sliced = originalBlob.slice(0, 5, 'text/plain')
      expect(sliced.type).toBe('text/plain')
    })
  })

  describe('stream', () => {
    it('should return a ReadableStream', () => {
      const blob = new Blob(['Hello, world!'])
      const stream = blob.stream()
      expect(stream).toBeInstanceOf(ReadableStream)
    })

    it('should stream the correct data', async () => {
      const blob = new Blob(['Hello, world!'])
      const stream = blob.stream()
      const reader = stream.getReader()
      const decoder = new TextDecoder()

      let result = ''

      // eslint-disable-next-line no-constant-condition
      while (true) {
        const { done, value } = await reader.read()
        if (done) break
        result += decoder.decode(value)
      }

      expect(result).toBe('Hello, world!')
    })
  })

  describe('arrayBuffer', () => {
    it('should return an ArrayBuffer', async () => {
      const blob = new Blob(['Hello, world!'])
      const buffer = await blob.arrayBuffer()
      expect(buffer).toBeInstanceOf(ArrayBuffer)
      expect(buffer.byteLength).toBe(13)
    })

    it('should contain the correct data', async () => {
      const blob = new Blob(['Hello, world!'])
      const buffer = await blob.arrayBuffer()
      const result = new TextDecoder().decode(new Uint8Array(buffer))
      expect(result).toBe('Hello, world!')
    })
  })

  describe('text', () => {
    it('should return the correct text', async () => {
      const blob = new Blob(['Hello, world!'])
      const text = await blob.text()
      expect(text).toBe('Hello, world!')
    })

    it('should handle empty Blob', async () => {
      const blob = new Blob()
      const text = await blob.text()
      expect(text).toBe('')
    })
  })

  describe('Complex Blob operations', () => {
    it('should handle Blob of Blobs', async () => {
      const blob1 = new Blob(['Hello, '])
      const blob2 = new Blob(['world!'])
      const complexBlob = new Blob([blob1, blob2])

      expect(complexBlob.size).toBe(13)
      const text = await complexBlob.text()
      expect(text).toBe('Hello, world!')
    })

    it('should handle mixed content types', async () => {
      const string = 'Hello, '
      const uint8Array = new Uint8Array([119, 111, 114, 108, 100, 33]) // 'world!'
      const mixedBlob = new Blob([string, uint8Array])

      expect(mixedBlob.size).toBe(13)
      const text = await mixedBlob.text()
      expect(text).toBe('Hello, world!')
    })
  })
})
