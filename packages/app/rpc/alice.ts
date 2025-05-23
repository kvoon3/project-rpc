import type {AliceFunctions, BobFunctions} from './types'
import {channel} from './channel'
import { createBirpc } from 'birpc'

const alice: AliceFunctions = {
  hi(name: string) {
    return `hi ${name}, i am alice`
  }
}

const rpc = createBirpc<BobFunctions, AliceFunctions>(
  alice, 
  {
    post: data => channel.port2.postMessage(data),
    on: fn => channel.port2.on('message', fn),
  },
)

setInterval(async () => {
  console.log('trigger')
  const res = await rpc.hey('alice')
  console.log('res',res)
}, 3000);