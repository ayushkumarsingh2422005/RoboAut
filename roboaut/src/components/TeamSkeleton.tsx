import React from 'react';

export const TeamMemberSkeleton = () => (
  <div className="group relative animate-pulse">
    <div className="relative glass backdrop-blur-lg rounded-2xl border border-white/10 overflow-hidden">
      {/* Background Gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-gray-800 to-gray-900 opacity-10" />
      
      {/* Member Photo Skeleton */}
      <div className="relative h-64 bg-gradient-to-br from-gray-800 to-gray-900">
        <div className="absolute inset-0 bg-gradient-to-br from-gray-700 to-gray-800 opacity-30" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.1),transparent_70%)]" />
        <div className="relative z-10 h-full flex items-center justify-center">
          <div className="w-32 h-32 bg-gray-600 rounded-full animate-pulse" />
        </div>
      </div>

      {/* Member Info Skeleton */}
      <div className="p-6">
        <div className="h-6 bg-gray-600 rounded mb-2 animate-pulse" />
        <div className="h-5 bg-gray-600 rounded mb-3 w-3/4 animate-pulse" />
        <div className="h-4 bg-gray-600 rounded mb-3 w-1/2 animate-pulse" />
        <div className="h-4 bg-gray-600 rounded w-2/3 animate-pulse" />
      </div>
    </div>
  </div>
);

export const TeamGridSkeleton = () => (
  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
    {Array.from({ length: 6 }).map((_, index) => (
      <TeamMemberSkeleton key={index} />
    ))}
  </div>
);

export const DepartmentSkeleton = () => (
  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
    {Array.from({ length: 4 }).map((_, index) => (
      <div key={index} className="glass backdrop-blur-lg rounded-2xl p-6 border border-white/10 animate-pulse">
        <div className="text-center">
          <div className="w-16 h-16 bg-gray-600 rounded-full mx-auto mb-4 animate-pulse" />
          <div className="h-5 bg-gray-600 rounded mb-2 animate-pulse" />
          <div className="h-8 bg-gray-600 rounded mb-2 w-16 mx-auto animate-pulse" />
          <div className="h-4 bg-gray-600 rounded animate-pulse" />
        </div>
      </div>
    ))}
  </div>
);
