import { one, two } from 'toolkits'

const buildTime = __buildTime__

export function setup(element: HTMLButtonElement) {
  const date = new Date(Number(buildTime)).toLocaleString()
  element.innerHTML = `
  <h1>Force intall dev server</h1>
  <code>${one} + ${two} = ${one + two}</code>
  <div style="font-size: 16px">
    <code>build at:</code> <time datetime="${date}">${date}</time>
  </div>
  `
}
