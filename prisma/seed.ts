import { Prisma, PrismaClient } from "@prisma/client";
import { ObjectId } from "bson";
const prisma = new PrismaClient();

async function main() {
  const tipoSushi = await prisma.restaurantType.upsert({
    where: { name: "Sushi" },
    create: {
      id: new ObjectId().toHexString(),
      name: "Sushi",
      description: "Sushi",
      image: "https://i.imgur.com/8Q9QY7r.png",
    },
    update: {},
  });

  const tipoHamburgueria = await prisma.restaurantType.upsert({
    where: { name: "Hamburgueria" },
    create: {
      id: new ObjectId().toHexString(),
      name: "Hamburgueria",
      description: "Hamburgueria",
      image: "https://i.imgur.com/8Q9QY7r.png",
    },
    update: {},
  });

  const tipoPizzaria = await prisma.restaurantType.upsert({
    where: { name: "Pizzaria" },
    create: {
      id: new ObjectId().toHexString(),
      name: "Pizzaria",
      description: "Pizzaria",
      image: "https://i.imgur.com/8Q9QY7r.png",
    },
    update: {},
  });

  const tipoChurrascaria = await prisma.restaurantType.upsert({
    where: { name: "Churrascaria" },
    create: {
      id: new ObjectId().toHexString(),
      name: "Churrascaria",
      description: "Churrascaria",
      image: "https://i.imgur.com/8Q9QY7r.png",
    },
    update: {},
  });

  await prisma.restaurant.upsert({
    where: { slug: "sushi-do-joao" },
    create: {
      id: new ObjectId().toHexString(),
      slug: "sushi-do-joao",
      name: "Sushi do João",
      description: "Sushi do João",
      image: "https://i.imgur.com/8Q9QY7r.png",
      location: "Avenida Paulista, 1000",
      typeIDs: { set: [tipoSushi.id] },
    },
    update: {},
  });

  await prisma.restaurant.upsert({
    where: { slug: "pizzaria-opcao" },
    create: {
      id: new ObjectId().toHexString(),
      slug: "pizzaria-opcao",
      name: "Pizzaria Opção",
      description: "Pizzaria Opção",
      image: "https://i.imgur.com/8Q9QY7r.png",
      location: "Avenida Paulista, 1000",
      typeIDs: { set: [tipoPizzaria.id, tipoChurrascaria.id] },
    },
    update: {},
  });

  await prisma.restaurant.upsert({
    where: { slug: "tudo-de-tudo" },
    create: {
      id: new ObjectId().toHexString(),
      slug: "tudo-de-tudo",
      name: "Tudo de Tudo",
      description: "Tudo de Tudo",
      image: "https://i.imgur.com/8Q9QY7r.png",
      location: "Avenida Paulista, 1000",
      typeIDs: { set: [tipoSushi.id, tipoPizzaria.id, tipoChurrascaria.id, tipoHamburgueria.id] },
    },
    update: {},
  });
}

main()
  .catch(console.error)
  .then(() => process.exit(0));
