package com.margelo.nitro.fastio

import android.os.Environment
import com.margelo.nitro.core.Promise
import android.content.Intent
import android.app.Activity
import android.net.Uri
import androidx.documentfile.provider.DocumentFile
import com.facebook.react.bridge.BaseActivityEventListener
import com.margelo.nitro.NitroModules

class HybridFileSystem : HybridFileSystemSpec() {
    private val context = NitroModules.applicationContext
        ?: throw RuntimeException("Application context is missing")

    override fun getMetadata(path: String): Metadata {
        val uri = Uri.parse(path)
        val document = DocumentFile.fromSingleUri(context, uri)
            ?: throw RuntimeException("Cannot access file: $path")

        return Metadata(
            name = document.name ?: "",
            path = uri.toString(),
            root = uri.authority ?: "",
            size = document.length().toDouble(),
            type = document.type ?: "application/octet-stream",
            lastModified = document.lastModified().toDouble()
        )
    }

    override fun getWellKnownDirectoryPath(directory: WellKnownDirectory): String {
        return when (directory) {
            WellKnownDirectory.DOCUMENTS -> {
                context.getExternalFilesDir(Environment.DIRECTORY_DOCUMENTS)?.absolutePath
                    ?: throw RuntimeException("Documents directory not available")
            }

            WellKnownDirectory.DOWNLOADS -> {
                Environment.getExternalStoragePublicDirectory(Environment.DIRECTORY_DOWNLOADS).absolutePath
            }

            WellKnownDirectory.PICTURES -> {
                Environment.getExternalStoragePublicDirectory(Environment.DIRECTORY_PICTURES).absolutePath
            }

            WellKnownDirectory.MUSIC -> {
                Environment.getExternalStoragePublicDirectory(Environment.DIRECTORY_MUSIC).absolutePath
            }

            WellKnownDirectory.VIDEOS -> {
                Environment.getExternalStoragePublicDirectory(Environment.DIRECTORY_MOVIES).absolutePath
            }

            else -> throw RuntimeException("Unknown directory: $directory")
        }
    }

    override fun showOpenFilePicker(options: NativeFilePickerOptions?): Promise<Array<String>> {
        return Promise<Array<String>>().apply {
            try {
                val activity = context.currentActivity
                    ?: throw RuntimeException("Activity not available")

                val intent = Intent(Intent.ACTION_GET_CONTENT).apply {
                    type = "*/*"
                    addCategory(Intent.CATEGORY_OPENABLE)

                    if (options?.mimeTypes != null) {
                        putExtra(Intent.EXTRA_MIME_TYPES, options.mimeTypes)
                    }

                    if (options?.multiple == true) {
                        putExtra(Intent.EXTRA_ALLOW_MULTIPLE, true)
                    }
                }

                activity.startActivityForResult(intent, FILE_PICKER_REQUEST_CODE)
                pendingPromise = this
            } catch (e: Exception) {
                reject(Error(e.message))
            }
        }
    }

    private var pendingPromise: Promise<Array<String>>? = null

    private val activityEventListener = object : BaseActivityEventListener() {
        override fun onActivityResult(
            activity: Activity,
            requestCode: Int,
            resultCode: Int,
            data: Intent?
        ) {
            handleActivityResult(requestCode, resultCode, data)
        }
    }.also { listener ->
        // tbd: register/deregister accordingly
        context.addActivityEventListener(listener)
    }

    private fun handleActivityResult(requestCode: Int, resultCode: Int, data: Intent?) {
        if (requestCode == FILE_PICKER_REQUEST_CODE) {
            val promise = pendingPromise
                ?: throw RuntimeException("Promise missing")

            if (resultCode == Activity.RESULT_OK && data != null) {
                try {
                    val paths = mutableListOf<String>()

                    if (data.clipData != null) {
                        // Multiple files
                        for (i in 0 until data.clipData!!.itemCount) {
                            data.clipData!!.getItemAt(i).uri.toString().let {
                                paths.add(it)
                            }
                        }
                    } else {
                        // Single file
                        data.data?.toString()?.let {
                            paths.add(it)
                        }
                    }

                    promise.resolve(paths.toTypedArray())
                } catch (e: Exception) {
                    promise.reject(Error(e.message))
                }
            } else {
                promise.reject(Error("File picker cancelled"))
            }

            pendingPromise = null
        }
    }

    override val memorySize: Long
        get() = 0L

    companion object {
        private const val FILE_PICKER_REQUEST_CODE = 1001
    }
}
