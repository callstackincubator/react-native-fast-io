//
//  HybridStyle.swift
//  ReactNativeFastWS
//
//  Created by Mike Grabowski on 13/09/2024.
//

import NitroModules
import Network

class HybridWebSocket : HybridWebSocketSpec {
  var onOpen: ((String) -> Void)?
  var onClose: ((Double, String) -> Void)?
  var onError: ((String) -> Void)?
  
  var onMessage: ((String) -> Void)?
  var onArrayBuffer: ((ArrayBufferHolder) -> Void)?
  
  private var connection: NWConnection
  private var isConnected = false
  
  public init(url: String, protocols: [String]) {
    guard let url = URL(string: url) else {
      fatalError("Invalid URL provided")
    }
    
    // Setup WebSocket parameters
    let parameters: NWParameters
    if url.scheme == "wss" {
      parameters = NWParameters.tls
    } else {
      parameters = NWParameters.tcp // For ws:// connections
    }
    
    let wsOptions = NWProtocolWebSocket.Options()
    wsOptions.autoReplyPing = true
//    if !protocols.isEmpty {
//      wsOptions.subprotocols = protocols
//    }
    parameters.defaultProtocolStack.applicationProtocols.insert(wsOptions, at: 0)
    
    connection = NWConnection(to: .url(url), using: parameters)
    setupConnection()
  }
  
  private func setupConnection() {
    connection.stateUpdateHandler = { [weak self] state in
      switch state {
      case .ready:
        self?.isConnected = true
        self?.onOpen?("")
        self?.receiveMessage()
      case .failed(let error):
        self?.isConnected = false
        self?.onError?(error.localizedDescription)
      case .cancelled:
        self?.isConnected = false
        self?.onClose?(1000, "Connection cancelled")
      default:
        break
      }
    }
  }
  
  func connect() {
    connection.start(queue: .main)
  }
  
  func close(code: Double, reason: String) {
    let metadata = NWProtocolWebSocket.Metadata(opcode: .close)
    let context = NWConnection.ContentContext(identifier: "close",
                                            metadata: [metadata])
    
    connection.send(content: reason.data(using: .utf8),
                   contentContext: context,
                   isComplete: true,
                   completion: .idempotent)
    connection.cancel()
  }
  
  private func receiveMessage() {
    connection.receive(minimumIncompleteLength: 1, maximumLength: 65536) { [weak self] content, context, isComplete, error in
      guard let self = self else { return }
      
      if let error {
        self.onError?(error.localizedDescription)
        return
      }
      
      if let context = context,
         let metadata = context.protocolMetadata.first as? NWProtocolWebSocket.Metadata {
        switch metadata.opcode {
        case .text:
          if let content = content,
             let string = String(data: content, encoding: .utf8) {
            self.onMessage?(string)
          }
        case .binary:
          if let content = content {
            self.processArrayBuffer(content)
          }
        case .ping:
          self.handlePing(content: content)
        case .close:
          self.handleClose(content: content)
        default:
          break
        }
      }
      
      if self.isConnected {
        self.receiveMessage()
      }
    }
  }
  
  private func handlePing(content: Data?) {
    let metadata = NWProtocolWebSocket.Metadata(opcode: .pong)
    let context = NWConnection.ContentContext(identifier: "pong",
                                            metadata: [metadata])
    
    connection.send(content: content,
                   contentContext: context,
                   isComplete: true,
                   completion: .idempotent)
  }
  
  private func handleClose(content: Data?) {
    isConnected = false
    let reason = content.flatMap { String(data: $0, encoding: .utf8) } ?? ""
    onClose?(1000, reason)
    connection.cancel()
  }
  
  func processArrayBuffer(_ other: Data) {
    let data = UnsafeMutablePointer<UInt8>.allocate(capacity: other.count)
    other.copyBytes(to: data, count: other.count)
    
    let deleteFunc = SwiftClosure {
      data.deallocate()
    }
    
    self.onArrayBuffer?(ArrayBufferHolder.makeBuffer(data, other.count, deleteFunc))
  }
  
  func send(message: String) {
    guard let data = message.data(using: .utf8) else { return }
    
    let metadata = NWProtocolWebSocket.Metadata(opcode: .text)
    let context = NWConnection.ContentContext(identifier: "message",
                                            metadata: [metadata])
    
    connection.send(content: data,
                   contentContext: context,
                   isComplete: true,
                   completion: .contentProcessed { [weak self] error in
      if let error {
        self?.onError?(error.localizedDescription)
      }
    })
  }
  
  func sendArrayBuffer(buffer: ArrayBufferHolder) throws {
    let data = Data(bytes: buffer.data, count: buffer.size)
    let metadata = NWProtocolWebSocket.Metadata(opcode: .binary)
    let context = NWConnection.ContentContext(identifier: "binary",
                                            metadata: [metadata])
    
    connection.send(content: data,
                   contentContext: context,
                   isComplete: true,
                   completion: .contentProcessed { [weak self] error in
      if let error {
        self?.onError?(error.localizedDescription)
      }
    })
  }
  
  func ping() {
    let metadata = NWProtocolWebSocket.Metadata(opcode: .ping)
    let context = NWConnection.ContentContext(identifier: "ping",
                                            metadata: [metadata])
    
    connection.send(content: nil,
                   contentContext: context,
                   isComplete: true,
                   completion: .contentProcessed { [weak self] error in
      if let error {
        self?.onError?(error.localizedDescription)
      }
    })
  }
  
  func onOpen(callback: @escaping ((String) -> Void)) {
    onOpen = callback
  }
  
  func onClose(callback: @escaping ((Double, String) -> Void)) {
    onClose = callback
  }
  
  func onMessage(callback: @escaping ((String) -> Void)) {
    onMessage = callback
  }
  
  func onArrayBuffer(callback: @escaping ((ArrayBufferHolder) -> Void)) {
    onArrayBuffer = callback
  }
  
  func onError(callback: @escaping ((String) -> Void)) {
    onError = callback
  }
  
  var hybridContext = margelo.nitro.HybridContext()
  var memorySize: Int {
    return getSizeOf(self)
  }
  
  deinit {
    connection.cancel()
  }
}
