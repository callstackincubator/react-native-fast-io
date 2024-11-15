package com.margelo.nitro.fastio

import com.margelo.nitro.core.Promise
import java.net.HttpURLConnection
import java.net.URL

class HybridNetwork : HybridNetworkSpec() {
    override fun request(opts: RequestOptions): Promise<Unit> {
        return Promise.async {
            val connection = URL(opts.url).openConnection() as HttpURLConnection

            try {
                connection.apply {
                    requestMethod = opts.method.name.uppercase()
                    doInput = true
                    doOutput = opts.body != null

                    connect()

                    opts.body?.let { hybridStream ->
                        (hybridStream as HybridInputStream).stream.use { input ->
                            outputStream.buffered().use { output ->
                                val buffer = ByteArray(HybridStreamFactory.BUFFER_SIZE)
                                var bytesRead: Int
                                var totalBytes = 0

                                while (input.read(buffer).also { bytesRead = it } != -1) {
                                    output.write(buffer, 0, bytesRead)
                                    output.flush()
                                    totalBytes += bytesRead
                                }
                            }
                        }
                    }

                    val code = responseCode

                    if (code !in 200..299) {
                        val errorBody = errorStream?.bufferedReader()?.readText() ?: "Unknown error"
                        throw Error("HTTP Error $code: $errorBody")
                    }
                }
            } finally {
                connection.disconnect()
            }
        }
    }

    override val memorySize: Long
        get() = 0L
} 
