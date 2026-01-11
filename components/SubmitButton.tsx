import React from 'react';
import { useTranslations } from '../hooks/useTranslations';

interface SubmitButtonProps {
    onClick: () => void;
    disabled: boolean;
}

export const SubmitButton: React.FC<SubmitButtonProps> = ({ onClick, disabled }) => {
    const { t } = useTranslations();
    return (
        <div className="flex justify-end mt-8">
            <button
                onClick={onClick}
                disabled={disabled}
                className="w-full sm:w-auto inline-flex items-center justify-center px-8 py-4 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-gradient-to-r from-sky-500 to-indigo-600 hover:from-sky-600 hover:to-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-white focus:ring-sky-500 transition-all duration-300 transform hover:scale-105"
            >
                {t('submitButton')}
            </button>
        </div>
    );
}