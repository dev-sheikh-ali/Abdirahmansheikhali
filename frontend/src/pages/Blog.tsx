
import SEO from '../components/common/SEO';
import BlogList from "../components/blog/BlogList";

export default function Blog() {
  return (
    <>
      <SEO
        title="Blog | Abdirahman Sheikh Ali"
        description="Insights on AI, IoT, software development, child safety, and more. Explore Abdirahman Sheikh Ali's blog for tech, advocacy, and personal growth."
        image="/assets/preview.jpg"
        url="https://abdirahmansheikhali.com/blog"
      />
      {/* Intro Section */}
      <div className="w-full max-w-4xl text-center mx-auto mt-8 mb-8 px-4">
        <h1 className="text-3xl md:text-5xl font-bold text-white mb-6">
          My Blog
        </h1>
        <p className="text-gray-400 max-w-3xl mx-auto text-lg mt-2 mb-2">
          Welcome to my corner of the internet where I share insights on{' '}
          <span className="text-blue-400">Artificial Intelligence</span>,{' '}
          <span className="text-green-400">Internet of Things</span>,{' '}
          <span className="text-purple-400">software development</span>, and the{' '}
          <span className="text-pink-400">human side of technology</span>.<br className="hidden md:block" />
          You’ll also find{' '}
          <span className="text-yellow-400">child safety reports</span>, personal reflections on{' '}
          <span className="text-orange-400">lifestyle and growth</span>, and stories from my journey building solutions that matter.
        </p>
      </div>
      {/* Blog List in original container layout */}
      <div className="container mx-auto px-4 py-8">
        <BlogList />
      </div>
    </>
  );
}
