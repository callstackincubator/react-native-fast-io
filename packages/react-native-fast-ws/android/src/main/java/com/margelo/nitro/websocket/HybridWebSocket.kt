package com.margelo.nitro.websocket

import com.margelo.nitro.core.ArrayBuffer

class HybridWebSocket(url: String, protocols: Array<String>) : HybridWebSocketSpec() {
    override fun send(message: String) {
       TODO("Not implemented")
    }

    override fun sendArrayBuffer(buffer: ArrayBuffer) {
        TODO("Not implemented")
    }

    override fun connect() {
        TODO("Not implemented")
    }

    override fun close() {
        TODO("Not implemented")
    }

    override fun ping() {
        TODO("Not implemented")
    }

    override fun onOpen(callback: (selectedProtocol: String) -> Unit) {
        TODO("Not implemented")
    }

    override fun onClose(callback: (code: Double, reason: String) -> Unit) {
        TODO("Not implemented")
    }

    override fun onError(callback: (error: String) -> Unit) {
        TODO("Not implemented")
    }

    override fun onMessage(callback: (message: String) -> Unit) {
        TODO("Not implemented")
    }

    override fun onArrayBuffer(callback: (buffer: ArrayBuffer) -> Unit) {
        TODO("Not implemented")
    }

    override val memorySize: Long
        get() = 0L

}
