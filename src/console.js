import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()
let song = null
const pedido = await prisma.request.findFirst({ include: { song: true } })

if (pedido) {
  await prisma.request.delete({ where: { id: pedido.id } })
  song = pedido.song
}

const songsCount = await prisma.song.count()
const skip = Math.floor(Math.random() * songsCount)
const randomSong = await prisma.song.findMany({ take: 1, skip: skip })

song = randomSong[0]

await prisma.$disconnect()

process.stdout.write(song.path)
process.exit()