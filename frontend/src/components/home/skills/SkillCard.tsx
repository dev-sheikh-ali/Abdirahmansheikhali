import { FC, memo } from 'react';
import { Skill } from '../../../types/skills';

// We don't need the SkillIcon and ProgressBar components anymore 
// as their functionality is now integrated into the SkillCard

export const SkillCard: FC<Skill> = memo(({ name, icon, number }) => {
  // Default to 75% if no number provided
  const progressValue = number ?? 75;
  // Get a letter for the skill if no icon is provided
  const letter = name?.charAt(0)?.toLowerCase() || '?';
  
  return (
    <div className="flex items-center gap-2 animate-fadeInUp">
      {/* Skill icon or letter */}
      <div className="flex-shrink-0 w-6 h-6 flex items-center justify-center">
        {icon ? (
          <img src={icon} alt={name || ''} className="w-4 h-4" />
        ) : (
          <span className="text-indigo-400 text-xs font-medium">{letter}</span>
        )}
      </div>
      
      {/* Simple horizontal progress bar */}
      <div className="relative flex-grow h-4">
        {/* Progress background */}
        <div className="absolute inset-0 rounded bg-gray-800"></div>
        
        {/* Progress indicator */}
        <div 
          className="absolute inset-y-0 left-0 bg-indigo-500 rounded progress-animate"
          style={{ 
            width: `${progressValue}%`,
            transition: "width 1s ease-out"
          }}
        ></div>
        
        {/* Skill name */}
        <div className="absolute inset-0 flex items-center px-2 z-10">
          <span className="text-xs font-medium text-white truncate">
            {name || 'Skill'}
          </span>
        </div>
      </div>
      
      {/* Percentage indicator */}
      <span className="text-xs text-white font-medium min-w-[28px] text-right">
        {progressValue}%
      </span>
    </div>
  );
});

SkillCard.displayName = 'SkillCard';
