package com.margelo.nitro.websocket

class HybridWebSocketManager : HybridWebSocketManagerSpec() {
    override fun create(url: String, protocols: Array<String>): HybridWebSocketSpec {
        throw Error("Unimplemented")
    }

    override val memorySize: Long
        get() = 0L
}