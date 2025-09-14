import { useState, useRef, useEffect } from 'react';
import { CommunityImpactItem } from '../../../types/communityImpact';
import { format } from 'date-fns';

interface CommunityImpactCardProps {
  impact: CommunityImpactItem;
}

export const CommunityImpactCard = ({ impact }: CommunityImpactCardProps) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);

  const toggleExpand = () => setIsExpanded(!isExpanded);

  // Handle keyboard interactions
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      toggleExpand();
    }
  };

  // Focus management for accessibility
  useEffect(() => {
    if (isExpanded && cardRef.current) {
      // Set focus to the card when expanded
      cardRef.current.focus();
    }
  }, [isExpanded]);

  return (
    <div 
      ref={cardRef}
      className={`bg-zinc-900/50 backdrop-blur-sm border border-zinc-800 rounded-xl overflow-hidden transition-all duration-300 ${
        isExpanded ? 'cursor-zoom-out shadow-lg' : 'cursor-zoom-in hover:border-white/30 hover:shadow-md'
      }`}
      onClick={toggleExpand}
      onKeyDown={handleKeyDown}
      tabIndex={0}
      role="button"
      aria-expanded={isExpanded}
      aria-label={`${impact.title} - ${impact.location} - ${format(new Date(impact.date), 'MMMM yyyy')}`}
    >
      {/* Collapsed View */}
      <div className="flex items-center py-4 px-4">
        {impact.image && (
          <div className="relative w-16 h-16 flex-shrink-0 rounded-full overflow-hidden border-2 border-white/20 mr-4">
            <img
              src={impact.image?.formats?.thumbnail?.url || impact.image?.url || ''}
              alt={impact.title}
              className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-300"
              loading="lazy"
            />
          </div>
        )}
        <div className="flex-1">
          <h3 className="text-xl font-semibold text-white mb-1">
            {impact.title}
          </h3>
          <div className="flex items-center text-sm text-gray-400">
            <span className="flex items-center mr-3">
              <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
                <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
              </svg>
              {impact.location}
            </span>
            <span className="flex items-center">
              <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
                <path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd" />
              </svg>
              {format(new Date(impact.date), 'MMMM yyyy')}
            </span>
          </div>
        </div>
        {/* Expand/Collapse indicator */}
        <div className="ml-2" aria-hidden="true">
          <svg 
            className={`w-5 h-5 text-gray-400 transition-transform duration-300 ${isExpanded ? 'rotate-180' : ''}`} 
            fill="none" 
            stroke="currentColor" 
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
          </svg>
        </div>
      </div>

      {/* Expanded View with smooth transition */}
      <div 
        className={`transition-all duration-300 ease-in-out overflow-hidden ${
          isExpanded ? 'max-h-[1000px] opacity-100' : 'max-h-0 opacity-0'
        }`}
      >
        <div className="px-4 pb-4">
          <hr className="border-zinc-800 mb-3" />
          <div className="flex flex-col md:flex-row md:space-x-6 items-start">
            {/* Image Column */}
            {impact.image && (
              <div className="rounded-lg overflow-hidden w-full md:w-1/3 max-w-[280px] mb-3 md:mb-0">
                <div className="aspect-w-4 aspect-h-3">
                  <img
                    src={impact.image.formats?.medium?.url || impact.image.formats?.small?.url || impact.image.url}
                    alt={`${impact.title} - full size`}
                    className="w-full h-full object-cover rounded-lg shadow-lg transform hover:scale-105 transition-transform duration-300"
                    loading="lazy"
                  />
                </div>
              </div>
            )}
            {/* Text Column */}
              <div className="md:w-2/3">
              <div className="space-y-3">
                {impact.description.map((paragraph, index) => (
                  <p key={index} className="text-gray-300 leading-relaxed text-base tracking-wide">
                    {paragraph.children[0].text}
                  </p>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
