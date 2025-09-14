/**
 * BlogCard Component
 * 
 * Displays a preview card for a single blog post with:
 * - Featured image (extracted from frontmatter or content)
 * - Title
 * - Publication date
 * - Short excerpt of content
 * - Link to full post
 */
import { Link } from 'react-router-dom';
import { format } from 'date-fns';
import { BlogPost } from '../../types/blog';

interface BlogCardProps {
  post: BlogPost;  // Blog post data to display
}

const BlogCard: React.FC<BlogCardProps> = ({ post }) => {
  // Use custom slug from frontmatter if available, otherwise use issue number
  const slug = post.frontmatter?.slug || post.number.toString();
  
  /**
   * Extracts a featured image URL from the blog post
   * Prioritizes:
   * 1. Image URL specified in frontmatter
   * 2. First image found in the markdown content
   * 
   * @returns {string|null} Image URL or null if no image found
   */
  const getImage = () => {
    // First check frontmatter for explicitly defined image
    if (post.frontmatter?.image) {
      return post.frontmatter.image;
    }
    
    // Otherwise find the first image in the markdown content
    const imageRegex = /!\[.*?\]\((.*?)\)/;
    const match = post.body.match(imageRegex);
    return match ? match[1] : null;
  };
  
  /**
   * Creates a clean, plain-text excerpt from markdown content
   * 
   * @param {string} content - Markdown content to process
   * @param {number} maxLength - Maximum excerpt length
   * @returns {string} Formatted excerpt with ellipsis if truncated
   */
  const createExcerpt = (content: string, maxLength = 120) => {
    // Remove frontmatter section
    let cleanContent = content.replace(/^---\n[\s\S]*?\n---/, '');
    
    // Remove image markdown
    cleanContent = cleanContent.replace(/!\[.*?\]\(.*?\)/g, '');
    
    // Remove Markdown formatting for readability
    cleanContent = cleanContent
      .replace(/\[([^\]]+)\]\(([^)]+)\)/g, '$1') // Convert links to text
      .replace(/[#*_~`]/g, '') // Remove headers and formatting characters
      .replace(/\n+/g, ' ') // Convert newlines to spaces
      .trim();
    
    return cleanContent.length > maxLength 
      ? cleanContent.slice(0, maxLength) + '...' 
      : cleanContent;
  };
  
  const image = getImage();
  const excerpt = post.frontmatter?.summary || createExcerpt(post.body);
  const formattedDate = format(
    new Date(post.frontmatter?.date || post.created_at), 
    'dd MMM yyyy'
  );
  const readingTime = post.frontmatter?.readingTime || `${Math.ceil(post.body.length / 1500)} min read`;
  
  return (
    <div className="bg-zinc-900/50 border border-zinc-800 rounded-lg overflow-hidden hover:border-zinc-700 transition duration-300 flex flex-col h-full">
      {/* Featured image */}
      {image && (
        <Link to={`/blog/${slug}`} className="block overflow-hidden h-48">
          <img 
            src={image} 
            alt={post.title} 
            className="w-full h-full object-cover hover:scale-105 transition duration-500"
          />
        </Link>
      )}
      
      {/* Content */}
      <div className="p-6 flex flex-col flex-grow">
        {/* Date and reading time */}
        <div className="flex items-center text-sm text-gray-400 mb-2">
          <span>{formattedDate}</span>
          <span className="mx-2">•</span>
          <span>{readingTime}</span>
        </div>
        
        {/* Title */}
        <h3 className="text-xl font-semibold text-white mb-2 hover:text-blue-400 transition">
          <Link to={`/blog/${slug}`}>
            {post.title}
          </Link>
        </h3>
        
        {/* Categories */}
        {post.labels.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-4">
            {post.labels
              .filter(label => !['type:post', 'state:published', 'state:draft'].includes(label.name))
              .map(label => (
                <Link 
                  key={label.id}
                  to={`/blog?category=${label.name}`}
                  className="text-xs px-2 py-1 rounded-md"
                  style={{ 
                    backgroundColor: `#${label.color}20`, 
                    color: `#${label.color}` 
                  }}
                >
                  {label.name}
                </Link>
              ))
            }
          </div>
        )}
        
        {/* Excerpt */}
        <p className="text-gray-300 mb-4 flex-grow">
          {excerpt}
        </p>
        
        {/* Read more link */}
        <Link 
          to={`/blog/${slug}`}
          className="text-blue-400 hover:text-blue-300 font-medium inline-flex items-center group"
        >
          Read more
          <svg 
            className="w-4 h-4 ml-1 transition-transform group-hover:translate-x-1" 
            fill="none" 
            viewBox="0 0 24 24" 
            stroke="currentColor"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </Link>
      </div>
    </div>
  );
};

export default BlogCard;
