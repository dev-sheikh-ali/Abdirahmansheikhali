import { useState, useEffect } from 'react';
import { useCommunityImpactData } from '../../../hooks/home/useCommunityImpactData';
import { CommunityImpactCard } from './CommunityImpactCard';

// Add CSS animations to the component
const animationStyles = `
  @keyframes fadeIn {
    from { opacity: 0; transform: translateY(20px); }
    to { opacity: 1; transform: translateY(0); }
  }
  .fade-in-item {
    animation: fadeIn 0.5s ease-out forwards;
  }
`;

export default function CommunityImpact() {
  // Add animation styles
  useEffect(() => {
    const styleEl = document.createElement('style');
    styleEl.innerHTML = animationStyles;
    document.head.appendChild(styleEl);
    
    return () => {
      document.head.removeChild(styleEl);
    };
  }, []);
  
  const { data, isLoading, error, refetch } = useCommunityImpactData();
  const [visibleCount, setVisibleCount] = useState(7);

  // Handle refetching data on error
  const handleRetry = () => {
    refetch();
  };

  if (isLoading) {
    return (
      <section className="bg-black text-white py-20">
        <div className="container mx-auto px-4">
          <div className="min-h-[400px] flex items-center justify-center">
            <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-white"></div>
          </div>
        </div>
      </section>
    );
  }

  if (error) {
    console.error('Community Impact loading error:', error);
    return (
      <section className="bg-black text-white py-20">
        <div className="container mx-auto px-4">
          <div className="min-h-[200px] flex flex-col items-center justify-center">
            <div className="text-red-400 mb-4">
              <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h3 className="text-xl font-medium text-white mb-2">Failed to load community impact data</h3>
            <p className="text-gray-400 mb-4">There was an error loading this content</p>
            <button 
              onClick={handleRetry}
              className="px-4 py-2 border border-white hover:bg-white/10 rounded-md text-white transition-colors duration-300"
            >
              Try Again
            </button>
          </div>
        </div>
      </section>
    );
  }

  const communityImpacts = data?.community?.filter(impact => 
    impact && impact.description && impact.location && impact.date
  ) || [];

  if (communityImpacts.length === 0) {
    return null;
  }

  const showLoadMore = visibleCount < communityImpacts.length;
  const showViewLess = visibleCount > 7 && visibleCount <= communityImpacts.length;
  
  const handleLoadMore = () => {
    setVisibleCount(Math.min(visibleCount + 7, communityImpacts.length));
  };
  
  const handleViewLess = () => {
    setVisibleCount(7);
  };

  return (
    <section className="bg-black text-white py-20">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Community Impact & STEM Advocacy
          </h2>
          <p className="text-gray-400 max-w-3xl mx-auto">
            Driving positive change through technology education, youth mentorship, and community development—from STEM workshops to tech entrepreneurship programs and sustainable innovation initiatives.
          </p>
        </div>

        {/* Impact Cards */}
        <div className="space-y-6">
          {communityImpacts.slice(0, visibleCount).map((impact, index) => (
            <div 
              key={impact.id} 
              className="fade-in-item" 
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <CommunityImpactCard impact={impact} />
            </div>
          ))}
        </div>
        
        {/* Load More / View Less Buttons */}
        {(showLoadMore || showViewLess) && (
          <div className="flex justify-center mt-10 space-x-4">
            {showLoadMore && (
              <button
                onClick={handleLoadMore}
                className="px-6 py-2 border border-white hover:bg-white/10 rounded-md text-white transition-colors duration-300"
              >
                Load More
              </button>
            )}
            {showViewLess && (
              <button
                onClick={handleViewLess}
                className="px-6 py-2 border border-gray-500 hover:bg-white/5 rounded-md text-gray-300 transition-colors duration-300"
              >
                View Less
              </button>
            )}
          </div>
        )}
      </div>
    </section>
  );
}