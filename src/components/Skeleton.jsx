import React from 'react';

function Skeleton({ width = '100%', height = '1.5rem', className = '' }) {
  return (
    <div
      className={`animate-pulse bg-gray-200 rounded ${className}`}
      style={{ width, height }}
      aria-busy='true'
      aria-label='Loading...'
      role='status'
    />
  );
}

export default Skeleton;
