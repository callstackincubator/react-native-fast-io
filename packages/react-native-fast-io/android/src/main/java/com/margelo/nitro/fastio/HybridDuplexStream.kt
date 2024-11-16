package com.margelo.nitro.fastio

import java.io.PipedInputStream
import java.io.PipedOutputStream

class HybridDuplexStream : HybridDuplexStreamSpec() {
    private val pipeIn = PipedInputStream(HybridStreamFactory.BUFFER_SIZE)
    private val pipeOut = PipedOutputStream(pipeIn)

    override var inputStream: HybridInputStreamSpec = HybridInputStream(pipeIn).also {
        System.err.println("Created input stream wrapper")
    }
    
    override var outputStream: HybridOutputStreamSpec = HybridOutputStream(pipeOut).also {
        System.err.println("Created output stream wrapper")
    }

    override val memorySize: Long = 0L

    fun close() {
        try {
            System.err.println("Closing duplex stream")
            pipeOut.close()
            pipeIn.close()
        } catch (e: Exception) {
            System.err.println("Error closing duplex stream: ${e.message}")
        }
    }
} 
