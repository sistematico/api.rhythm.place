import { PrismaClient } from '@prisma/client'
import glob from 'glob'
import NodeID3 from 'node-id3'

const prisma = new PrismaClient()

async function main() {
  const listSongs = await glob('/media/songs/**/*.mp3', { absolute: true, stat: true })
  const localSongs = listSongs.sort()
  
  let inserts = []
  for (const song of localSongs) {
    const tags = NodeID3.read(song)    
    const artist = Buffer.from(tags.artist, 'utf-8').toString()
    const title = Buffer.from(tags.title, 'utf-8').toString()
    
    inserts.push(prisma.song.upsert({
      where: { path: song },
      update: {},
      create: { title, artist, path: song }
    }))
  }  

  await prisma.$transaction(inserts)
}

main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
  })
  .finally(async _ => {
    process.exit()
  })