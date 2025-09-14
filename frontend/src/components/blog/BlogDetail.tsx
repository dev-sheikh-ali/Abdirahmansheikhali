// BlogDetail.tsx with true two-column layout + collapsible TOC
import { useParams, Link, useNavigate } from 'react-router-dom';
import { format } from 'date-fns';
import { useBlogPostData } from '../../hooks/blog/useBlogPostData';
import MarkdownRenderer from '../../utils/markdownRenderer';
import Comments from './Comments';
import TableOfContents from './TableOfContents';
import { useEffect, useState } from 'react';
import '../../styles/blog-toc.css';

const BlogDetail = () => {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();

  const { data: post, isLoading, isError } = useBlogPostData(slug || '');
  const [tocOpen, setTocOpen] = useState(true);

  useEffect(() => {
    if (isError || (!isLoading && !post)) {
      navigate('/error', { state: { statusCode: 404 } });
    }
  }, [isError, post, isLoading, navigate]);

  useEffect(() => {
    if (post) {
      document.title = `${post.title} | Abdirahman Sheikh Ali`;
    } else {
      document.title = 'Blog Post | Abdirahman Sheikh Ali';
    }
  }, [post]);

  if (isLoading) {
    return (
      <div className="min-h-[60vh] flex justify-center items-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (isError || !post) {
    return (
      <div className="min-h-[60vh] flex justify-center items-center">
        <div className="bg-red-900/20 border border-red-500/50 rounded-lg p-6 max-w-lg mx-auto">
          <h2 className="text-xl font-semibold text-red-400 mb-2">Blog post not found</h2>
          <p className="text-gray-300 mb-4">
            The blog post you're looking for doesn't exist or couldn't be loaded.
          </p>
          <Link to="/blog" className="px-4 py-2 bg-blue-600 text-white rounded-md inline-block hover:bg-blue-700">
            Back to blog
          </Link>
        </div>
      </div>
    );
  }

  const formattedDate = format(
    new Date(post.frontmatter?.date || post.created_at),
    'MMMM dd, yyyy'
  );

  const getImage = () => {
    if (post.frontmatter?.image) return post.frontmatter.image;
    const imageRegex = /!\[.*?\]\((.*?)\)/;
    const match = post.body.match(imageRegex);
    return match ? match[1] : null;
  };

  const coverImage = getImage();

  return (
    <main className="blog-fullwidth w-full max-w-7xl mx-auto py-8 px-2 md:px-8">
      {/* Back link */}
      <Link to="/blog" className="flex items-center text-blue-400 hover:text-blue-300 mb-8 group">
        <svg
          className="w-4 h-4 mr-1 transition-transform group-hover:-translate-x-1"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
        </svg>
        Back to all posts
      </Link>

      {/* Header Section */}
      <header className="mb-12">
        {coverImage && (
          <div className="w-full h-72 md:h-96 mb-8 rounded-lg overflow-hidden">
            <img
              src={coverImage}
              alt={post.title}
              className="w-full h-full object-cover object-center"
            />
          </div>
        )}

        <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">{post.title}</h1>

        <div className="flex flex-wrap items-center gap-4 text-gray-400 border-b border-zinc-800 pb-4">
          <div className="flex items-center gap-2">
            <img
              src={post.user.avatar_url}
              alt={post.user.login}
              className="w-8 h-8 rounded-full border border-zinc-800"
            />
            <span className="font-medium text-base text-white">
              {post.user.name || post.user.login}
            </span>
          </div>
          <span className="hidden md:inline">•</span>
          <time dateTime={post.created_at}>{formattedDate}</time>
          <span className="hidden md:inline">•</span>
          <span>
            {post.frontmatter?.readingTime ||
              `${Math.ceil(post.body.length / 1500)} min read`}
          </span>
        </div>
      </header>

      {/* Main Content + TOC Grid */}
      <section className="lg:grid lg:grid-cols-[1fr_320px] lg:gap-8 relative">
        {/* Blog Content */}
        <div>
          <article className="prose prose-invert !max-w-none">
            <MarkdownRenderer content={post.body} />
          </article>
        </div>

        {/* TOC Sidebar - Only on large screens */}
        <aside className="hidden lg:block">
          <div className="bg-zinc-900/40 border border-zinc-800 rounded-lg p-4 sticky top-28">
            <h2
              className="text-sm font-semibold text-gray-400 uppercase tracking-wide mb-3 cursor-pointer select-none flex items-center"
              onClick={() => setTocOpen((v) => !v)}
            >
              Table of Contents
              <span className="ml-2 text-xs">{tocOpen ? '▼' : '▲'}</span>
            </h2>
            {tocOpen && <TableOfContents content={post.body} />}
          </div>
        </aside>
      </section>

      {/* Footer Section */}
      <footer className="mt-12 pt-8 border-t border-zinc-800">
        <a
          href={post.html_url}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center px-4 py-2 bg-gray-800 hover:bg-gray-700 text-white rounded-md transition-colors"
        >
          Discuss on GitHub
        </a>
        <Comments issueNumber={post.number} />
      </footer>
    </main>
  );
};

export default BlogDetail;
