/**
 * Blog API Module
 * 
 * This module provides functions to interact with the GitHub API,
 * using GitHub Issues as a CMS for blog posts.
 * 
 * Each blog post is a GitHub issue with:
 * - Special labels to mark it as a blog post ('type:post')
 * - Publishing state labels ('state:published' or 'state:draft')
 * - Optional category labels
 * - Frontmatter in the issue body for additional metadata
 */
import axios from 'axios';
import { BlogPost, BlogListResponse } from '../../types/blog';
import { GITHUB_CONFIG } from '../../config/github';

/**
 * Axios instance configured for GitHub API access
 * Uses authorization token if provided in environment variables
 * 
 * SECURITY NOTE: GitHub API has rate limits - authenticated requests
 * have higher limits but expose the token to client-side code
 */
/**
 * For public repositories, we can make unauthenticated requests (with rate limits)
 * For private repositories, a token is required
 */
const githubApi = axios.create({
  baseURL: `https://api.github.com/repos/${GITHUB_CONFIG.owner}/${GITHUB_CONFIG.repo}`,
  headers: {
    Accept: 'application/vnd.github.v3+json',
    // Only add Authorization header if token exists
    ...(GITHUB_CONFIG.token ? { Authorization: `Bearer ${GITHUB_CONFIG.token}` } : {}),
  },
});

/**
 * Parses YAML frontmatter from markdown content
 * Frontmatter must be enclosed between '---' markers at the start of the content
 * 
 * @param {string} body - Markdown content with optional frontmatter
 * @returns {Record<string, string>} Parsed frontmatter as key-value pairs
 */
const parseFrontmatter = (body: string) => {
  const frontmatterRegex = /^---\n([\s\S]*?)\n---/;
  const match = body.match(frontmatterRegex);
  
  if (!match) return {};
  
  const frontmatterBlock = match[1];
  const frontmatter: Record<string, string> = {};
  
  frontmatterBlock.split('\n').forEach(line => {
    const [key, ...valueParts] = line.split(':');
    if (key && valueParts.length) {
      frontmatter[key.trim()] = valueParts.join(':').trim();
    }
  });
  
  return frontmatter;
};

/**
 * Processes a GitHub issue to convert it to a blog post
 * Adds the parsed frontmatter to the post object
 * 
 * @param {any} post - GitHub issue object from the API
 * @returns {BlogPost} Enhanced blog post with frontmatter
 */

// Helper to fetch user profile (for full name)
const fetchUserProfile = async (username: string) => {
  try {
    const response = await axios.get(`https://api.github.com/users/${username}`);
    return response.data;
  } catch (e) {
    return null;
  }
};

// Async version to allow fetching user full name
const processPost = async (post: any): Promise<BlogPost> => {
  const frontmatter = parseFrontmatter(post.body);
  let user = post.user;
  // Try to fetch full name if not present
  if (!user.name) {
    const profile = await fetchUserProfile(user.login);
    if (profile && profile.name) {
      user = { ...user, name: profile.name };
    }
  }
  return {
    ...post,
    user,
    frontmatter,
  };
};

/**
 * Fetches paginated blog posts from GitHub Issues
 * 
 * @param {number} page - Page number for pagination (starts at 1)
 * @param {number} perPage - Number of posts per page
 * @param {string} [label] - Optional category label to filter posts
 * @returns {Promise<BlogListResponse>} Paginated blog posts with metadata
 * 
 * IMPLEMENTATION NOTE: Uses GitHub's built-in pagination and filtering
 * All posts must have 'type:post' and 'state:published' labels
 */
export const fetchBlogPosts = async (
  page = 1,
  perPage = 6,
  label?: string
): Promise<BlogListResponse> => {
  try {
    const params = {
      state: 'open',                      // Only use open issues (closed issues are not displayed)
      labels: label 
        ? `${label},type:post,state:published`  // Filter by category if provided
        : 'type:post,state:published',          // Otherwise show all published posts
      sort: 'created',                    // Sort by creation date
      direction: 'desc',                  // Newest first
      page,                               // Page number
      per_page: perPage,                  // Posts per page
    };

    const response = await githubApi.get('/issues', { params });
    
    // Extract pagination metadata from response headers
    const linkHeader = response.headers.link || '';
    const hasNextPage = linkHeader.includes('rel="next"');
    const totalCount = parseInt(response.headers['x-total-count'] || '0', 10);

    // Process each issue to extract frontmatter and create blog post objects
  const posts = await Promise.all(response.data.map(processPost));
    
    return {
      posts,
      totalCount,
      hasNextPage,
      currentPage: page,
    };
  } catch (error) {
    // Log error details for debugging but return a user-friendly message
    console.error('Error fetching blog posts:', error);
    throw new Error('Failed to fetch blog posts');
  }
};

/**
 * Fetches a single blog post by slug or issue number
 * 
 * @param {string|number} slugOrNumber - Either a custom slug from frontmatter or issue number
 * @returns {Promise<BlogPost|null>} The blog post or null if not found
 * 
 * IMPLEMENTATION NOTES:
 * - If providing a numeric ID, direct fetch via issue number (fast)
 * - If providing a slug, fetches all posts and searches for matching slug in frontmatter
 *   This is inefficient for large numbers of posts but necessary since GitHub API
 *   doesn't allow searching within issue content
 * 
 * SECURITY NOTE: Input validation is performed to ensure slugOrNumber is safe
 * when used as part of API URL
 */
export const fetchBlogPost = async (slugOrNumber: string | number): Promise<BlogPost | null> => {
  try {
    // Direct fetch by issue number (efficient)
    if (typeof slugOrNumber === 'number' || /^\d+$/.test(slugOrNumber)) {
      const response = await githubApi.get(`/issues/${slugOrNumber}`);
  return await processPost(response.data);
    }
    
    // Fetch all posts and search for matching slug (less efficient)
    const params = {
      state: 'open',
      labels: 'type:post,state:published',
    };
    
    const response = await githubApi.get('/issues', { params });
    
    // Search through all issues to find matching slug in frontmatter
    for (const issue of response.data) {
      const frontmatter = parseFrontmatter(issue.body);
      if (frontmatter.slug === slugOrNumber) {
  return await processPost(issue);
      }
    }
    
    return null;
  } catch (error) {
    console.error(`Error fetching blog post:`, error);
    throw new Error('Failed to fetch blog post');
  }
};

/**
 * Fetches blog categories (labels) with post counts
 * 
 * @returns {Promise<Array<{name: string, count: number}>>} Categories with post counts
 * 
 * IMPLEMENTATION NOTES:
 * - Fetches all labels first, then filters out special labels
 * - Makes separate API calls to count posts for each category
 * - Only returns categories that have at least one published post
 * - Potential performance issue with many categories (makes N+1 API calls)
 */
export const fetchBlogCategories = async (): Promise<{ name: string; count: number }[]> => {
  try {
    const response = await githubApi.get('/labels');
    
    // Filter out special labels that aren't categories
    const categoryLabels = response.data.filter((label: any) => 
      !['type:post', 'state:published', 'state:draft'].includes(label.name)
    );
    
    // For each category label, count how many published posts have that label
    const categoriesWithCount = await Promise.all(
      categoryLabels.map(async (label: any) => {
        const issuesResponse = await githubApi.get('/issues', {
          params: {
            state: 'open',
            labels: `${label.name},type:post,state:published`,
            per_page: 1, // Only need count, not actual issues
          },
        });
        
        // Extract total count from response headers
        const totalItems = parseInt(issuesResponse.headers['x-total-count'] || '0', 10);
        
        return {
          name: label.name,
          count: totalItems,
        };
      })
    );
    
    // Only return categories that have at least one post
    return categoriesWithCount.filter(cat => cat.count > 0);
  } catch (error) {
    // Log error but return empty array to prevent UI crashes
    console.error('Error fetching blog categories:', error);
    return [];
  }
};
