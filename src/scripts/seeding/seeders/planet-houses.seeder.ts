import { BaseSeeder } from './base.seeder';
import { planetHouseInterpretations } from '../data/planet-houses';

export class PlanetHousesSeeder extends BaseSeeder {
  static async seed(): Promise<void> {
    await this.seedBatch('planet_house', planetHouseInterpretations);
  }
}