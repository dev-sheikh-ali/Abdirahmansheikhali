import { useQuery } from '@tanstack/react-query';
import { fetchCommunityImpact } from '../../api/home/communityImpactApi';

export const useCommunityImpactData = () => {
  return useQuery({
    queryKey: ['home-community'],
    queryFn: fetchCommunityImpact,
    select: (data) => data.data,
    retry: 3, // Retry failed requests up to 3 times
    retryDelay: attemptIndex => Math.min(1000 * 2 ** attemptIndex, 30000), // Exponential backoff
    staleTime: 5 * 60 * 1000, // Consider data fresh for 5 minutes
    refetchOnWindowFocus: false, // Don't refetch when window regains focus
  });
};
