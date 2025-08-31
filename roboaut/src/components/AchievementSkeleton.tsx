import React from 'react';

const AchievementSkeleton = () => {
  return (
    <div className="animate-pulse">
      <div className="relative glass backdrop-blur-lg rounded-2xl p-8 border border-white/10 overflow-hidden">
        {/* Background gradient skeleton */}
        <div className="absolute inset-0 bg-gradient-to-br from-gray-700/20 to-gray-800/20 rounded-2xl" />
        
        {/* Content skeleton */}
        <div className="relative z-10">
          {/* Title and Year skeleton */}
          <div className="flex items-center justify-between mb-4">
            <div className="w-3/4 h-8 bg-gray-700/50 rounded-lg" />
            <div className="w-16 h-8 bg-gray-700/50 rounded-full" />
          </div>

          {/* Images skeleton */}
          <div className="flex gap-3 mb-4 overflow-x-auto">
            {Array.from({ length: 3 }).map((_, index) => (
              <div
                key={index}
                className="w-28 h-20 bg-gray-700/50 rounded-lg flex-shrink-0"
              />
            ))}
          </div>

          {/* Description skeleton */}
          <div className="space-y-3 mb-6">
            <div className="w-full h-4 bg-gray-700/50 rounded" />
            <div className="w-full h-4 bg-gray-700/50 rounded" />
            <div className="w-full h-4 bg-gray-700/50 rounded" />
            <div className="w-3/4 h-4 bg-gray-700/50 rounded" />
            <div className="w-5/6 h-4 bg-gray-700/50 rounded" />
          </div>

          {/* Decorative line skeleton */}
          <div className="w-full h-1 bg-gray-700/50 rounded-full" />

          {/* Action buttons skeleton */}
          <div className="flex flex-wrap gap-3 mt-4">
            <div className="w-24 h-8 bg-gray-700/50 rounded-lg" />
            <div className="w-28 h-8 bg-gray-700/50 rounded-lg" />
          </div>
        </div>

        {/* Shimmer effect */}
        <div className="absolute inset-0 shimmer opacity-20" />
      </div>
    </div>
  );
};

const AchievementsGridSkeleton = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
      {Array.from({ length: 4 }).map((_, index) => (
        <div
          key={index}
          className="animate-fade-in"
          style={{ animationDelay: `${index * 100}ms` }}
        >
          <AchievementSkeleton />
        </div>
      ))}
    </div>
  );
};

export { AchievementSkeleton, AchievementsGridSkeleton };
