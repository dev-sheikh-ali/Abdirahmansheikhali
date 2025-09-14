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
    <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
      {posts.posts.map(post => (
        <BlogCard key={post.id} post={post} />
      ))}
    </div>
  );
};

export default BlogList;
