/**
 * Custom hook for fetching and caching a single blog post
 * 
 * Uses TanStack Query (React Query) for data fetching, caching, and state management.
 * Automatically handles loading states, error states, and data caching.
 */
import { useQuery } from '@tanstack/react-query';
import { fetchBlogPost } from '../../api/blog/blogApi';

/**
 * Hook for fetching a single blog post by slug or issue number
 *
 * @param {string|number} slugOrNumber - Post identifier (slug or issue number)
 * @returns {UseQueryResult} Query result object containing data, loading state, and error state
 */
export const useBlogPostData = (slugOrNumber: string | number) => {
  return useQuery({
    queryKey: ['blog-post', slugOrNumber], // Cache key that changes with the post identifier
    queryFn: () => fetchBlogPost(slugOrNumber),
    staleTime: 1000 * 60 * 5, // Cache data for 5 minutes before refetching
  });
};
