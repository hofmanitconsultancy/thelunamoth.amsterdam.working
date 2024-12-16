import { doc, getDoc, setDoc } from 'firebase/firestore';
import { db } from '../../config/firebase';
import type { NatalChart } from '../../types/natal-chart';

export class NatalChartStorageService {
  private static readonly COLLECTION = 'natal_charts';

  static async saveChart(userId: string, chart: NatalChart): Promise<void> {
    const chartRef = doc(db, this.COLLECTION, userId);
    await setDoc(chartRef, {
      ...chart,
      createdAt: chart.createdAt.toISOString()
    });
  }

  static async getChart(userId: string): Promise<NatalChart | null> {
    const chartRef = doc(db, this.COLLECTION, userId);
    const snapshot = await getDoc(chartRef);
    
    if (!snapshot.exists()) {
      return null;
    }

    const data = snapshot.data();
    return {
      ...data,
      createdAt: new Date(data.createdAt)
    } as NatalChart;
  }
}