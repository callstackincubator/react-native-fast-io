package com.margelo.nitro.fastio

import com.margelo.nitro.core.ArrayBuffer
import com.margelo.nitro.core.Promise
import kotlinx.coroutines.Dispatchers
import kotlinx.coroutines.withContext
import java.io.InputStream

class HybridInputStream(val stream: InputStream) : HybridInputStreamSpec() {
    override fun read(): Promise<ArrayBuffer> {
        return Promise.async {
            withContext(Dispatchers.IO) {
                val bytes = ByteArray(HybridStreamFactory.BUFFER_SIZE)
                val bytesRead = stream.read(bytes, 0, bytes.size)

                when {
                    bytesRead == -1 -> {
                        val emptyBuffer = ArrayBuffer.allocate(0)
                        emptyBuffer
                    }

                    bytesRead > 0 -> {
                        val arrayBuffer = ArrayBuffer.allocate(bytesRead)

                        val destBuffer = arrayBuffer.getBuffer(false)
                        destBuffer.put(bytes, 0, bytesRead)

                        arrayBuffer
                    }

                    else -> {
                        throw Error("Unexpected error reading stream")
                    }
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
