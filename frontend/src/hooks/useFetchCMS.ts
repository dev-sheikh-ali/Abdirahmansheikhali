

import { useEffect, useState } from "react";
import cmsClient from "../lib/cmsClient";

export default function useFetchCMS(endpoint) {
	const [data, setData] = useState(null);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(null);

	useEffect(() => {
		let isMounted = true;
		setLoading(true);
		setError(null);
		(async () => {
			try {
				const res = await cmsClient.get(endpoint);
				if (isMounted) setData(res.data.data);
			} catch (err) {
				if (isMounted) setError(err);
			} finally {
				if (isMounted) setLoading(false);
			}
		})();
		return () => { isMounted = false; };
	}, [endpoint]);

	return { data, loading, error };
}
