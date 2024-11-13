package com.margelo.nitro.fastio

import com.margelo.nitro.core.ArrayBuffer
import java.io.OutputStream

class HybridOutputStream(private val stream: OutputStream) : HybridOutputStreamSpec() {
    private var isOpen = true
    
    override fun hasSpaceAvailable(): Boolean {
        // tbd: we may want to remove this and just read return type from `write`
        return true
    }

    override fun write(buffer: ArrayBuffer, size: Double): Double {
        if (!isOpen) return -1.0
        
        return try {
            val byteBuffer = buffer.getBuffer(false)

            // Create temporary buffer for the data we want to write
            val bytes = ByteArray(size.toInt())
            byteBuffer.get(bytes)

            // Write to output stream
            stream.write(bytes)

            size
        } catch (e: Exception) {
            -1.0
        }
    }

    override fun open() {
        // No explicit open needed for Java OutputStreams
        isOpen = true
    }

    override fun close() {
        if (!isOpen) return
        try {
            stream.flush()
            stream.close()
            isOpen = false
        } catch (e: Exception) {
            println("Error closing stream: ${e.message}")
        }
    }

    override val memorySize: Long
        get() = 0L  // We don't track buffer size for output streams
} 
