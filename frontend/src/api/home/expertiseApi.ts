import { AxiosError } from 'axios';
import cmsClient from '../../lib/cmsClient';
import { HomeData, HomeDataResponse } from '../../types/expertise';

// Fetches expertise data for the home page from Strapi
export const fetchExpertise = async (): Promise<HomeDataResponse> => {
  try {
    // Make a GET request to Strapi for home/expertise data
    const response = await cmsClient.get('/home?populate=expertise');
    
    // Check if the expected data exists in the response
    if (!response.data?.data) {
      throw new Error('Home data not found in response');
    }

    // Debug log for development (can be removed in production)
    console.log('Expertise response:', response.data);
    // Return the full response data
    return response.data;
  } catch (error) {
    // Log error for debugging
    console.error('Expertise fetch error:', error);
    // Handle Axios-specific errors with a custom message
    if (error instanceof AxiosError) {
      throw new Error(error.response?.data?.error?.message || 'Failed to fetch expertise data');
    }
    // Rethrow any other errors
    throw error;
  }
};
