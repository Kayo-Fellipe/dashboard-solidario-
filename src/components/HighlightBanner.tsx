import React from 'react';

interface HighlightBannerProps {
  message: string;
}

const HighlightBanner: React.FC<HighlightBannerProps> = ({ message }) => {
  return (
    <div className="bg-gradient-to-r from-blue-500 to-blue-600 rounded-xl p-4 text-white text-center font-medium shadow-sm mb-8">
      {message}
    </div>
  );
};

export default HighlightBanner;