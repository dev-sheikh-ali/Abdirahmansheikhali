import { FC, memo, useState } from 'react';
import { SkillCard } from './SkillCard';
import type { SkillCategory as ISkillCategory } from '../../../types/skills';

const CategoryHeader: FC<Pick<ISkillCategory, 'category' | 'category_icon'>> = memo(
  ({ category, category_icon }) => (
    <div className="flex items-center gap-2 mb-3 pb-2 border-b border-indigo-500/30">
      {category_icon ? (
        <img 
          src={category_icon} 
          alt={category} 
          className="w-6 h-6" 
        />
      ) : (
        <span className="text-blue-400 text-lg font-bold uppercase w-6 h-6 flex items-center justify-center">
          {category.charAt(0)}
        </span>
      )}
      <h3 className="text-lg font-bold text-blue-300 capitalize">
        {category}
      </h3>
    </div>
  )
);

CategoryHeader.displayName = 'CategoryHeader';

export const SkillCategory: FC<ISkillCategory> = memo(({ id, category, category_icon, skills }) => {
  const [showAll, setShowAll] = useState(false);
  const initialSkills = skills?.slice(0, 7) || [];
  const remainingSkills = skills?.slice(7) || [];
  const hasMoreSkills = remainingSkills.length > 0;
  
  return (
    <div key={id} className="bg-gray-900 rounded-lg p-3 border border-gray-800">
      {/* Category Header */}
      <CategoryHeader category={category} category_icon={category_icon} />
      
      {/* Skills listed compactly */}
      <div className="grid grid-cols-1 gap-y-2">
        {/* Initial 7 skills always visible */}
        {initialSkills.map((skill, index) => (
          <div 
            key={skill.id}
            className="animate-fadeInUp"
            style={{
              animationDelay: `${index * 0.05}s`
            }}
          >
            <SkillCard {...skill} />
          </div>
        ))}
        
        {/* Additional skills shown when "show more" is clicked */}
        {showAll && remainingSkills.map((skill, index) => (
          <div 
            key={skill.id}
            className="animate-fadeInUp"
            style={{
              animationDelay: `${index * 0.05}s`
            }}
          >
            <SkillCard {...skill} />
          </div>
        ))}
        
        {/* Load more button */}
        {hasMoreSkills && (
          <button 
            onClick={() => setShowAll(!showAll)}
            className="text-xs text-blue-400 hover:text-blue-300 mt-2 py-1 transition-colors focus:outline-none"
          >
            {showAll ? 'Show less' : `Show ${remainingSkills.length} more`}
          </button>
        )}
      </div>
    </div>
  );
});

SkillCategory.displayName = 'SkillCategory';
