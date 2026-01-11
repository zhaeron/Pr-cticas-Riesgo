import React, { useState, useEffect } from 'react';
import { useTranslations } from '../hooks/useTranslations';

interface ReportDetailsProps {
  reportText: string;
  onTextChange: (text: string) => void;
  images: (File | null)[];
  onImageChange: (index: number, file: File | null) => void;
}

const CameraIcon: React.FC = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
    </svg>
);

const ImagePreview: React.FC<{ file: File; onRemove: () => void }> = ({ file, onRemove }) => {
  const [preview, setPreview] = useState<string | null>(null);

  useEffect(() => {
    if (!file) return;
    const objectUrl = URL.createObjectURL(file);
    setPreview(objectUrl);
    return () => URL.revokeObjectURL(objectUrl);
  }, [file]);

  if (!preview) return null;

  return (
    <div className="relative group w-full h-32">
      <img src={preview} alt="Preview" className="w-full h-full object-cover rounded-md" />
      <button
        onClick={onRemove}
        className="absolute top-1 right-1 bg-black/70 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity"
        aria-label="Remove image"
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
        </svg>
      </button>
    </div>
  );
};

const ImageUploader: React.FC<{ file: File | null; onChange: (file: File | null) => void }> = ({ file, onChange }) => {
  const { t } = useTranslations();
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange(e.target.files ? e.target.files[0] : null);
  };
  
  const handleRemove = () => {
    onChange(null);
  };

  if (file) {
    return <ImagePreview file={file} onRemove={handleRemove} />;
  }

  return (
    <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-100/50 hover:bg-gray-200/50 transition-colors">
      <div className="flex flex-col items-center justify-center pt-5 pb-6">
        <CameraIcon />
        <p className="mb-2 text-sm text-gray-500"><span className="font-semibold">{t('uploadButton')}</span></p>
      </div>
      <input type="file" className="hidden" accept="image/*" onChange={handleFileChange} />
    </label>
  );
};

export const ReportDetails: React.FC<ReportDetailsProps> = ({ reportText, onTextChange, images, onImageChange }) => {
  const { t } = useTranslations();
  return (
    <div className="space-y-6">
      <div>
        <label htmlFor="reportText" className="block text-sm font-medium text-gray-700 mb-2">
          {t('textReportLabel')}
        </label>
        <textarea
          id="reportText"
          rows={4}
          className="w-full bg-white/80 border-gray-300 rounded-md p-3 text-gray-800 focus:ring-sky-500 focus:border-sky-500 transition shadow-inner"
          placeholder={t('textReportPlaceholder')}
          value={reportText}
          onChange={(e) => onTextChange(e.target.value)}
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          {t('imagesLabel')}
        </label>
        <div className="grid grid-cols-2 gap-4">
          <ImageUploader file={images[0]} onChange={(file) => onImageChange(0, file)} />
          <ImageUploader file={images[1]} onChange={(file) => onImageChange(1, file)} />
        </div>
      </div>
    </div>
  );
};