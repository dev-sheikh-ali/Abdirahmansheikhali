import { AxiosError } from 'axios';
import cmsClient from '../../lib/cmsClient';
import { HomeData, HomeDataResponse } from '../../types/expertise';

export const fetchExpertise = async (): Promise<HomeDataResponse> => {
  try {
    const response = await cmsClient.get('/home?populate=expertise');
    
    if (!response.data?.data) {
      throw new Error('Home data not found in response');
    }

    console.log('Expertise response:', response.data); // For debugging
    return response.data;
  } catch (error) {
    console.error('Expertise fetch error:', error); // For debugging
    if (error instanceof AxiosError) {
      throw new Error(error.response?.data?.error?.message || 'Failed to fetch expertise data');
    }
    throw error;
  }
};
