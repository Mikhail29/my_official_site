import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()
async function main() {
    const mixajlov = await prisma.user.upsert({
        where: {email: 'mixajlov.mikhail92@gmail.com'},
        update: {},
        create: {
            email: 'mixajlov.mikhail92@gmail.com',
            name: 'Mixajlov',
            biography: ''
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