import { PrismaClient, rarity } from '@prisma/client';

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

  const cardset = await prisma.cardSet.create({
    data: {
      setName: 'TestCardSet',
    },
  });

  const card = await prisma.card.create({
    data: {
      name: 'TestCard',
      desc: 'This card does something',
      rarity: rarity.common,
      cardSet: {
        connect: {
          id: cardset.id,
        },
      },
    },
  });

  const card2 = await prisma.card.create({
    data: {
      name: 'TestCard2',
      desc: 'This card does something too',
      rarity: rarity.common,
      cardSet: {
        connect: {
          id: cardset.id,
        },
      },
    },
  });

  console.log(cardset);

  const card_collection = await prisma.user.update({
    where: {
      id: user.id,
    },
    data: {
      cardCollection: {
        create: {
          cardId: card.id,
          quantity: 1,
        },
      },
    },
  });

  const card_collection2 = await prisma.user.update({
    where: {
      id: user.id,
    },
    data: {
      cardCollection: {
        create: {
          cardId: card2.id,
          quantity: 1,
        },
      },
    },
  });

  await prisma.cardCollection.update({
    where: {
      id: card_collection2.id,
    },
    data: {
      quantity: { increment: 1 },
    },
  });

  console.log(card_collection);
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
