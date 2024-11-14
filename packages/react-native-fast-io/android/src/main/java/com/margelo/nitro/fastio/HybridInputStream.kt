package com.margelo.nitro.fastio

import com.margelo.nitro.core.ArrayBuffer
import com.margelo.nitro.core.Promise
import java.io.InputStream

class HybridInputStream(public val stream: InputStream) : HybridInputStreamSpec() {
    override fun read(): Promise<ArrayBuffer> {
        return Promise.async {
            val bytes = ByteArray(HybridStreamFactory.BUFFER_SIZE)
            val bytesRead = stream.read(bytes, 0, bytes.size)

            when {
                bytesRead == -1 -> {
                    // End of stream
                    ArrayBuffer.allocate(0)
                }
                bytesRead > 0 -> {
                    val arrayBuffer = ArrayBuffer.allocate(bytesRead)

                    val destBuffer = arrayBuffer.getBuffer(false)
                    destBuffer.put(bytes, 0, bytesRead)

                    arrayBuffer
                }
                else -> {
                    // Error case
                    throw Error("Unexpected error reading stream")
                }
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
