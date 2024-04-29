import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()
async function main() {
    const mixajlov = await prisma.user.upsert({
        where: {nickname: 'Mixajlov'},
        update: {},
        create: {
            email: 'mixajlov.mikhail92@gmail.com',
            nickname: 'Mixajlov',
            password_hash: '',
            password_salt: '',
            iterations: 0
        },
    });
    const site = await prisma.site.upsert({
        where: {title: 'MMWebStudioXS'},
        update: {},
        create: {
            title: 'MMWebStudioXS',
            url: 'http://localhost:3001'
        },
    });
}

main()
    .then(async () => {
        await prisma.$disconnect()
    })
    .catch(async (e) => {
        console.error(e)
        await prisma.$disconnect()
        process.exit(1)
    })