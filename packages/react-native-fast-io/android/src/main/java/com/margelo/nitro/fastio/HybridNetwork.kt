package com.margelo.nitro.fastio

import android.util.Log
import com.margelo.nitro.core.Promise
import java.net.HttpURLConnection
import java.net.URL

class HybridNetwork : HybridNetworkSpec() {
    override fun request(opts: RequestOptions): Promise<Unit> {
         return Promise.async {
             val connection = URL(opts.url).openConnection() as HttpURLConnection

             connection.apply {
                 requestMethod = opts.method.name.uppercase()
                 doInput = true

                 opts.body?.let { hybridStream ->
                     (hybridStream as HybridInputStream).stream.use { input ->
                         outputStream.use { output ->
                             val buffer = ByteArray(HybridStreamFactory.BUFFER_SIZE)
                             var bytesRead: Int
                            
                             while (input.read(buffer).also { bytesRead = it } != -1) {
                                 output.write(buffer, 0, bytesRead)
                                 output.flush()  // Important: flush each chunk
                             }
                         }
                     }
                 }

                 connect()

                 if (responseCode in 200..299) {
                     // tbd
                 } else {
                     throw Error("HTTP Error: $responseCode")
                 }
             }

             connection.disconnect()
         }
    }

    override val memorySize: Long
        get() = 0L
} 
