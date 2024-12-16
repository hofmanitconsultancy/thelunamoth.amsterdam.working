import { PlanetSignsSeeder } from './seeders/planet-signs.seeder';
import { HouseSignsSeeder } from './seeders/house-signs.seeder';
import { PlanetHousesSeeder } from './seeders/planet-houses.seeder';

async function seed() {
  try {
    console.log('Starting seeding process...');

    await Promise.all([
      PlanetSignsSeeder.seed(),
      HouseSignsSeeder.seed(),
      PlanetHousesSeeder.seed()
    ]);

    console.log('Seeding completed successfully!');
    process.exit(0);
  } catch (err) {
    console.error('Seeding failed:', err);
    process.exit(1);
  }
}

seed();