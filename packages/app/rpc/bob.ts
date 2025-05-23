import { channel } from './channel'
import { createBirpc } from 'birpc'
import type { BobFunctions, AliceFunctions } from './types'

const Bob: BobFunctions = {
  hey(name: string) {
    return `Hey ${name}, I am Bob`
  }
}

const rpc = createBirpc<AliceFunctions, BobFunctions>(
  Bob,
  {
    post: data => channel.port1.postMessage(data),
    on: fn => channel.port1.on('message', fn),
  },
)

setInterval(async () => {
  console.log('trigger')
  const res = await rpc.hi('Bob') // Hi Bob, I am Alice
  console.log('res',res)
}, 3000)