import { buildUrl } from '../../../api/home/heroApi';

import { ContactIcon } from '../../../api/home/heroApi';

interface HeroSocialIconsProps {
  icons: ContactIcon[];
}

export const HeroSocialIcons = ({ icons }: HeroSocialIconsProps) => {
  if (!Array.isArray(icons) || !icons.length) {
    return null;
  }

  return (
    <div className="flex gap-12 mt-8">
      {icons.map((icon, idx) =>
        icon.platform && icon.icon ? (
          <div 
            className="flex flex-col items-center transform hover:scale-110 transition-all duration-300" 
            key={icon.platform + idx}
          >
            {icon.link ? (
              <a 
                href={icon.link} 
                target="_blank" 
                title={icon.platform} 
                rel="noopener noreferrer"
                className="p-3 rounded-xl bg-gradient-to-br from-gray-800 to-gray-900 hover:from-blue-600 hover:to-purple-600 shadow-lg hover:shadow-blue-500/25 transition-all duration-300"
              >
                <img
                  src={icon.icon}
                  alt={icon.platform}
                  className="w-6 h-6 md:w-8 md:h-8 object-contain"
                />
              </a>
            ) : (
              <div className="p-3 rounded-xl bg-gradient-to-br from-gray-800/50 to-gray-900/50 opacity-50 cursor-not-allowed">
                <img
                  src={icon.icon}
                  alt={icon.platform}
                  className="w-6 h-6 md:w-8 md:h-8 object-contain"
                />
              </div>
            )}
            <span className="mt-2 text-sm font-light text-gray-400 tracking-wide">
              {icon.platform}
            </span>
          </div>
        ) : null
      )}
    </div>
  );
};
