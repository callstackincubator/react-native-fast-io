package com.margelo.nitro.fastio

import com.margelo.nitro.core.Promise
import kotlinx.coroutines.CoroutineScope
import kotlinx.coroutines.Dispatchers
import java.net.HttpURLConnection
import java.net.URL

class HybridNetwork : HybridNetworkSpec() {
    override fun request(opts: RequestOptions): Promise<com.margelo.nitro.fastio.Response> {
        return Promise.async(CoroutineScope(Dispatchers.IO)) {
            val connection = URL(opts.url).openConnection() as HttpURLConnection

            try {
                connection.requestMethod = opts.method.name.uppercase()
                connection.doInput = true
                connection.doOutput = opts.body != null

                opts.headers.forEach { (key, value) ->
                    connection.setRequestProperty(key, value)
                }

                opts.body?.let { hybridStream ->
                    (hybridStream as HybridInputStream).stream.use { input ->
                        connection.outputStream.buffered().use { output ->
                            input.copyTo(output, HybridStreamFactory.BUFFER_SIZE)
                        }
                    }
                }


                val statusCode = connection.responseCode.toDouble()
                val responseBody =
                    HybridInputStream(connection.inputStream)
                val responseHeaders: HashMap<String, String> =  HashMap(connection.headerFields
                    .filterKeys { it != null }
                    .mapValues { (_, value) -> value.joinToString(", ") })

                Response(statusCode, responseBody, responseHeaders)
            } finally {
                // connection.disconnect()
            }
        }
    }

    override val memorySize: Long
        get() = 0L
} 
