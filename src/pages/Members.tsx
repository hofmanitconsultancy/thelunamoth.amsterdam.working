import React, { useState, useEffect } from 'react';
import { ProtectedRoute } from '../routes/ProtectedRoute';
import { AstrologicalCharts } from '../components/dashboard/AstrologicalCharts';
import { BirthDataSection } from '../components/members/BirthDataSection';
import { PersonalInfoSection } from '../components/members/PersonalInfoSection';
import { BirthDataModal } from '../components/auth/BirthDataModal';
import { EditBirthDataModal } from '../components/auth/EditBirthDataModal';
import { PersonalInfoModal } from '../components/auth/PersonalInfoModal';
import { useBirthData } from '../hooks/useBirthData';
import { useProfile } from '../hooks/useProfile';
import { useAuthContext } from '../context/AuthContext';
import { PageContainer } from '../components/shared/PageContainer';

export default function Members() {
  const [showBirthDataModal, setShowBirthDataModal] = useState(false);
  const [showEditBirthDataModal, setShowEditBirthDataModal] = useState(false);
  const [showPersonalInfoModal, setShowPersonalInfoModal] = useState(false);
  const { 
    birthData, 
    loading: birthDataLoading, 
    dataFetched,
    isBirthDataComplete,
    refresh: refreshBirthData 
  } = useBirthData();
  const { profile, loading: profileLoading, refresh: refreshProfile } = useProfile();
  const { user } = useAuthContext();

  useEffect(() => {
    if (!birthDataLoading && dataFetched && !isBirthDataComplete()) {
      setShowBirthDataModal(true);
    } else {
      setShowBirthDataModal(false);
    }
  }, [birthData, birthDataLoading, dataFetched, isBirthDataComplete]);

  const handleModalComplete = async () => {
    try {
      await Promise.all([
        refreshBirthData(),
        refreshProfile()
      ]);
    } finally {
      setShowBirthDataModal(false);
      setShowEditBirthDataModal(false);
      setShowPersonalInfoModal(false);
    }
  };

  const handleEditPersonalInfo = () => {
    if (profile) {
      setShowPersonalInfoModal(true);
    }
  };

  const handleEditBirthData = () => {
    if (birthData) {
      setShowEditBirthDataModal(true);
    }
  };

  const isLoading = birthDataLoading || profileLoading;

  return (
    <ProtectedRoute>
      <PageContainer>
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-4xl font-serif text-white">
            Welcome, {profile?.displayName || user?.displayName || 'Stargazer'}
          </h1>
        </div>
        
        <div className="grid gap-8">
          <PersonalInfoSection onEdit={handleEditPersonalInfo} />
          <BirthDataSection onEdit={handleEditBirthData} />
          
          {!isLoading && isBirthDataComplete() && (
            <div>
              <h2 className="text-2xl font-serif text-white mb-6">Your Astrological Journey</h2>
              <AstrologicalCharts />
            </div>
          )}
        </div>

        {showBirthDataModal && (
          <BirthDataModal onComplete={handleModalComplete} />
        )}

        {showEditBirthDataModal && (
          <EditBirthDataModal onComplete={handleModalComplete} />
        )}

        {showPersonalInfoModal && (
          <PersonalInfoModal 
            onComplete={handleModalComplete}
            initialData={{ displayName: profile?.displayName || '' }}
          />
        )}
      </PageContainer>
    </ProtectedRoute>
  );
}