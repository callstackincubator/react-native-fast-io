#include <jni.h>
#include "Constants.h"

extern "C"
JNIEXPORT jint JNICALL
Java_com_margelo_nitro_fastio_HybridStreamFactory_getBufferSize(
    JNIEnv* env,
    jclass /* this */
) {
    return FASTIO_BUFFER_SIZE;
}
