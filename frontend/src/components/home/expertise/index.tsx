import { useExpertiseData } from '../../../hooks/home/useExpertiseData';
import { ExpertiseCard } from './ExpertiseCard';

import { HomeDataResponse } from '../../../types/expertise';

export default function Expertise() {
  const { data, isLoading, error } = useExpertiseData();
  
  console.log('Raw response data:', data); // Debug log
  
  // Filter out incomplete items (missing title, description, or icon)
  const expertise = data?.expertise?.filter(item => 
    item && item.title && item.decription && item.icon
  ) || [];

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
    console.error('Expertise loading error:', error);
    return (
      <section className="bg-black text-white py-20">
        <div className="container mx-auto px-4">
          <div className="min-h-[200px] flex flex-col items-center justify-center">
            <div className="text-red-400 mb-4">
              <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h3 className="text-xl font-medium text-white mb-2">Failed to load expertise data</h3>
            <p className="text-gray-400 mb-4">Please try again later</p>
          </div>
        </div>
      </section>
    );
  }

  if (expertise.length === 0) {
    console.log('No expertise data:', data);
    return null;
  }

  return (
    <section className="bg-black text-white py-20">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Technical Expertise & Specializations
          </h2>
          <p className="text-gray-400 max-w-3xl mx-auto">
            Multidisciplinary engineering skills spanning full-stack development, IoT systems, AI/ML, 
            and cybersecurity - all focused on creating innovative solutions for real-world challenges.
          </p>
        </div>
      
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {expertise.map((item) => (
            <ExpertiseCard
              key={item.id}
              title={item.title}
              decription={item.decription}
              icon={item.icon}
              link={item.link}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
