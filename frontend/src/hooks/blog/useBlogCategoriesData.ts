/**
 * Custom hook for fetching and caching blog categories
 * 
 * Uses TanStack Query (React Query) for data fetching, caching, and state management.
 * Automatically handles loading states, error states, and data caching.
 */
import { useQuery } from '@tanstack/react-query';
import { fetchBlogCategories } from '../../api/blog/blogApi';

/**
 * Type definition for blog categories with post counts
 */
type BlogCategory = {
  name: string;  // Category name (from label)
  count: number; // Number of posts with this category
};

/**
 * Hook for fetching blog categories with post counts
 * Used for displaying category filters/tags in the UI
 *
 * @returns {UseQueryResult} Query result object containing categories, loading state, and error state
 */
export const useBlogCategoriesData = () => {
  return useQuery<BlogCategory[], Error>({
    queryKey: ['blog-categories'],
    queryFn: fetchBlogCategories,
    staleTime: 1000 * 60 * 10, // Cache data for 10 minutes (longer than posts since categories change less often)
  });
};
