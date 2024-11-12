package com.margelo.nitro.fastio

import com.margelo.nitro.core.ArrayBuffer
import java.io.InputStream

class HybridInputStream(private val stream: InputStream) : HybridInputStreamSpec() {
    private var isOpen = true

    override fun hasBytesAvailable(): Boolean {
        if (!isOpen) return false

        return try {
            stream.available() > 0
        } catch (e: Exception) {
            false
        }
    }

    override fun read(buffer: ArrayBuffer, maxLength: Double): Double {
        // Get ByteBuffer from ArrayBuffer
        val byteBuffer = buffer.getBuffer(false)

        // Create temporary byte array for reading
        val tempBuffer = ByteArray(minOf(maxLength.toInt(), buffer.size))

        // Read into temp buffer
        val bytesRead = stream.read(tempBuffer, 0, tempBuffer.size)

        if (bytesRead > 0) {
            // Copy from temp buffer to ByteBuffer
            byteBuffer.put(tempBuffer, 0, bytesRead)
        }

        return bytesRead.toDouble()
    }

    override fun open() {
        // no-op
    }

    override fun close() {
        if (!isOpen) return

        try {
            stream.close()
            isOpen = false
        } catch (e: Exception) {
            // Log error but don't throw as close() should be silent
            println("Error closing stream: ${e.message}")
        }
    }

    override val memorySize: Long
        get() = try {
            // Estimate memory usage:
            // - InputStream reference
            // - Boolean flag
            // - Any buffered data
            stream.available().toLong() + 16
        } catch (e: Exception) {
            16L  // Minimum size if we can't determine available bytes
        }

    // Clean up resources in case GC kicks in
    protected fun finalize() {
        if (isOpen) {
            close()
        }
    }
} 
