import { AxiosError } from 'axios';
import cmsClient from '../../lib/cmsClient';
import { HomeDataResponse } from '../../types/skills';

// Fetches skills data for the home page from Strapi
export const fetchSkills = async (): Promise<HomeDataResponse['data']> => {
  // Ensure the Strapi URL is set in environment variables
  if (!import.meta.env.VITE_STRAPI_URL) {
    throw new Error('VITE_STRAPI_URL environment variable is not set');
  }

  try {
    // Make a GET request to Strapi for home/skills data
    const response = await cmsClient.get('/home?populate=Techskills.skills');
    
    // Check if the expected data exists in the response
    if (!response.data?.data) {
      throw new Error('Home data not found in response');
    }

    // Return the data portion of the response
    return response.data.data;
  } catch (error) {
    // Handle Axios-specific errors with a custom message
    if (error instanceof AxiosError) {
      throw new Error(error.response?.data?.error?.message || 'Failed to fetch skills data');
    }
    // Rethrow any other errors
    throw error;
  }
};
