import React from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import rehypeRaw from 'rehype-raw';
import rehypeSlug from 'rehype-slug';
import rehypeAutolinkHeadings from 'rehype-autolink-headings';
import { Components } from 'react-markdown';

interface MarkdownRendererProps {
  content: string;
}

const MarkdownRenderer: React.FC<MarkdownRendererProps> = ({ content }) => {
  // Remove frontmatter from content before rendering
  const contentWithoutFrontmatter = content.replace(/^---\n[\s\S]*?\n---/, '');

  const components: Components = {
    // Code blocks will use monospace and basic styling
    code({ className, children, ...props }) {
      const match = /language-(\w+)/.exec(className || '');
      return match ? (
        <pre className="bg-gray-800 rounded-md p-4 my-4 overflow-x-auto">
          <code className={className} {...props}>
            {children}
          </code>
        </pre>
      ) : (
        <code className="bg-gray-800 px-1 rounded" {...props}>
          {children}
        </code>
      );
    },
    // Links with custom styling and security attributes
    a({ children, href, ...props }) {
      return (
        <a
          className="text-blue-400 hover:text-blue-300 transition-colors"
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          {...props}
        >
          {children}
        </a>
      );
    },
    // Images with custom styling
    img(props) {
      return (
        <img 
          className="rounded-lg shadow-md mx-auto my-4 max-w-full h-auto" 
          loading="lazy"
          alt={props.alt || ''}
          {...props} 
        />
      );
    },
    // Headings with custom styling
    h1(props) {
      return <h1 className="text-4xl font-bold mt-8 mb-4" {...props} />;
    },
    h2(props) {
      return <h2 className="text-3xl font-bold mt-8 mb-4" {...props} />;
    },
    h3(props) {
      return <h3 className="text-2xl font-bold mt-6 mb-3" {...props} />;
    },
    h4(props) {
      return <h4 className="text-xl font-bold mt-4 mb-2" {...props} />;
    },
    // Lists with custom styling
    ul(props) {
      return <ul className="list-disc list-inside my-4 space-y-2" {...props} />;
    },
    ol(props) {
      return <ol className="list-decimal list-inside my-4 space-y-2" {...props} />;
    },
    // Blockquotes with custom styling
    blockquote(props) {
      return (
        <blockquote 
          className="border-l-4 border-blue-500 pl-4 my-4 italic bg-blue-500/5 py-2 rounded"
          {...props} 
        />
      );
    },
    // Tables with custom styling
    table(props) {
      return (
        <div className="my-4 overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-700" {...props} />
        </div>
      );
    },
    th(props) {
      return <th className="px-4 py-2 bg-gray-800 font-semibold text-left" {...props} />;
    },
    td(props) {
      return <td className="px-4 py-2 border-t border-gray-700" {...props} />;
    }
  };

  return (
    <div className="prose prose-invert prose-blue max-w-none">
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        rehypePlugins={[
          rehypeRaw,
          rehypeSlug,
          [rehypeAutolinkHeadings, { behavior: 'wrap' }],
        ]}
        components={components}
      >
        {contentWithoutFrontmatter}
      </ReactMarkdown>
    </div>
  );
};

export default MarkdownRenderer;
