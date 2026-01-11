import React from 'react';
import type { SeismicReport } from '../types';
import { useTranslations } from '../hooks/useTranslations';

interface ExportControlsProps {
  reports: SeismicReport[];
}

const downloadFile = (filename: string, content: string, mimeType: string) => {
  const blob = new Blob([content], { type: mimeType });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
};

const formatToCSV = (reports: SeismicReport[]): string => {
    const header = 'ID_Registro,Fecha_Hora,Latitud,Longitud,Intensidad_MMI,Texto_Reporte,URL_Imagen_1,URL_Imagen_2,ID_Usuario';
    const rows = reports.map(report => {
        const escapeCSV = (field: string | number) => `"${String(field).replace(/"/g, '""')}"`;
        return [
            report.ID_Registro,
            report.Fecha_Hora,
            report.Latitud,
            report.Longitud,
            report.Intensidad_MMI,
            escapeCSV(report.Texto_Reporte),
            report.URL_Imagen_1,
            report.URL_Imagen_2,
            report.ID_Usuario,
        ].join(',');
    });
    return [header, ...rows].join('\n');
};

const formatToKML = (reports: SeismicReport[]): string => {
    const placemarks = reports.map(report => `
      <Placemark>
        <name>MMI: ${report.Intensidad_MMI}</name>
        <description>
          <![CDATA[
            <b>Date:</b> ${report.Fecha_Hora}<br/>
            <b>Report:</b> ${report.Texto_Reporte || 'N/A'}<br/>
            <b>User ID:</b> ${report.ID_Usuario}
          ]]>
        </description>
        <Point>
          <coordinates>${report.Longitud},${report.Latitud},0</coordinates>
        </Point>
      </Placemark>
    `).join('');

    return `<?xml version="1.0" encoding="UTF-8"?>
<kml xmlns="http://www.opengis.net/kml/2.2">
  <Document>
    <name>Seismic Reports</name>
    ${placemarks}
  </Document>
</kml>`;
};


export const ExportControls: React.FC<ExportControlsProps> = ({ reports }) => {
    const { t } = useTranslations();

    const handleDownloadCSV = () => {
        const csvData = formatToCSV(reports);
        downloadFile('seismic_reports.csv', csvData, 'text/csv;charset=utf-8;');
    };
    
    const handleDownloadKML = () => {
        const kmlData = formatToKML(reports);
        downloadFile('seismic_reports.kml', kmlData, 'application/vnd.google-earth.kml+xml');
    };

    return (
        <div className="space-y-4">
            <div>
                <h2 className="text-2xl font-bold text-sky-600 mb-2">{t('exportTitle')}</h2>
                <p className="text-gray-600">{t('exportSubtitle')}</p>
            </div>
            <div className="flex flex-col sm:flex-row sm:space-x-4 space-y-3 sm:space-y-0">
                <button onClick={handleDownloadCSV} className="w-full sm:w-auto flex-1 text-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-sky-600 hover:bg-sky-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-sky-500 transition">
                    {t('downloadCSV')}
                </button>
                <button onClick={handleDownloadKML} className="w-full sm:w-auto flex-1 text-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-sky-600 hover:bg-sky-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-sky-500 transition">
                    {t('downloadKML')}
                </button>
                <div className="relative w-full sm:w-auto flex-1" title={t('shpTooltip')}>
                    <button disabled className="w-full text-center px-6 py-3 border border-gray-300 text-base font-medium rounded-md text-gray-400 bg-gray-200 cursor-not-allowed">
                        {t('downloadSHP')}
                    </button>
                </div>
            </div>
        </div>
    );
};
