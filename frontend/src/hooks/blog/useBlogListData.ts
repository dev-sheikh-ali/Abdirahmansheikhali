/**
 * Custom hook for fetching and caching paginated blog posts
 * 
 * Uses TanStack Query (React Query) for data fetching, caching, and state management.
 * Automatically handles loading states, error states, and data caching.
 */
import { useQuery } from '@tanstack/react-query';
import { fetchBlogPosts } from '../../api/blog/blogApi';

/**
 * Hook for fetching blog posts with pagination and category filtering
 *
 * @param {number} page - Current page number
 * @param {number} perPage - Posts per page
 * @param {string} [category] - Optional category to filter by
 * @returns {UseQueryResult} Query result object containing data, loading state, and error state
 */
export const useBlogListData = (page = 1, perPage = 6, category?: string) => {
  return useQuery({
    queryKey: ['blog-posts', page, perPage, category], // Cache key that changes with params
    queryFn: () => fetchBlogPosts(page, perPage, category),
    staleTime: 1000 * 60 * 5, // Cache data for 5 minutes before refetching
  });
};
