/**
 * Comments Component
 * 
 * Integrates utterances.es commenting system which uses GitHub issues for comments.
 * Each blog post's comments are tied to its GitHub issue number, allowing
 * commenting without a separate database or service.
 * 
 * SECURITY CONSIDERATIONS:
 * - This component dynamically injects a script from utteranc.es
 * - The script is loaded from a trusted source with crossorigin attribute
 * - Comments are managed by GitHub's permissions system
 */
import { useEffect, useRef } from 'react';
import { GITHUB_CONFIG } from '../../config/github';

interface CommentsProps {
  issueNumber: number; // GitHub issue number to link comments to
}

const Comments: React.FC<CommentsProps> = ({ issueNumber }) => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Safety check for required environment variables
    if (!GITHUB_CONFIG.owner || !GITHUB_CONFIG.repo) {
      console.error('GitHub owner or repo not configured properly');
      return;
    }

    // Remove any existing script
    const oldScript = document.getElementById('utterances-script');
    if (oldScript) {
      oldScript.remove();
    }

    // Create script element for utterances
    const script = document.createElement('script');
    script.id = 'utterances-script';
    // Use the official utterances client script
    script.src = 'https://utteranc.es/client.js';
    script.async = true;
    // Link comments to the specified GitHub repository
    script.setAttribute('repo', `${GITHUB_CONFIG.owner}/${GITHUB_CONFIG.repo}`);
    // Use issue-number mapping to tie comments to specific posts
    script.setAttribute('issue-number', issueNumber.toString());
    // Use dark theme to match site theme
    script.setAttribute('theme', 'github-dark');
    // Security: Use CORS protection
    script.setAttribute('crossorigin', 'anonymous');

    // Add script to container
    if (containerRef.current) {
      containerRef.current.appendChild(script);
    }

    return () => {
      if (oldScript) {
        oldScript.remove();
      }
    };
  }, [issueNumber]);

  return (
    <div className="mt-10 pt-10 border-t border-gray-700">
      <h2 className="text-2xl font-bold text-white mb-6">Comments</h2>
      <div ref={containerRef} className="utterances-comments"></div>
    </div>
  );
};

export default Comments;
