import { AxiosError } from 'axios';
import cmsClient from '../../lib/cmsClient';
import { CommunityImpactResponse } from '../../types/communityImpact';
import { buildUrl } from './heroApi';

// Fetches community impact data for the home page from Strapi
export const fetchCommunityImpact = async (): Promise<CommunityImpactResponse> => {
  try {
    // Make a GET request to Strapi for home/community impact data
    const response = await cmsClient.get('/home?populate[community][populate]=*');
    
    // Check if the expected data exists in the response
    if (!response.data) {
      throw new Error('Community impact data not found in response');
    }

    // Transform the response to include full URLs for images
    const transformedData = {
      ...response.data,
      data: {
        ...response.data.data,
        community: response.data.data.community?.map(item => ({
          ...item,
          image: item.image ? {
            ...item.image,
            url: buildUrl(item.image.url),
            formats: Object.fromEntries(
              Object.entries(item.image.formats || {}).map(([key, format]) => [
                key,
                {
                  ...(format as any),
                  url: buildUrl((format as any).url)
                }
              ])
            )
          } : null
        }))
      }
    };

    // Return the transformed data
    return transformedData;
  } catch (error) {
    // Log error for debugging
    console.error('Community impact fetch error:', error);
    // Handle Axios-specific errors with a custom message
    if (error instanceof AxiosError) {
      throw new Error(error.response?.data?.error?.message || 'Failed to fetch community impact data');
    }
    // Rethrow any other errors
    throw error;
  }
};
