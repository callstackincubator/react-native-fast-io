package com.margelo.nitro.fastio

import com.margelo.nitro.core.Promise
import kotlinx.coroutines.CoroutineScope
import kotlinx.coroutines.Dispatchers
import java.net.HttpURLConnection
import java.net.URL

class HybridNetwork : HybridNetworkSpec() {
    override fun request(opts: RequestOptions): Promise<Unit> {
        Promise.async(CoroutineScope(Dispatchers.IO)) {
            val connection = URL(opts.url).openConnection() as HttpURLConnection
            connection.apply {
                requestMethod = opts.method.name.uppercase()
                doInput = true
                doOutput = opts.body != null

                opts.body?.let { hybridStream ->
                    (hybridStream as HybridInputStream).stream.use { input ->
                        outputStream.buffered().use { output ->
                            input.copyTo(output, HybridStreamFactory.BUFFER_SIZE)
                        }
                    }
                }

                if (responseCode !in 200..299) {
                    throw Error("HTTP Error: $responseCode")
                }
            }
        }
        return Promise.resolved(Unit)
    }

    override val memorySize: Long
        get() = 0L
} 
