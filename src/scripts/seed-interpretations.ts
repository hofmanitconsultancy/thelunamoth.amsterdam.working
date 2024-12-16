import { InterpretationSeederService } from '../services/interpretations/seeder.service';

async function main() {
  try {
    await InterpretationSeederService.seedAll();
    console.log('Successfully seeded all interpretations');
  } catch (err) {
    console.error('Error seeding interpretations:', err);
    process.exit(1);
  }
}

main();