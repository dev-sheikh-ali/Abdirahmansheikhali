import cmsClient from '../../lib/cmsClient';

// Fetch home data from Strapi
export async function fetchHomeData() {
  const res = await cmsClient.get('/home');
  // Strapi v4: data is in res.data.data
  return res.data.data;
}
