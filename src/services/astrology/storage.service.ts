import { doc, getDoc, setDoc, updateDoc } from 'firebase/firestore';
import { db } from '../../config/firebase';
import type { AstrologyChart } from '../../types/astrology';

export class AstrologyStorageService {
  private static readonly COLLECTION = 'natal_charts';

  static async saveChart(userId: string, chart: AstrologyChart): Promise<void> {
    const chartRef = doc(db, this.COLLECTION, userId);
    await setDoc(chartRef, {
      ...chart,
      createdAt: chart.createdAt.toISOString()
    });
  }

  static async getChart(userId: string): Promise<AstrologyChart | null> {
    const chartRef = doc(db, this.COLLECTION, userId);
    const snapshot = await getDoc(chartRef);
    
    if (!snapshot.exists()) {
      return null;
    }

    const data = snapshot.data();
    return {
      ...data,
      createdAt: new Date(data.createdAt)
    } as AstrologyChart;
  }

  static async updateChartAspects(userId: string, aspects: any[]): Promise<void> {
    const chartRef = doc(db, this.COLLECTION, userId);
    await updateDoc(chartRef, { aspects });
  }
}