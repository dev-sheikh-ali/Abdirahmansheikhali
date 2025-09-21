// Custom React hook to fetch and manage the state of hero section data from the API
import { useEffect, useState } from 'react';
import { fetchHeroData, HeroData } from '../../api/home/heroApi';

export function useHeroData() {
  // State to hold the hero data fetched from Strapi
  const [data, setData] = useState<HeroData | null>(null);
  // State to indicate if the data is currently being loaded
  const [loading, setLoading] = useState(true);
  // State to hold any error encountered during fetch
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    // Track if the component is still mounted to avoid state updates after unmount
    let isMounted = true;
    setLoading(true);     // Set loading to true before starting fetch
    setError(null);       // Reset error before fetch
    fetchHeroData()       // Fetch hero data from API
      .then(res => {
        if (isMounted) setData(res); // Set data if still mounted
      })
      .catch(err => {
        if (isMounted) setError(err); // Set error if fetch fails
      })
      .finally(() => {
        if (isMounted) setLoading(false); // Set loading to false when done
      });
    // Cleanup function to avoid setting state after unmount
    return () => { isMounted = false; };
  }, []);

  // Return the data, loading, and error state for use in components
  return { data, loading, error };
}
