import React from 'react';

export const Shimmer: React.FC<{ className?: string }> = ({ className = '' }) => {
  return (
    <div className={`bg-zinc-200 dark:bg-zinc-800 shimmer-wave-effect ${className}`} />
  );
};
