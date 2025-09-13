import { FC } from 'react';

const ProjectSkeleton: FC = () => {
  return (
    <div className="bg-gray-900 rounded-lg overflow-hidden animate-pulse flex flex-col">
      {/* Image placeholder */}
      <div className="h-52 bg-gray-800"></div>
      
      <div className="p-5 flex flex-col flex-grow">
        {/* Title placeholder */}
        <div className="h-6 bg-gray-800 rounded w-3/4 mb-2"></div>
        
        {/* Description placeholder - multiple lines */}
        <div className="h-4 bg-gray-800 rounded w-full mb-2"></div>
        <div className="h-4 bg-gray-800 rounded w-full mb-2"></div>
        <div className="h-4 bg-gray-800 rounded w-5/6 mb-4"></div>
        
        {/* Tech stack placeholder */}
        <div className="mb-4">
          <div className="h-4 bg-gray-800 rounded w-1/4 mb-2"></div>
          <div className="flex flex-wrap gap-2">
            <div className="h-6 bg-gray-800 rounded w-16"></div>
            <div className="h-6 bg-gray-800 rounded w-20"></div>
            <div className="h-6 bg-gray-800 rounded w-24"></div>
          </div>
        </div>
        
        {/* Buttons placeholder */}
        <div className="flex gap-3 mt-auto">
          <div className="h-8 bg-gray-800 rounded w-20"></div>
          <div className="h-8 bg-gray-800 rounded w-24"></div>
        </div>
      </div>
    </div>
  );
};

export default ProjectSkeleton;