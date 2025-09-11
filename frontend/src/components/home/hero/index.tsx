import { HeroBackground } from './HeroBackground';
import { HeroContent } from './HeroContent';
import { HeroImageCarousel } from './HeroImageCarousel';
import { HeroSocialIcons } from './HeroSocialIcons';
import { useHeroData } from '../../../hooks/home/useHeroData';
import { buildUrl } from '../../../api/home/heroApi';

export const Hero = () => {
  const { data, loading, error } = useHeroData();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-pulse flex flex-col items-center gap-4">
          <div className="h-8 w-48 bg-blue-600/20 rounded"></div>
          <div className="h-16 w-96 bg-blue-600/10 rounded"></div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-red-400 bg-red-400/10 px-4 py-2 rounded-lg">
          Error loading hero content
        </div>
      </div>
    );
  }

  if (!data) {
    return null;
  }
  return (
    <section className="relative min-h-screen py-8 lg:py-12 flex items-center overflow-hidden">
      <HeroBackground />
      
      <div className="container mx-auto px-6 md:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-start">
          <div className="relative max-w-3xl mx-auto lg:mx-0">
            <div className="absolute -top-10 -left-10 w-40 h-40 bg-blue-500/10 rounded-full blur-3xl animate-pulse"></div>
            <div className="absolute -bottom-20 -right-10 w-60 h-60 bg-purple-500/5 rounded-full blur-3xl"></div>
            <div className="relative">
              <HeroContent
                intro={data.intro}
                title={data.name || "Abdirahman Sheikh Ali"}
                subtitle={data.tagline}
                bio={data.bio}
                cta_primary={data.cta_primary}
                cta_secondary={data.cta_secondary}
              />
              <HeroSocialIcons icons={data.contact_icons} />
            </div>
          </div>
          
          <div className="relative">
            <div className="absolute -top-10 -right-10 w-40 h-40 bg-purple-500/10 rounded-full blur-3xl animate-pulse"></div>
            <div className="absolute -bottom-20 -left-10 w-60 h-60 bg-blue-500/5 rounded-full blur-3xl"></div>
            <HeroImageCarousel images={data.images} />
          </div>
        </div>
      </div>
    </section>
  );
};
