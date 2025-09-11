import { AxiosError } from 'axios';
import cmsClient from '../../lib/cmsClient';
import { HomeDataResponse } from '../../types/skills';

export const fetchSkills = async (): Promise<HomeDataResponse['data']> => {
  if (!import.meta.env.VITE_STRAPI_URL) {
    throw new Error('VITE_STRAPI_URL environment variable is not set');
  }

  try {
    const response = await cmsClient.get('/home?populate=Techskills.skills');
    
    if (!response.data?.data) {
      throw new Error('Home data not found in response');
    }

    return response.data.data;
  } catch (error) {
    if (error instanceof AxiosError) {
      throw new Error(error.response?.data?.error?.message || 'Failed to fetch skills data');
    }
    throw error;
  }
};
