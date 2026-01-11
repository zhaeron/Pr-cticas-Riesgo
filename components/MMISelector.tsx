import React from 'react';
import type { MMIScaleItem } from '../types';

interface MMISelectorProps {
  scale: MMIScaleItem[];
  selectedIntensity: number | null;
  onSelectIntensity: (intensity: number) => void;
}

export const MMISelector: React.FC<MMISelectorProps> = ({ scale, selectedIntensity, onSelectIntensity }) => {
  const getButtonStyles = (value: number) => {
    // Hue ranges from 120 (green) to 0 (red)
    const hue = 120 - (value - 1) * 11;
    const style = {
      backgroundColor: `hsl(${hue}, 100%, 94%)`,
      borderColor: `hsl(${hue}, 60%, 85%)`,
      color: `hsl(${hue}, 80%, 25%)`,
    };
    return style;
  };

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3 sm:gap-4">
      {scale.map((item) => (
        <button
          key={item.value}
          onClick={() => onSelectIntensity(item.value)}
          style={getButtonStyles(item.value)}
          className={`p-4 rounded-lg text-left transition-all duration-200 ease-in-out transform hover:-translate-y-1 focus:outline-none border-2 ${
            selectedIntensity === item.value
              ? 'ring-2 ring-offset-2 ring-sky-500 shadow-md'
              : ''
          }`}
        >
          <div className="flex items-baseline mb-1">
            <span className="text-2xl font-bold">{item.roman}</span>
            <span className="ml-2 text-sm font-semibold tracking-wider uppercase">{item.name}</span>
          </div>
          <p className="text-xs opacity-80">
            {item.description}
          </p>
        </button>
      ))}
    </div>
  );
};