import UsersSeed from "./users/users.seed";

export default async function main() {
   console.log("⏳ Seeding users...");
   try {
      await UsersSeed();
      console.log("✅ Users seeded successfully");
      process.exit(0);
   } catch (error) {
      console.error("❌ Error while seeding");
      process.exit(1);
   }
}

main();
