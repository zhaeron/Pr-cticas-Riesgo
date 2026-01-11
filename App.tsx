import React, { useState, useEffect, useCallback } from 'react';
import { MMISelector } from './components/MMISelector';
import { ReportDetails } from './components/ReportDetails';
import { LocationIndicator } from './components/LocationIndicator';
import type { SeismicReport, LocationData } from './types';
import { getMMIScale } from './constants';
import { Header } from './components/Header';
import { SubmitButton } from './components/SubmitButton';
import { useTranslations } from './hooks/useTranslations';
import { ExportControls } from './components/ExportControls';

const App: React.FC = () => {
  const { t } = useTranslations();
  const [location, setLocation] = useState<LocationData>({ status: 'pending', coords: null });
  const [selectedIntensity, setSelectedIntensity] = useState<number | null>(null);
  const [reportText, setReportText] = useState('');
  const [images, setImages] = useState<(File | null)[]>([null, null]);
  const [submittedReports, setSubmittedReports] = useState<SeismicReport[]>([]);

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        setLocation({
          status: 'success',
          coords: {
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
          },
        });
      },
      (error) => {
        console.error("Geolocation error:", error);
        setLocation({ status: 'error', coords: null });
      },
      { enableHighAccuracy: true, timeout: 10000, maximumAge: 0 }
    );
  }, []);

  const handleImageChange = useCallback((index: number, file: File | null) => {
    setImages(prevImages => {
      const newImages = [...prevImages];
      newImages[index] = file;
      return newImages;
    });
  }, []);
  
  const resetForm = () => {
      setSelectedIntensity(null);
      setReportText('');
      setImages([null, null]);
  };

  const handleSubmit = () => {
    if (selectedIntensity === null || location.status !== 'success' || !location.coords) {
      alert(t('alertSubmit'));
      return;
    }

    const newReport: SeismicReport = {
      ID_Registro: `reg_${Date.now()}`,
      Fecha_Hora: new Date().toISOString().replace('T', ' ').replace(/\.\d+Z$/, 'Z'),
      Latitud: location.coords.latitude,
      Longitud: location.coords.longitude,
      Intensidad_MMI: selectedIntensity,
      Texto_Reporte: reportText,
      URL_Imagen_1: images[0] ? `imagen_${images[0].name}` : '',
      URL_Imagen_2: images[1] ? `imagen_${images[1].name}` : '',
      ID_Usuario: `user_${Math.floor(Math.random() * 1000)}`,
    };

    setSubmittedReports(prevReports => [newReport, ...prevReports]);
    resetForm();
  };
  
  const isSubmitDisabled = selectedIntensity === null || location.status !== 'success';
  const MMI_SCALE = getMMIScale(t);

  return (
    <div className="min-h-screen text-gray-800 font-sans flex flex-col items-center p-4 sm:p-6 md:p-8">
      <div className="w-full max-w-4xl mx-auto">
        <Header />
        <main className="mt-8 space-y-12">
          <div className="bg-white/70 backdrop-blur-lg rounded-xl p-6 shadow-lg border border-gray-200">
            <h2 className="text-2xl font-bold text-sky-600 mb-2">{t('locationTitle')}</h2>
            <p className="text-gray-600 mb-4">{t('locationSubtitle')}</p>
            <LocationIndicator status={location.status} coords={location.coords} />
          </div>

          <div className="bg-white/70 backdrop-blur-lg rounded-xl p-6 shadow-lg border border-gray-200">
            <h2 className="text-2xl font-bold text-sky-600 mb-2">{t('intensityTitle')}</h2>
             <p className="text-gray-600 mb-4">{t('intensitySubtitle')}</p>
            <MMISelector
              scale={MMI_SCALE}
              selectedIntensity={selectedIntensity}
              onSelectIntensity={setSelectedIntensity}
            />
          </div>

          <div className="bg-white/70 backdrop-blur-lg rounded-xl p-6 shadow-lg border border-gray-200">
            <h2 className="text-2xl font-bold text-sky-600 mb-2">{t('detailsTitle')}</h2>
             <p className="text-gray-600 mb-4">{t('detailsSubtitle')}</p>
            <ReportDetails
              reportText={reportText}
              onTextChange={setReportText}
              images={images}
              onImageChange={handleImageChange}
            />
          </div>

          <SubmitButton onClick={handleSubmit} disabled={isSubmitDisabled} />

          {submittedReports.length > 0 && (
            <div className="bg-white/70 backdrop-blur-lg rounded-xl p-6 shadow-lg border border-gray-200 mt-12">
               <ExportControls reports={submittedReports} />
            </div>
          )}
        </main>
      </div>
    </div>
  );
};

export default App;