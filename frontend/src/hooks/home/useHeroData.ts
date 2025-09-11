import { useEffect, useState } from 'react';
import { fetchHeroData, HeroData } from '../../api/home/heroApi';

export function useHeroData() {
  const [data, setData] = useState<HeroData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    let isMounted = true;
    setLoading(true);
    setError(null);
    fetchHeroData()
      .then(res => { if (isMounted) setData(res); })
      .catch(err => { if (isMounted) setError(err); })
      .finally(() => { if (isMounted) setLoading(false); });
    return () => { isMounted = false; };
  }, []);

  return { data, loading, error };
}
