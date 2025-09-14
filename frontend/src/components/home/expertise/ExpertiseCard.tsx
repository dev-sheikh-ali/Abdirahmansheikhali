import { ExpertiseItem } from '../../../types/expertise';

type ExpertiseCardProps = Pick<ExpertiseItem, 'title' | 'decription' | 'icon' | 'link'>;

export const ExpertiseCard = ({ title, decription, icon, link }: ExpertiseCardProps) => {
  if (!title || !decription) return null;
  
  return (
    <div className="bg-zinc-900/50 backdrop-blur-sm border border-zinc-800 rounded-xl p-8 hover:border-white/30 transition-all duration-300 group flex flex-col items-center text-center">
      {/* Icon - Centered */}
      {icon && (
        <div className="relative mb-6 w-20 h-20 flex items-center justify-center">
          <img
            src={icon}
            alt={title}
            className="w-16 h-16 object-contain opacity-75 group-hover:opacity-100 transition-opacity duration-300"
          />
        </div>
      )}

      {/* Title - Centered */}
      <h3 className="text-2xl font-semibold mb-4 text-white">
        {title}
      </h3>

      {/* Description - Centered */}
      <p className="text-gray-400 leading-relaxed whitespace-pre-line mb-6">
        {decription.trim()}
      </p>

      {/* Learn More Link */}
      {link && (
        <a
          href={link}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-auto inline-flex items-center gap-2 text-blue-600 hover:text-blue-700 font-semibold transition-colors duration-200 px-2 py-1 rounded focus:outline-none focus:underline"
        >
          Learn More
          <svg
            className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform duration-300"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M13 7l5 5m0 0l-5 5m5-5H6"
            />
          </svg>
        </a>
      )}
    </div>
  );
};
