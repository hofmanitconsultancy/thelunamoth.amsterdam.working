import { BaseSeeder } from './base.seeder';
import { planetSignInterpretations } from '../data/planet-signs';

export class PlanetSignsSeeder extends BaseSeeder {
  static async seed(): Promise<void> {
    await this.seedBatch('planet_sign', planetSignInterpretations);
  }
}