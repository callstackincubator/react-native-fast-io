// Suite of 850 tests for WHATWG Streams

import './resources/rs-utils'
import './resources/test-utils'
import './resources/rs-test-templates'
import './resources/recording-streams'

// import './readable-streams/garbage-collection.any'
import './readable-streams/floating-point-total-queue-size.any'
import './readable-streams/bad-underlying-sources.any'
import './readable-streams/patched-global.any'
import './readable-streams/from.any'
import './readable-streams/templated.any'
import './readable-streams/async-iterator.any'
import './readable-streams/reentrant-strategies.any'
import './readable-streams/bad-strategies.any'
import './readable-streams/count-queuing-strategy-integration.any'
import './readable-streams/owning-type.any'
import './readable-streams/cancel.any'
import './readable-streams/constructor.any'
import './readable-streams/tee.any'
import './readable-streams/owning-type-message-port.any'
import './readable-streams/general.any'
import './readable-streams/default-reader.any'
import './readable-streams/owning-type-video-frame.any'

// import './transferable/transform-stream-members.any'

import './piping/throwing-options.any'
import './piping/multiple-propagation.any'
import './piping/error-propagation-backward.any'
import './piping/error-propagation-forward.any'
import './piping/close-propagation-forward.any'
import './piping/flow-control.any'
import './piping/abort.any'
import './piping/then-interception.any'
import './piping/general.any'
import './piping/general-addition.any'
import './piping/pipe-through.any'
import './piping/transform-streams.any'
import './piping/close-propagation-backward.any'

import './writable-streams/start.any'
import './writable-streams/floating-point-total-queue-size.any'
import './writable-streams/aborting.any'
import './writable-streams/error.any'
import './writable-streams/byte-length-queuing-strategy.any'
import './writable-streams/properties.any'
import './writable-streams/write.any'
import './writable-streams/bad-strategies.any'
import './writable-streams/count-queuing-strategy.any'
import './writable-streams/constructor.any'
import './writable-streams/bad-underlying-sinks.any'
import './writable-streams/general.any'
import './writable-streams/reentrant-strategy.any'
import './writable-streams/close.any'

import './transform-streams/patched-global.any'
import './transform-streams/properties.any'
import './transform-streams/terminate.any'
import './transform-streams/errors.any'
import './transform-streams/backpressure.any'
import './transform-streams/reentrant-strategies.any'
import './transform-streams/cancel.any'
import './transform-streams/flush.any'
import './transform-streams/general.any'
import './transform-streams/lipfuzz.any'
import './transform-streams/strategies.any'

import './readable-byte-streams/respond-after-enqueue.any'
import './readable-byte-streams/construct-byob-request.any'
import './readable-byte-streams/read-min.any'
import './readable-byte-streams/tee.any'
import './readable-byte-streams/non-transferable-buffers.any'
import './readable-byte-streams/enqueue-with-detached-buffer.any'
import './readable-byte-streams/general.any'
import './readable-byte-streams/bad-buffers-and-views.any'

import './queuing-strategies.any'