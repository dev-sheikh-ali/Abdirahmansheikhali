import { AxiosError } from 'axios';
import cmsClient from '../../lib/cmsClient';
import { CommunityImpactResponse } from '../../types/communityImpact';
import { buildUrl } from './heroApi';

export const fetchCommunityImpact = async (): Promise<CommunityImpactResponse> => {
  try {
    const response = await cmsClient.get('/home?populate[community][populate]=*');
    
    if (!response.data) {
      throw new Error('Community impact data not found in response');
    }

    // Transform the response to include full URLs
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

    return transformedData;
  } catch (error) {
    console.error('Community impact fetch error:', error);
    if (error instanceof AxiosError) {
      throw new Error(error.response?.data?.error?.message || 'Failed to fetch community impact data');
    }
    throw error;
  }
};
