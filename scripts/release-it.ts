/// <reference types="bun-types" />

import fs from 'node:fs/promises'
import { tmpdir } from 'node:os'

import { execSync } from 'child_process'
import path from 'path'
import * as tar from 'tar'

// Configuration
const REPO_ROOT = path.join(__dirname, '..')
const PACKAGE_ROOT = path.join(REPO_ROOT, 'packages/react-native-fast-ws')
const TMP_DIR = path.join(PACKAGE_ROOT, '.tmp')

async function run() {
  // Get the version to release
  const packageJson = JSON.parse(
    await fs.readFile(path.join(PACKAGE_ROOT, 'package.json'), 'utf-8')
  )
  const version = packageJson.version

  // Prepare the temp directory
  await fs.rm(TMP_DIR, { recursive: true })
  await fs.mkdir(TMP_DIR)

  // Create the package
  console.log('📦 Creating package...')
  execSync(`npm pack`, { stdio: 'inherit', cwd: PACKAGE_ROOT })

  // Get the generated tarball name
  const tarballName = `react-native-fast-ws-${version}.tgz`

  // Extract the tarball
  await tar.x({
    file: path.join(PACKAGE_ROOT, tarballName),
    cwd: TMP_DIR,
  })

  // Copy README from root to the package
  await fs.copyFile(path.join(REPO_ROOT, 'README.md'), path.join(TMP_DIR, 'package/README.md'))

  // Repack the tarball
  await tar.c(
    {
      gzip: true,
      file: path.join(PACKAGE_ROOT, tarballName),
      cwd: TMP_DIR,
    },
    ['package']
  )

  // Clean up
  await fs.rm(TMP_DIR, { recursive: true })

  // Publish using the modified tarball
  console.log('🚀 Publishing to npm...')
  execSync(`npm publish ${tarballName} --access public`, { stdio: 'inherit', cwd: PACKAGE_ROOT })

  await fs.rm(path.join(PACKAGE_ROOT, tarballName))

  console.log(`✅ Successfully released version ${version}!`)
}

run()
