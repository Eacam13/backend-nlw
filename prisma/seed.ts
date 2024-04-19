import { prisma } from '../src/lib/prisma'

async function seed() {
    await prisma.event.create({
        data: {
            id: '10aa77f7-738c-4a78-aeac-5480ec5a6d88',
            title: 'Unite Summit',
            slug: 'unite-summit',
            details: 'Um evento p/ devs do mundo todo!',
            maximumAttendees: 120,
        }
    })
}

seed().then(() => {
    console.log('Database seeded!')
})

