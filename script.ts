import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  // ... you will write your Prisma Client queries here
  const user = await prisma.user.create({
    data: {
      name: 'Test',
      email: 'test@seafarers.cafe',
      relatedNames: {
        create: {
          name: 'TestRelatedName',
        },
      },
    },
  });

  await prisma.relatedName.create({
    data: {
      name: 'test',
      user: {
        connect: {
          id: user.id,
        },
      },
    },
  });

  console.log(user);
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })

  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
