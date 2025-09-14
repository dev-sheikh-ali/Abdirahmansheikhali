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
import { FaArrowRight } from 'react-icons/fa';
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
  <div className="flex flex-col md:flex-row bg-zinc-900/80 border border-zinc-800 rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition duration-300 min-h-[180px] md:min-h-[220px] w-full">
      {/* Image section */}
      {image && (
        <Link to={`/blog/${slug}`} className="flex-shrink-0 w-full md:w-80 h-48 md:h-auto bg-zinc-100 dark:bg-zinc-800 flex items-center justify-center">
          <img
            src={image}
            alt={post.title}
            className="object-cover w-full h-full"
          />
        </Link>
      )}
      {/* Content section */}
      <div className="flex flex-col justify-between p-4 md:p-6 flex-1">
        <div>
          {/* Categories */}
          {post.labels.length > 0 && (
            <div className="flex flex-wrap gap-2 mb-2">
              {post.labels
                .filter(label => !['type:post', 'state:published', 'state:draft'].includes(label.name))
                .map(label => (
                  <Link
                    key={label.id}
                    to={`/blog?category=${label.name}`}
                    className="text-xs px-3 py-1 rounded-full bg-violet-100 text-violet-700 dark:bg-violet-900 dark:text-violet-200 font-semibold"
                  >
                    {label.name}
                  </Link>
                ))}
            </div>
          )}
          {/* Title */}
          <h3 className="text-2xl font-bold text-white mb-2">
            <Link to={`/blog/${slug}`}>{post.title}</Link>
          </h3>
          {/* Excerpt */}
          <p className="text-white mb-4 text-base">
            {excerpt}
          </p>
        </div>
        <div className="flex items-center justify-between mt-4">
          {/* Author and date with avatar */}
          <div className="flex items-center gap-2 text-sm text-zinc-300">
            {post.user.avatar_url && (
              <img src={post.user.avatar_url} alt={post.user.login} className="w-7 h-7 rounded-full border border-zinc-700" />
            )}
            <span className="font-medium">{post.user.name || post.user.login}</span>
            <span className="mx-2">•</span>
            <span>{formattedDate}</span>
          </div>
          {/* Read more button */}
          <Link
            to={`/blog/${slug}`}
            className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-700 font-semibold transition-colors duration-200 px-2 py-1 rounded focus:outline-none focus:underline"
          >
            Learn More <FaArrowRight className="ml-1" />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default BlogCard;
