import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const GROUPS = [
    {
        id: 1,
        name: 'Grupa wykładowa poranna',
    },
    {
        id: 2,
        name: 'Grupa wykładowa wieczorna',
    },
];

const CLASS_ROOMS = [
    {
        id: 1,
        name: 'Sala wykładowa 1',
    },
    {
        id: 2,
        name: 'Sala wykładowa 2',
    },
    {
        id: 3,
        name: 'Sala wykładowa 3',
    },
];

async function main() {
    for (const group of GROUPS) {
        await prisma.group.upsert({
            where: {
                id: group.id,
            },
            update: group,
            create: group,
        });

        for (const classRoom of CLASS_ROOMS) {
            await prisma.classroom.upsert({
                where: {
                    id: classRoom.id,
                },
                update: classRoom,
                create: classRoom,
            });
        }
    }
}
main()
    .then(async () => {
        await prisma.$disconnect();
    })
    .catch(async (e) => {
        console.error(e);
        await prisma.$disconnect();
        // @ts-ignore
        process.exit(1);
    });
