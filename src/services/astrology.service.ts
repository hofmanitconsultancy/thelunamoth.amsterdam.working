import { AstrologyApi } from './api/astrology.api';
import { AstrologyValidationService } from './astrology/validation.service';
import { AstrologyFormatterService } from './astrology/formatter.service';
import { AstrologyStorageService } from './astrology/storage.service';
import { handleError, logError } from '../utils/error-handler';
import { ValidationError } from '../types/errors';
import type { AstrologyChart } from '../types/astrology';

export class AstrologyService {
  static async saveChart(userId: string, chartData: any): Promise<void> {
    try {
      // Validate input data
      const validation = AstrologyValidationService.validateChartData(chartData);
      if (!validation.isValid) {
        throw new ValidationError(validation.error || 'Invalid chart data');
      }

      // Create chart object
      const chart: AstrologyChart = {
        userId,
        subject: chartData.data.subject,
        aspects: chartData.aspects || [],
        createdAt: new Date()
      };

      // Save chart to storage
      await AstrologyStorageService.saveChart(userId, chart);

      // Update aspects asynchronously
      this.updateChartAspects(userId).catch(err => {
        logError(err, 'UpdateChartAspects');
      });
    } catch (err) {
      logError(err, 'SaveChart');
      throw handleError(err);
    }
  }

  static async getChart(userId: string): Promise<AstrologyChart | null> {
    try {
      return await AstrologyStorageService.getChart(userId);
    } catch (err) {
      logError(err, 'GetChart');
      throw handleError(err);
    }
  }

  private static async updateChartAspects(userId: string): Promise<void> {
    try {
      const chart = await this.getChart(userId);
      if (!chart) {
        throw new ValidationError('Chart not found');
      }

      const subject = AstrologyFormatterService.formatSubjectForApi(chart);
      const aspectsData = await AstrologyApi.getNatalAspects(subject);

      await AstrologyStorageService.updateChartAspects(userId, aspectsData.aspects);
    } catch (err) {
      logError(err, 'UpdateChartAspects');
      throw handleError(err);
    }
  }
}