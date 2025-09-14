/**
 * BlogPost interface representing a GitHub issue used as a blog post
 * 
 * Combines GitHub issue properties with parsed frontmatter metadata
 * Frontmatter is extracted from the issue body and provides additional
 * blog-specific metadata that isn't available in the GitHub API.
 */
export interface BlogPost {
  id: number;          // GitHub issue ID
  number: number;      // GitHub issue number (used for API calls and comments)
  title: string;       // Post title (from issue title)
  body: string;        // Post content in markdown format
  created_at: string;  // Creation timestamp
  updated_at: string;  // Last update timestamp
  html_url: string;    // Link to the GitHub issue
  user: {              // Author information
    login: string;     // GitHub username
    name: string;   // Full name (if available)
    avatar_url: string; // Profile picture
    html_url: string;  // GitHub profile URL
  };
  labels: BlogLabel[]; // Categories and metadata labels
  // Parsed frontmatter - additional metadata from the markdown content
  frontmatter?: {
    slug?: string;     // Custom URL slug
    date?: string;     // Publication date (may differ from created_at)
    summary?: string;  // Short description for previews
    readingTime?: string; // Estimated reading time
    image?: string;    // Featured image URL
  };
}

/**
 * BlogLabel interface representing GitHub issue labels used for categorization
 */
export interface BlogLabel {
  id: number;                // Label ID
  name: string;              // Label name (category name)
  color: string;             // Label color (can be used for styling)
  description: string | null; // Label description
}

/**
 * BlogListResponse interface for paginated blog post lists
 * Contains both the post data and pagination metadata
 */
export interface BlogListResponse {
  posts: BlogPost[];         // Array of blog posts for the current page
  totalCount: number;        // Total number of posts (for pagination calculations)
  hasNextPage: boolean;      // Whether there are more posts to load
  currentPage: number;       // Current page number
}
