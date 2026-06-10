import tailwindcss from '@tailwindcss/vite'
import react from '@vitejs/plugin-react'
import { codeInspectorPlugin } from 'code-inspector-plugin'
import type { Plugin } from 'vite'
import { defineConfig } from 'vite'

const ReactCompilerConfig = {}

// vite dev does not resolve directory indexes inside publicDir; static hosts do
const starterDirectoryIndex = (): Plugin => ({
  name: 'starter-directory-index',
  configureServer(server) {
    server.middlewares.use((req, _res, next) => {
      if (req.url === '/starter' || req.url === '/starter/') {
        req.url = '/starter/index.html'
      }
      next()
    })
  },
})

export default defineConfig({
  plugins: [
    starterDirectoryIndex(),
    react({
      babel: {
        plugins: [['babel-plugin-react-compiler', ReactCompilerConfig]],
      },
    }),
    tailwindcss(),
    codeInspectorPlugin({
      bundler: 'vite',
      editor: 'cursor',
      hotKeys: ['altKey'],
    }),
  ],
})
