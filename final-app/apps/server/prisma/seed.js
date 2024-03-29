import { PrismaClient } from '@prisma/client';
import slugify from 'slugify';

import { cities } from './cities.js';

// initialize Prisma Client
const prisma = new PrismaClient();

const createTag = async quantity => {
  const tags = [];

  // const index = cities.findIndex(item => item.city === 'Алексеевское')
  //
  // console.log('index: ', index);

  for (let i = 2506; i < quantity; i += 1) {
    const name = `${cities[i].city} | ${cities[i].region}`;
    const shortName = slugify(name, {
      locale: 'en',
      lower: true,
    });

    // console.log(i);
    // console.log(cities[i]);

    const tag = await prisma.tag.create({
      data: {
        name,
        shortName,
        typeId: 4,
      },
    });

    tags.push(tag);
  }

  console.log(`Created ${tags.length} products`);
};

async function main() {
  console.log('Start seeding...');
  await createTag(cities.length - 1);
}

// execute the main function
main()
  .catch(e => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    // close Prisma Client at the end
    await prisma.$disconnect();
  });
