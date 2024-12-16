import { BaseSeeder } from './base.seeder';
import { houseSignInterpretations } from '../data/house-signs';

export class HouseSignsSeeder extends BaseSeeder {
  static async seed(): Promise<void> {
    await this.seedBatch('house_sign', houseSignInterpretations);
  }
}