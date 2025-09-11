import { CTAButton } from '../../../api/home/heroApi';

interface HeroContentProps {
  intro: string;
  title: string;
  subtitle: string;
  bio: Array<{
    type: string;
    children: Array<{
      type: string;
      text: string;
    }>;
  }>;
  cta_primary: CTAButton;
  cta_secondary: CTAButton;
}

export const HeroContent = ({ 
  intro,
  title, 
  subtitle, 
  bio,
  cta_primary,
  cta_secondary 
}: HeroContentProps) => {
  const bioText = bio[0]?.children[0]?.text || '';

  return (
    <div className="flex flex-col gap-6 lg:gap-8 max-w-3xl">
      <div className="animate-fade-in-up">
        <div className="flex items-center gap-3 mb-6">
          <span className="text-3xl lg:text-4xl font-extrabold text-blue-400">Hey there, I'm</span>
          <span className="text-4xl lg:text-5xl animate-wave hover:rotate-12 transition-transform">👋</span>
        </div>
        <h1 className="text-3xl lg:text-5xl xl:text-6xl font-extrabold bg-gradient-to-r from-purple-400 via-blue-500 to-indigo-500 text-transparent bg-clip-text leading-tight mb-2">
          {title}
        </h1>
      </div>
      <p className="text-xl lg:text-2xl text-white font-medium tracking-wide animate-fade-in-up animation-delay-200">
        {subtitle}
      </p>
      <div className="relative pl-6 animate-fade-in-up animation-delay-300">
        <div className="absolute left-0 top-0 bottom-0 w-1 bg-blue-600 rounded"></div>
        <p className="text-lg lg:text-xl text-white/80 leading-relaxed font-light tracking-wide max-w-2xl">
          {bioText}
        </p>
      </div>
      <div className="flex gap-4 animate-fade-in-up animation-delay-400">
        {cta_primary && (
          <a
            href={cta_primary.link}
            className="px-8 py-4 rounded-lg bg-blue-600 text-white font-semibold hover:bg-blue-700 transition-all duration-200 shadow-md"
          >
            {cta_primary.label}
          </a>
        )}
        {cta_secondary && (
          <a
            href={cta_secondary.link}
            className="px-8 py-4 rounded-lg border border-white/20 text-white font-semibold hover:border-blue-600 hover:text-blue-400 transition-all duration-200"
          >
            {cta_secondary.label}
          </a>
        )}
      </div>
    </div>
  );
};
