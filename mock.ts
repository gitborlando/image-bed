import { jsonFy, nanoid, suffixOf } from '@gitborlando/utils'
import { ensureDir } from '@gitborlando/utils/node'
import sizeOf from 'image-size'
import { readdirSync, readFileSync, rmSync, writeFileSync } from 'node:fs'

const json: InfoJson = {
  images: {},
}

rmSync('public', { recursive: true, force: true })

ensureDir('public/images')

const files = readdirSync('images')
for (const file of files) {
  if (file.endsWith('.ts')) continue
  const ratio = getAspectRatio(`images/${file}`).toFixed(4)
  const time = getRandomTime()
  json.images[time] ||= []
  json.images[time].push({
    name: `images/${file}`,
    id: `${time}-${nanoid()}`,
    ratio: +ratio,
    originSize: 1000,
    color: '#000000',
    timestamp: new Date().getTime(),
  })
  json.images[time].sort((a, b) => a.timestamp - b.timestamp)

  const name = `${time}_${nanoid(5)}.${suffixOf(file)}`

  writeFileSync(`public/images/${name}`, readFileSync(`images/${file}`))
}

writeFileSync('public/data.json', jsonFy(json)!)

function getAspectRatio(path: string) {
  const buffer = readFileSync(path)
  const { width, height } = sizeOf(buffer)
  return width / height
}

function getRandomTime() {
  const times = ['02', '05', '08', '11']
  return `2025_${times[Math.floor(Math.random() * times.length)]}`
}
