import { defineBuildConfig } from 'unbuild'
import WebSocktet from 'ws'

export default defineBuildConfig({
  entries: [
    'src/index',
  ],
  declaration: 'node16',
  clean: true,
  rollup: {
    inlineDependencies: [
      '@antfu/utils',
    ],
  },
  hooks: {
    'build:done': () => {
      return new Promise((resolve, reject) => {
        const ws = new WebSocktet('ws://localhost:3021')

        const close = () => {
          ws.close()
          resolve(void 0)
        }

        ws.on('error', reject)

        ws.on('open', () => {
          ws.send('build:done', (err) => {
            if (err)
              reject(err)

            close()
          })
        })
      })
    },
  },
})
