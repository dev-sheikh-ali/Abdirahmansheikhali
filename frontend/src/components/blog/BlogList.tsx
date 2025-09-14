import { Link } from 'react-router-dom';
import { useBlogListData } from '../../hooks/blog/useBlogListData';
import BlogCard from './BlogCard';

const BlogList = () => {
  const { data: posts, isLoading, isError } = useBlogListData();

  if (isLoading) {
    return <div className="text-center text-white py-16">Loading...</div>;
  }
  if (isError || !posts) {
    return <div className="text-center text-red-400 py-16">Failed to load blog posts.</div>;
  }

  if (posts.posts.length === 0) {
    return <div className="text-center text-gray-400 py-16">No blog posts found.</div>;
  }

  return (
    <div className="flex flex-col gap-8 items-center w-full px-0">
      {posts.posts.map(post => (
  <div className="w-full max-w-7xl mx-auto">
          <BlogCard key={post.id} post={post} />
        </div>
      ))}
    </div>
  );
};

export default BlogList;
