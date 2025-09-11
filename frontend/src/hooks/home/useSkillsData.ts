import { useQuery } from '@tanstack/react-query';
import { fetchSkills } from '../../api/home/skillsApi';

export const useSkillsData = () => {
  return useQuery({
    queryKey: ['home'],
    queryFn: fetchSkills,
    staleTime: 1000 * 60 * 5, // 5 minutes
  });
};
