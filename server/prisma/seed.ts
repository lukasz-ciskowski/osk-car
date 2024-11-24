import { PrismaClient } from '@prisma/client';
import objectId from 'bson-objectid';

const prisma = new PrismaClient();

async function main() {}
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
