import { useQuery } from '@tanstack/react-query';
import { fetchSkills } from '../../api/home/skillsApi';

// Custom hook to fetch and cache skills data for the home page
export const useSkillsData = () => {
  return useQuery({
    queryKey: ['home'],           // Unique key for React Query cache
    queryFn: fetchSkills,         // Function to fetch skills data from API
    staleTime: 1000 * 60 * 5,     // Data is considered fresh for 5 minutes
    // Error handling is managed by React Query and fetchSkills (see fetchSkills for details)
  });
};
