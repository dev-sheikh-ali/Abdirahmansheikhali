/**
 * GitHub Configuration for Blog CMS
 * 
 * This module centralizes GitHub API configuration for the blog feature.
 * Required environment variables:
 * - VITE_GITHUB_OWNER: GitHub username or organization name
 * - VITE_GITHUB_REPO: Repository name containing the issues used as blog posts
 * - VITE_GITHUB_TOKEN: (Optional) GitHub personal access token for API rate limits
 * 
 * SECURITY NOTES:
 * 1. The token is exposed to the client, use a token with minimal permissions
 *    (public_repo or read-only access)
 * 2. For production, consider using a backend proxy to protect the token
 */
export const GITHUB_CONFIG = {
  owner: import.meta.env.VITE_GITHUB_OWNER || "dev-sheikh-ali", // Your GitHub username
  repo: import.meta.env.VITE_GITHUB_REPO || "Abdirahmansheikhali", // Your repository name
  token: import.meta.env.VITE_GITHUB_TOKEN || "", // Token is optional for public repos
  
  // NOTE: If you're seeing a 404 error, double check your GitHub owner and repo names
  // Make sure the repository contains issues with labels: type:post and state:published
};
