package com.margelo.nitro.websocket

import com.margelo.nitro.core.ArrayBuffer
import okhttp3.*
import okio.ByteString
import okio.ByteString.Companion.toByteString
import java.util.concurrent.TimeUnit

class HybridWebSocket(url: String, protocols: Array<String>) : HybridWebSocketSpec() {
    private var onOpenCallback: ((String) -> Unit)? = null
    private var onCloseCallback: ((Double, String) -> Unit)? = null
    private var onErrorCallback: ((String) -> Unit)? = null
    private var onMessageCallback: ((String) -> Unit)? = null
    private var onArrayBufferCallback: ((ArrayBuffer) -> Unit)? = null

    private val client = OkHttpClient.Builder()
        .readTimeout(0, TimeUnit.MILLISECONDS) // Disable timeouts
        .build()

    private var webSocket: WebSocket? = null

    private val listener = object : WebSocketListener() {
        override fun onOpen(webSocket: WebSocket, response: Response) {
            val protocol = response.header("Sec-WebSocket-Protocol") ?: ""
            onOpenCallback?.invoke(protocol)
        }

        override fun onMessage(webSocket: WebSocket, text: String) {
            onMessageCallback?.invoke(text)
        }

        override fun onMessage(webSocket: WebSocket, bytes: ByteString) {
            val buffer = ArrayBuffer.allocate(bytes.size)
            buffer.getBuffer(false).put(bytes.toByteArray())
            onArrayBufferCallback?.invoke(buffer)
        }

        override fun onClosing(webSocket: WebSocket, code: Int, reason: String) {
            onCloseCallback?.invoke(code.toDouble(), reason)
        }

        override fun onClosed(webSocket: WebSocket, code: Int, reason: String) {
            webSocket.close(code, reason)
        }

        override fun onFailure(webSocket: WebSocket, t: Throwable, response: Response?) {
            onErrorCallback?.invoke(t.message ?: "WebSocket error")
        }
    }

    private val request = Request.Builder()
        .url(url)
        .apply {
            if (protocols.isNotEmpty()) {
                header("Sec-WebSocket-Protocol", protocols.joinToString(", "))
            }
        }
        .build()

    override fun connect() {
        webSocket = client.newWebSocket(request, listener)
    }

    override fun close() {
        webSocket?.close(1000, null)
    }

    override fun send(message: String) {
        webSocket?.send(message)
    }

    override fun sendArrayBuffer(buffer: ArrayBuffer) {
        webSocket?.send(buffer.getBuffer(false).toByteString())
    }

    override fun ping() {
        webSocket?.send(ByteString.EMPTY)
    }

    override fun onOpen(callback: (selectedProtocol: String) -> Unit) {
        onOpenCallback = callback
    }

    override fun onClose(callback: (code: Double, reason: String) -> Unit) {
        onCloseCallback = callback
    }

    override fun onError(callback: (error: String) -> Unit) {
        onErrorCallback = callback
    }

    override fun onMessage(callback: (message: String) -> Unit) {
        onMessageCallback = callback
    }

    override fun onArrayBuffer(callback: (buffer: ArrayBuffer) -> Unit) {
        onArrayBufferCallback = callback
    }

    override val memorySize: Long
        get() = 0L // Implement proper memory calculation if needed
}
