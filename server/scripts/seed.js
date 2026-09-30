// Load the starter grocery catalog into MongoDB.
//
//   npm run seed          add/update catalog products (keeps everything else)
//   npm run seed:reset    delete ALL products first, then load the catalog
//   node scripts/seed.js --drop --yes   wipe the whole database (users, orders...) then load
//
// Products are matched by name + unit, so re-running updates prices instead of duplicating.
// Reads MONGODB_URI from server/.env or the repo-root .env.
import path from "path";
import { fileURLToPath } from "url";
import dotenv from "dotenv";
import mongoose from "mongoose";
import connectDB from "../configs/db.js";
import Product from "../models/product.js";
import User from "../models/user.js";
import { CATEGORIES, PRODUCTS } from "../data/catalog.js";

const here = path.dirname(fileURLToPath(import.meta.url));
dotenv.config({ path: path.join(here, "../.env"), quiet: true });
dotenv.config({ path: path.join(here, "../../.env"), quiet: true });

const args = new Set(process.argv.slice(2));
const reset = args.has("--reset");
const drop = args.has("--drop");

const validate = () => {
  const keys = new Set();
  for (const p of PRODUCTS) {
    if (!CATEGORIES.includes(p.category)) throw new Error(`${p.name}: unknown category ${p.category}`);
    if (!(p.offerPrice > 0 && p.offerPrice <= p.price)) throw new Error(`${p.name}: offerPrice must be > 0 and <= price`);
    // The same product can come in several sizes, so name + unit identifies it
    const key = `${p.name} | ${p.unit}`;
    if (keys.has(key)) throw new Error(`Duplicate product: ${key}`);
    keys.add(key);
  }
};

const run = async () => {
  validate();

  if (drop && !args.has("--yes")) {
    throw new Error("--drop deletes users, orders and addresses too. Re-run with --drop --yes to confirm.");
  }

  await connectDB();
  const { host, name } = mongoose.connection;
  console.log(`Seeding database "${name}" on ${host}`);

  if (drop) {
    await mongoose.connection.dropDatabase();
    console.log("Dropped the whole database");
  } else if (reset) {
    const { deletedCount } = await Product.deleteMany({});
    // Saved carts point at the deleted product ids, so empty them too
    await User.updateMany({}, { $set: { cartItems: {} } });
    console.log(`Deleted ${deletedCount} existing products and cleared saved carts`);
  }

  // Small batches: some Mongo-compatible servers stall on large upsert batches
  let added = 0;
  let updated = 0;
  for (let i = 0; i < PRODUCTS.length; i += 25) {
    const result = await Product.bulkWrite(
      PRODUCTS.slice(i, i + 25).map((product) => ({
        updateOne: {
          filter: { name: product.name, unit: product.unit },
          update: { $set: product },
          upsert: true,
        },
      }))
    );
    added += result.upsertedCount;
    updated += result.modifiedCount;
  }

  const total = await Product.countDocuments();
  console.log(`Catalog loaded: ${added} added, ${updated} updated. ${total} products in the store.`);
};

run()
  .catch((err) => {
    console.error("Seed failed:", err.message);
    process.exitCode = 1;
  })
  .finally(() => mongoose.disconnect());
