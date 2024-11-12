package com.margelo.nitro.fastio

import com.margelo.nitro.core.Promise

class HybridNetwork : HybridNetworkSpec() {
    override fun request(opts: RequestOptions): Promise<Unit> {
        throw NotImplementedError("HybridNetwork.request() not implemented")
    }

    override val memorySize: Long
        get() = 0L
} 
