import { Prisma, PrismaClient } from "@prisma/client";
import express from "express";
import cors from "cors";
import morgan from "morgan";

const prisma = new PrismaClient();

const app = express();
app.use(cors());
app.use(morgan("dev"));

app.get("/restaurant/types", async (_, res) => {
  const restaurantTypes = await prisma.restaurantType.findMany();

  return res.json(restaurantTypes);
});

app.get("/restaurants", async ({ query }, res) => {
  const { types } = query;

  const args: Prisma.RestaurantFindManyArgs = {};

  if (types) {
    const typesIds = String(types).split(",");

    args.where = { ...args.where, typeIDs: { hasEvery: typesIds } };
  }

  const restaurants = await prisma.restaurant.findMany(args);

  return res.json(restaurants);
});

app.listen(4000);
