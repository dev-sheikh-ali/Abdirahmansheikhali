import { useQuery } from '@tanstack/react-query';
import { fetchExpertise } from '../../api/home/expertiseApi';
import { HomeDataResponse } from '../../types/expertise';

export const useExpertiseData = () => {
  return useQuery({
    queryKey: ['home-expertise'],
    queryFn: fetchExpertise,
    staleTime: 1000 * 60 * 5, // 5 minutes
    select: (data: HomeDataResponse) => data.data,
  });
};
