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
        val byteBuffer = buffer.getBuffer(false)

        val tempBuffer = ByteArray(minOf(maxLength.toInt(), buffer.size))

        val bytesRead = stream.read(tempBuffer, 0, tempBuffer.size)

        if (bytesRead > 0) {
            byteBuffer.put(tempBuffer, 0, bytesRead)
        }

        return bytesRead.toDouble()
    }

    override fun open() {
        // no-op
    }

    override fun close() {
        if (!isOpen) return

        stream.close()
        isOpen = false
    }

    override val memorySize: Long
        get() = try {
            stream.available().toLong()
        } catch (e: Exception) {
            0L
        }
} 
