
import { useState } from 'react';
import { useBlogListData } from '../../hooks/blog/useBlogListData';
import BlogCard from './BlogCard';
import Pagination, { PaginationSeparator } from './Pagination';


const POSTS_PER_PAGE = 9;

const BlogList = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const { data: posts, isLoading, isError } = useBlogListData(currentPage, POSTS_PER_PAGE);

  if (isLoading) {
    return <div className="text-center text-white py-16">Loading...</div>;
  }
  if (isError || !posts) {
    return <div className="text-center text-red-400 py-16">Failed to load blog posts.</div>;
  }

  if (posts.posts.length === 0) {
    return <div className="text-center text-gray-400 py-16">No blog posts found.</div>;
  }

  // Calculate total pages (fallback to 1 if not available)
  const totalPages = posts.totalCount
    ? Math.ceil(posts.totalCount / POSTS_PER_PAGE)
    : (posts.hasNextPage ? currentPage + 1 : currentPage);

  return (
    <section className="bg-black w-full">
      <div className="container mx-auto py-1 px-4 sm:px-6">
        <div className="flex flex-col gap-8 items-center w-full px-0">
          {posts.posts.map(post => (
            <BlogCard key={post.id} post={post} />
          ))}
        </div>
        {/* Pagination at the end, styled like Projects (separator now inside Pagination) */}
        <div className="mt-32 mb-8 text-center">
          <PaginationSeparator />
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={setCurrentPage}
            showEvenIfOnePage={true}
          />
        </div>
      </div>
    </section>
  );
};

export default BlogList;
