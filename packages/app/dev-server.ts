/* eslint-disable no-console */
import { fileURLToPath } from 'node:url'
import { exec } from 'tinyexec'
import { createServer, ViteDevServer } from 'vite'
import { WebSocketServer } from 'ws'

const __dirname = fileURLToPath(new URL('.', import.meta.url))

async function main() {
  const server = await createServer({
    configFile: './vite.config.ts',
    root: __dirname,
    clearScreen: false,
  })

  const viteDevServer = await server.listen()

  startForceReinstallWss(viteDevServer)

  server.printUrls()
  server.bindCLIShortcuts({ print: true })
}

function startForceReinstallWss(viteDevServer: ViteDevServer) {
  const wss = new WebSocketServer({
    port: 3021,
  })

  wss.on('connection', (ws) => {
    ws.on('message', async (msg) => {
      if (msg.toString() === 'build:done') {
        await exec('nun', ['toolkits'])
        await exec('ni', ['link:../toolkits'])
        
        viteDevServer.restart()
      }
    })
  })

  wss.on('listening', () => {
    console.log('force reinstall websocket is ready.')
  })

}

main()
