package com.margelo.nitro.fastio

import java.io.PipedInputStream
import java.io.PipedOutputStream

class HybridDuplexStream : HybridDuplexStreamSpec() {
    private val pipedInputStream = PipedInputStream(HybridStreamFactory.BUFFER_SIZE)
    private val pipedOutputStream = PipedOutputStream(pipedInputStream)

    override var inputStream = HybridInputStream(pipedInputStream) as HybridInputStreamSpec
    override var outputStream = HybridOutputStream(pipedOutputStream) as HybridOutputStreamSpec
    
    override val memorySize: Long
        get() = inputStream.memorySize + outputStream.memorySize

    fun close() {
        try {
            outputStream.close()
            inputStream.close()
        } catch (e: Exception) {
            println("Error closing duplex stream: ${e.message}")
        }
    }
} 
