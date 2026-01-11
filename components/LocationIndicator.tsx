import React from 'react';
import type { LocationData } from '../types';
import { useTranslations } from '../hooks/useTranslations';

interface LocationIndicatorProps {
  status: LocationData['status'];
  coords: LocationData['coords'];
}

const LocationIcon: React.FC = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-3 text-sky-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
    <path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
  </svg>
);

const LoadingSpinner: React.FC = () => (
  <svg className="animate-spin h-6 w-6 mr-3 text-gray-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
  </svg>
);

const ErrorIcon: React.FC = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-3 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
);

export const LocationIndicator: React.FC<LocationIndicatorProps> = ({ status, coords }) => {
  const { t } = useTranslations();
  const renderContent = () => {
    switch (status) {
      case 'pending':
        return (
          <>
            <LoadingSpinner />
            <span className="text-gray-600">{t('locationAcquiring')}</span>
          </>
        );
      case 'success':
        return (
          <>
            <LocationIcon />
            <div>
              <span className="font-semibold text-gray-800">{t('locationSuccess')}</span>
              <p className="text-sm text-gray-600 font-mono">
                Lat: {coords?.latitude.toFixed(6)}, Lon: {coords?.longitude.toFixed(6)}
              </p>
            </div>
          </>
        );
      case 'error':
        return (
          <>
            <ErrorIcon />
            <span className="text-red-600">{t('locationError')}</span>
          </>
        );
      default:
        return null;
    }
  };

  return (
    <div className="bg-gray-100/70 p-4 rounded-lg flex items-center border border-gray-200">
      {renderContent()}
    </div>
  );
};