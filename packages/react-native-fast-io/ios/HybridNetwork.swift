//
//  HybridNetwork.swift
//  FastIO
//
//  Created by Mike Grabowski on 06/11/2024.
//

import Foundation
import NitroModules


func convertDictionaryToAnyMapHolder(dictionary: [String: String]) -> AnyMapHolder {
    let anyMap = AnyMapHolder()
    for (key, value) in dictionary {
        anyMap.setString(key: key, value: value)
    }
    return anyMap
}

class HybridNetwork : HybridNetworkSpec {


  func request(opts: RequestOptions) throws -> Promise<margelo.nitro.fastio.Response> {
    guard let requestUrl = URL(string: opts.url) else {
      return Promise.rejected(withError: NSError(domain: "Invalid URL: \(opts.url)", code: -1))
    }
    
    var request = URLRequest(url: requestUrl)
    request.httpMethod = opts.method.stringValue
    
    if let inputStream = opts.body as? HybridInputStream {
      request.httpBodyStream = inputStream.stream
    }


    for (key, value) in opts.headers {
      request.setValue(value, forHTTPHeaderField: key)
    }
  
    let promise = Promise<margelo.nitro.fastio.Response>()
    
    Task {
      do {
          let (byteStream, response) = try await URLSession.shared.bytes(for: request)

          guard let httpResponse = response as? HTTPURLResponse else {
            throw NSError(domain: "Invalid HTTP response", code: -2)
          }
          
          let stream = AsyncBytesInputStream(bytes: byteStream)
          
          let statusCode = Double(httpResponse.statusCode)
          let headers = httpResponse.allHeaderFields as? [String: String] ?? [:]
          
          // Convert response data to a HybridOutputStreamSpec
          let outputStream = HybridInputStream(stream: stream)
 
          let responseObject = Response(status: statusCode,
                                        body: outputStream,
                                        headers: convertDictionaryToAnyMapHolder(dictionary: headers))
          
          promise.resolve(withResult: responseObject)
      } catch {
        promise.reject(withError: error)
      }
    }
    
    return promise
  }
}
