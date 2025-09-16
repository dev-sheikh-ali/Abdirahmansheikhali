import { useQuery } from '@tanstack/react-query';
import { fetchCommunityImpact } from '../../api/home/communityImpactApi';

// Custom hook to fetch and cache community impact data for the home page
export const useCommunityImpactData = () => {
  return useQuery({
    queryKey: ['home-community'], // Unique key for React Query cache
    queryFn: fetchCommunityImpact, // Function to fetch community impact data from API
    select: (data) => data.data,   // Extracts the actual data from the response
    retry: 3,                      // Retry failed requests up to 3 times
    retryDelay: attemptIndex => Math.min(1000 * 2 ** attemptIndex, 30000), // Exponential backoff for retries
    staleTime: 5 * 60 * 1000,      // Data is considered fresh for 5 minutes
    refetchOnWindowFocus: false,   // Do not refetch when window regains focus
    // Error handling is managed by React Query and fetchCommunityImpact (see fetchCommunityImpact for details)
  });
};
