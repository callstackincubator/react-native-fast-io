package com.margelo.nitro.fastio

import com.margelo.nitro.core.ArrayBuffer
import com.margelo.nitro.core.Promise
import java.io.OutputStream

class HybridOutputStream(private val stream: OutputStream) : HybridOutputStreamSpec() {
    
    override fun write(buffer: ArrayBuffer): Promise<Unit> {
        val byteBuffer = buffer.getBuffer(false)
        val bytes = ByteArray(buffer.size)
        byteBuffer.get(bytes)

        return Promise<Unit>().apply {
            try {
                stream.write(bytes)
                resolve(Unit)
            } catch (e: Exception) {
                reject(Error(e.message))
            }
        }
    }

    override fun open() {
        // No explicit open needed for Java OutputStreams
    }

    override fun close() {
        try {
            stream.flush()
            stream.close()
        } catch (e: Exception) {
            println("Error closing stream: ${e.message}")
        }
    }

    override val memorySize: Long
        get() = 0L
} 
