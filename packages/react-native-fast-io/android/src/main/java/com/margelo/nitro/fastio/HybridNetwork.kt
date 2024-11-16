package com.margelo.nitro.fastio

import com.margelo.nitro.core.Promise
import java.net.HttpURLConnection
import java.net.URL
import kotlinx.coroutines.Dispatchers
import kotlinx.coroutines.withContext

class HybridNetwork : HybridNetworkSpec() {
    override fun request(opts: RequestOptions): Promise<Unit> {
        return Promise.async {
            withContext(Dispatchers.IO) {
                val connection = URL(opts.url).openConnection() as HttpURLConnection

                connection.apply {
                    requestMethod = opts.method.name.uppercase()
                    doInput = true
                    doOutput = opts.body != null

//                    opts.body?.let { hybridStream ->
//                        (hybridStream as HybridInputStream).stream.use { input ->
//                            outputStream.buffered().use { output ->
//                                input.copyTo(output, HybridStreamFactory.BUFFER_SIZE)
//                            }
//                        }
//                    }

                    val code = responseCode
                    if (code !in 200..299) {
                        throw Error("HTTP Error: $code")
                    }
                }
            }
        }
    }

    override val memorySize: Long
        get() = 0L
} 
