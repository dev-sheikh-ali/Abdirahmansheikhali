import { FC } from 'react';
import { useSkillsData } from '../../../hooks/home/useSkillsData';
import { SkillCategory } from './SkillCategory';

const LoadingSkills: FC = () => (
  <section className="py-16 bg-black">
    <div className="container mx-auto px-6">
      <div className="animate-pulse flex flex-col items-center gap-8">
        <div className="text-center space-y-4">
          <div className="h-10 w-64 bg-gray-800/50 rounded mx-auto"></div>
          <div className="h-4 w-96 bg-gray-800/30 rounded mx-auto"></div>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 w-full">
          {[1, 2].map((i) => (
            <div key={i} className="space-y-4">
              <div className="h-8 bg-gray-800/40 rounded-lg w-1/3"></div>
              <div className="grid grid-cols-2 gap-4">
                {[1, 2, 3, 4].map((j) => (
                  <div key={j} className="h-24 bg-gray-800/20 rounded-lg border border-gray-700/20"></div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  </section>
);

const ErrorDisplay: FC<{ message: string }> = ({ message }) => (
  <section className="py-16 bg-black">
    <div className="container mx-auto px-6">
      <div className="text-red-400 bg-red-400/10 px-6 py-4 rounded-lg text-center max-w-2xl mx-auto">
        <p className="text-lg font-medium mb-2">Failed to load skills</p>
        <p className="text-sm opacity-80">{message}</p>
      </div>
    </div>
  </section>
);

const Skills: FC = () => {
  const { data, isLoading, error } = useSkillsData();

  if (isLoading) return <LoadingSkills />;
  if (error) return <ErrorDisplay message={error.message} />;
  if (!data?.Techskills?.length) return null;

  return (
    <section className="py-8 bg-black">
      <div className="container mx-auto px-4">
        <div className="text-center mb-8">
          <h2 className="text-3xl md:text-5xl font-bold text-white mb-4">
            Technical Skills & Technologies
          </h2>
          <p className="text-gray-400 max-w-3xl mx-auto text-lg mb-8">
            I work with cutting-edge technologies and frameworks to build innovative solutions. From full-stack development to IoT systems, these are the tools and technologies that power my creative process.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {data.Techskills.map((category) => (
            <SkillCategory
              key={category.id}
              {...category}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Skills;
