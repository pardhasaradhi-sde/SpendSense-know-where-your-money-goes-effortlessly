import React from 'react';

export const Loader = ({ size = "default" }) => {
  const sizeClasses = {
    small: "w-6 h-6 border-2",
    default: "w-12 h-12 border-4",
    large: "w-16 h-16 border-4"
  };

  return (
    <div className={`${sizeClasses[size]} border-primary border-t-transparent rounded-full animate-spin`}></div>
  );
};

export const SkeletonCard = () => (
  <div className="rounded-xl border bg-card shadow p-6 space-y-4 animate-pulse">
    <div className="h-4 bg-muted rounded w-1/4"></div>
    <div className="h-8 bg-muted rounded w-1/2"></div>
    <div className="h-4 bg-muted rounded w-3/4"></div>
  </div>
);

export const SkeletonTable = () => (
  <div className="rounded-xl border bg-card shadow p-6 space-y-3 animate-pulse">
    <div className="h-10 bg-muted rounded"></div>
    {[...Array(5)].map((_, i) => (
      <div key={i} className="h-12 bg-muted rounded"></div>
    ))}
  </div>
);
