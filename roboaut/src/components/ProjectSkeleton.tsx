import React from 'react';

const ProjectSkeleton = () => {
  return (
    <div className="animate-pulse">
      <div className="relative h-[420px] bg-gray-800/30 backdrop-blur-xl rounded-3xl border border-white/20 overflow-hidden">
        {/* Image skeleton */}
        <div className="absolute inset-0 bg-gradient-to-br from-gray-700/50 to-gray-800/50" />
        
        {/* Content skeleton */}
        <div className="relative z-10 p-8 h-full flex flex-col">
          {/* Status badge skeleton */}
          <div className="flex justify-between items-start mb-6">
            <div className="w-24 h-8 bg-gray-700/50 rounded-full" />
            <div className="w-8 h-8 bg-gray-700/50 rounded-full" />
          </div>

          {/* Title skeleton */}
          <div className="w-3/4 h-8 bg-gray-700/50 rounded-lg mb-4" />

          {/* Description skeleton */}
          <div className="space-y-3 flex-grow">
            <div className="w-full h-4 bg-gray-700/50 rounded" />
            <div className="w-5/6 h-4 bg-gray-700/50 rounded" />
            <div className="w-4/5 h-4 bg-gray-700/50 rounded" />
            <div className="w-3/4 h-4 bg-gray-700/50 rounded" />
          </div>

          {/* Button skeleton */}
          <div className="w-full h-12 bg-gray-700/50 rounded-xl" />
        </div>

        {/* Shimmer effect */}
        <div className="absolute inset-0 shimmer opacity-20" />
      </div>
    </div>
  );
};

const ProjectsGridSkeleton = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
      {Array.from({ length: 6 }).map((_, index) => (
        <div
          key={index}
          className="animate-fade-in"
          style={{ animationDelay: `${index * 100}ms` }}
        >
          <ProjectSkeleton />
        </div>
      ))}
    </div>
  );
};

export { ProjectSkeleton, ProjectsGridSkeleton };
