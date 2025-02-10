import Foundation

class AsyncBytesInputStream: InputStream {
    private var buffer = [UInt8]()
    private var finished = false
    private var iterator: URLSession.AsyncBytes.Iterator?
    private var errorOccurred: Error?
    private var internalStatus: Stream.Status = .notOpen

    override var streamError: Error? {
        return errorOccurred
    }

    override var streamStatus: Stream.Status {
        return internalStatus
    }

    let dataAvailableCondition = DispatchSemaphore(value: 0)

    init(bytes: URLSession.AsyncBytes) {
        self.iterator = bytes.makeAsyncIterator()
        super.init(data: Data()) 
    }

    override func open() {
        Task(priority: .userInitiated) { [weak self] in
            await self?.startReadingAsyncBytes()
        }
    }

    override func close() {
        finished = true
        iterator = nil
        dataAvailableCondition.signal()
        super.close()
    }

    override func read(_ bufferPointer: UnsafeMutablePointer<UInt8>, maxLength len: Int) -> Int {
        
        if let errorOccurred = errorOccurred {
            return -1
        }

        
        while buffer.isEmpty && !finished && errorOccurred == nil {
            
            dataAvailableCondition.wait()

            if let errorOccurred = errorOccurred {
                return -1
            }
        }

        
        guard !buffer.isEmpty else {
            return 0
        }

        
        let readCount = min(len, buffer.count)
        let chunk = buffer.prefix(readCount)
        _ = chunk.withUnsafeBytes { srcBuffer in
            memcpy(bufferPointer, srcBuffer.baseAddress!, readCount)
        }
        buffer.removeFirst(readCount)

        return readCount
    }

    override var hasBytesAvailable: Bool {
        return !buffer.isEmpty || !finished
    }

    private func startReadingAsyncBytes() async {
        do {
            let chunkSize = 4096
            var tempBuffer = Data()
            
            while let byte = try await iterator?.next() {
                tempBuffer.append(byte)
                
                if tempBuffer.count >= chunkSize {
                    self.buffer.append(contentsOf: tempBuffer)
                    tempBuffer.removeAll(keepingCapacity: true)
                    dataAvailableCondition.signal()
                }
            }
            // Verarbeiten Sie verbleibende Bytes im temporären Puffer
            if !tempBuffer.isEmpty {
                self.buffer.append(contentsOf: tempBuffer)
                dataAvailableCondition.signal()
            }
        } catch {
            errorOccurred = error
            dataAvailableCondition.signal()
        }

        
        finished = true
        dataAvailableCondition.signal()
    }
}
