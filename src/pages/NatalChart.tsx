import React from 'react';
import { useNatalChart } from '../hooks/useNatalChart';
import { PageContainer } from '../components/shared/PageContainer';
import { MoonPhaseSection } from '../components/chart/sections/MoonPhaseSection';
import { BirthDetailsSection } from '../components/chart/sections/BirthDetailsSection';
import { BigThreeSection } from '../components/chart/sections/BigThreeSection';
import { PlanetaryPositions } from '../components/chart/PlanetaryPositions';
import { HousePlacements } from '../components/chart/HousePlacements';
import { PlanetsInHouses } from '../components/chart/PlanetsInHouses';
import { AspectTable } from '../components/chart/AspectTable';
import { LoadingSpinner } from '../components/shared/LoadingSpinner';
import { ErrorMessage } from '../components/shared/ErrorMessage';

export default function NatalChart() {
  const { chartData, loading, error } = useNatalChart();

  if (loading) {
    return (
      <PageContainer>
        <div className="flex items-center justify-center min-h-[60vh]">
          <LoadingSpinner size="lg" />
        </div>
      </PageContainer>
    );
  }

  if (error) {
    return (
      <PageContainer>
        <ErrorMessage message={error} />
      </PageContainer>
    );
  }

  if (!chartData) {
    return (
      <PageContainer>
        <div className="text-center text-purple-200">
          No chart data available
        </div>
      </PageContainer>
    );
  }

  return (
    <PageContainer>
      <div className="space-y-8">
        {/* Birth Details & Moon Phase */}
        <div className="grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <BirthDetailsSection subject={chartData.data.subject} />
          </div>
          {chartData.data.subject.lunar_phase && (
            <div>
              <MoonPhaseSection phase={chartData.data.subject.lunar_phase} />
            </div>
          )}
        </div>

        {/* Big Three */}
        <BigThreeSection subject={chartData.data.subject} />

        {/* Chart Data */}
        <div className="grid lg:grid-cols-2 gap-8">
          <PlanetaryPositions planets={chartData.data.subject} />
          <HousePlacements houses={chartData.data.subject} />
        </div>

        {/* Detailed Analysis */}
        <PlanetsInHouses planets={chartData.data.subject} />
        <AspectTable aspects={chartData.aspects} />
      </div>
    </PageContainer>
  );
}