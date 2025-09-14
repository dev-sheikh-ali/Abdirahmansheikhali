import BlogList from "../components/blog/BlogList";

export default function Blog() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold text-white text-center mb-8">Blog</h1>
      <BlogList />
    </div>
  );
}
