package com.margelo.nitro.fastio

import com.margelo.nitro.core.ArrayBuffer
import com.margelo.nitro.core.Promise
import java.io.InputStream

class HybridInputStream(private val stream: InputStream) : HybridInputStreamSpec() {
    override fun read(): Promise<ArrayBuffer> {
        return Promise<ArrayBuffer>().apply {
            try {
                val bytes = ByteArray(64 * 1024)
                val bytesRead = stream.read(bytes, 0, bytes.size)

                when {
                    bytesRead == -1 -> {
                        // End of stream
                        resolve(ArrayBuffer.allocate(0))
                    }
                    bytesRead > 0 -> {
                        val arrayBuffer = ArrayBuffer.allocate(bytesRead)

                        val destBuffer = arrayBuffer.getBuffer(false)
                        destBuffer.put(bytes, 0, bytesRead)

                        resolve(arrayBuffer)
                    }
                    else -> {
                        // Error case
                        reject(Error("Unexpected error reading stream"))
                    }
                }
            } catch (e: Exception) {
                reject(Error(e.message))
            }
        }
    }

    override fun open() {
        // No explicit open needed for Java InputStreams
    }

    override fun close() {
        stream.close()
    }

    override val memorySize: Long
        get() = try {
            stream.available().toLong()
        } catch (e: Exception) {
            0L
        }
} 
