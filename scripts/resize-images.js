const fs = require('fs/promises')
const path = require('path')
const sharp = require('sharp')
const sizeOf = require('image-size')

const WIDTH = 512
const HEIGHT = 512
const FORMAT = 'webp'

async function run() {
    const files = await fs.readdir(path.join(__dirname, '..', 'raw_images'))
    const total = files.length
    let read = 0
    let resized = 0
    let written = 0
    let skipped = 0

    const report = () => {
        console.clear()
        console.log('Resizing images', written + skipped, '/', total, `(${read} read, ${resized} resized, ${written} written, ${skipped} skipped)`)
    }

    report()
    await Promise.all(files.map(file => (async () => {
        const src = path.join(__dirname, '..', 'raw_images', file)
        const dst = path.join(__dirname, '..', 'public', 'images', path.basename(file, path.extname(file)) + '.' + FORMAT)
        try {
            const existing = await fs.readFile(dst)
            const { width, height } = sizeOf(existing)
            if (width === WIDTH && height === HEIGHT) {
                skipped++
                return
            }
        } catch (e) {

        }
        const input = await fs.readFile(src)
        read++
        report()
        const output = await sharp(input).resize(WIDTH, HEIGHT).toFormat(FORMAT).toBuffer()
        resized++
        report()
        await fs.writeFile(dst, output)
        written++
        report()
    })()))
    report()
    console.log('Done')
}

run()
