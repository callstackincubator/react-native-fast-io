//
//  SocketStream.swift
//  ReactNativeFastWS
//
//  Created by Mike Grabowski on 15/09/2024.
//

import Foundation

typealias AsyncStream = AsyncThrowingStream<URLSessionWebSocketTask.Message, Error>

class WebSocketStream: AsyncSequence {
  typealias AsyncIterator = AsyncStream.Iterator
  typealias Element = URLSessionWebSocketTask.Message
  
  private var continuation: AsyncStream.Continuation?
  let ws: URLSessionWebSocketTask
  
  private lazy var stream: AsyncStream = {
    return AsyncStream { continuation in
      self.continuation = continuation
    
      Task {
        var isAlive = true
        while isAlive && ws.closeCode == .invalid {
          do {
            let value = try await ws.receive()
            continuation.yield(value)
          } catch {
            continuation.finish(throwing: error)
            isAlive = false
          }
        }
      }
    }
  }()
  
  init(ws: URLSessionWebSocketTask) {
    self.ws = ws
  }
  
  func makeAsyncIterator() -> AsyncIterator {
    return stream.makeAsyncIterator()
  }
}
