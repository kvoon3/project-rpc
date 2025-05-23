# Vite Dependency Force Reinstall Demo

A demonstration of force-reinstalling a dependency after rebuild.

## Steps

1. Start the dev server for `packages/app`
2. Create a WebSocket server
3. Build `packages/toolkits`
4. Send a `build:done` message to the WebSocket server

## Development

```sh
pnpm install

# serve packages/app
nr dev

# build packages/toolkits
nr build
```