import { useQuery } from '@tanstack/react-query';
import { fetchExpertise } from '../../api/home/expertiseApi';
import { HomeDataResponse } from '../../types/expertise';

// Custom hook to fetch and cache expertise data for the home page
export const useExpertiseData = () => {
  return useQuery({
    queryKey: ['home-expertise'], // Unique key for React Query cache
    queryFn: fetchExpertise,      // Function to fetch expertise data from API
    staleTime: 1000 * 60 * 5,     // Data is considered fresh for 5 minutes
    select: (data: HomeDataResponse) => data.data, // Extracts the actual data from the response
    // Error handling is managed by React Query and fetchExpertise (see fetchExpertise for details)
  });
};
