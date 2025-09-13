import { FC, useState, useMemo, useCallback } from 'react';
import { useProjectsData } from '../../hooks/projects/useProjectsData';
import ProjectCard from './ProjectCard';
import ProjectSkeleton from './ProjectSkeleton';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import '../../styles/projects.css';

const ProjectsContainer: FC = () => {
  const { data: projects, isLoading, isError, error } = useProjectsData();
  const [currentPage, setCurrentPage] = useState(1);
  const projectsPerPage = 9; // Show 9 projects per page (3 rows of 3 on large screens)
  
  // Always compute these values regardless of the loading/error state
  const sortedProjects = useMemo(() => {
    if (!projects || projects.length === 0) return [];
    
    return [...projects].sort((a, b) => {
      if (a.order !== null && b.order !== null) {
        return a.order - b.order;
      }
      return a.id - b.id;
    });
  }, [projects]);
  
  const totalPages = useMemo(() => {
    return Math.ceil((sortedProjects.length || 0) / projectsPerPage);
  }, [sortedProjects, projectsPerPage]);
  
  const paginatedProjects = useMemo(() => {
    const indexOfLastProject = currentPage * projectsPerPage;
    const indexOfFirstProject = indexOfLastProject - projectsPerPage;
    return sortedProjects.slice(indexOfFirstProject, indexOfLastProject);
  }, [sortedProjects, currentPage, projectsPerPage]);
  
  // Handle page changes
  const goToPage = useCallback((pageNumber: number) => {
    if (pageNumber > 0 && pageNumber <= totalPages) {
      setCurrentPage(pageNumber);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }, [totalPages]);
  
  // Render pagination controls directly
  const renderPaginationControls = useCallback(() => {
    // Always render pagination for demonstration, even with one page
    // Remove this condition to fix the issue: if (totalPages <= 1) return null;
    
    return (
      <div className="pagination-container mt-12 mb-4">
        <div className="pagination-wrapper">
          <button 
            onClick={() => goToPage(currentPage - 1)}
            disabled={currentPage === 1}
            className={`pagination-arrow ${
              currentPage === 1 
                ? 'disabled' 
                : 'active'
            }`}
            aria-label="Previous page"
          >
            <FaChevronLeft />
          </button>
          
          {/* Page numbers */}
          {[...Array(totalPages || 1)].map((_, index) => (
            <button
              key={index}
              onClick={() => goToPage(index + 1)}
              className={`pagination-number ${
                currentPage === index + 1
                  ? 'active'
                  : ''
              }`}
              aria-label={`Go to page ${index + 1}`}
            >
              {index + 1}
            </button>
          ))}
          
          <button 
            onClick={() => goToPage(currentPage + 1)}
            disabled={currentPage === totalPages}
            className={`pagination-arrow ${
              currentPage === totalPages 
                ? 'disabled' 
                : 'active'
            }`}
            aria-label="Next page"
          >
            <FaChevronRight />
          </button>
        </div>
      </div>
    );
  }, [currentPage, totalPages, goToPage]);

  // Show loading skeletons
  if (isLoading) {
    return (
      <section className="bg-black w-full">
        <div className="container mx-auto py-1 px-4 sm:px-6">
          <div className="text-center mb-2">
            <h1 className="text-3xl md:text-5xl font-bold text-white mb-1">My Projects</h1>
            <p className="text-gray-400 max-w-3xl mx-auto text-lg mb-2">
              Loading my portfolio projects...
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {Array.from({ length: 6 }).map((_, index) => (
              <ProjectSkeleton key={index} />
            ))}
          </div>
        </div>
      </section>
    );
  }

  // Show error state
  if (isError) {
    return (
      <section className="bg-black w-full">
        <div className="container mx-auto py-1 px-4 sm:px-6">
          <div className="text-center mb-2">
            <h1 className="text-3xl md:text-5xl font-bold text-white mb-1">My Projects</h1>
          </div>
          <div className="bg-red-900/30 border border-red-500 rounded-md p-3 mx-auto max-w-lg">
            <h2 className="text-xl font-semibold text-red-300 mb-1">Oops! Something went wrong</h2>
            <p className="text-white">
              {error instanceof Error ? error.message : 'Failed to load projects. Please try again later.'}
            </p>
          </div>
        </div>
      </section>
    );
  }

  // No projects found
  if (!projects || projects.length === 0) {
    return (
      <section className="bg-black w-full">
        <div className="container mx-auto py-1 px-4 sm:px-6">
          <div className="text-center mb-2">
            <h1 className="text-3xl md:text-5xl font-bold text-white mb-1">My Projects</h1>
          </div>
          <p className="text-center text-gray-400 text-lg">No projects found.</p>
        </div>
      </section>
    );
  }

  // Show projects
  return (
    <section className="bg-black w-full">
      <div className="container mx-auto py-1 px-4 sm:px-6">
        <div className="text-center mb-2">
          <h1 className="text-3xl md:text-5xl font-bold text-white mb-1">My Projects</h1>
          <p className="text-gray-400 max-w-3xl mx-auto text-lg mb-2">
            Explore my portfolio of projects showcasing my skills in web development and software engineering.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {paginatedProjects.map((project) => (
            <div key={project.id} className="h-full">
              <ProjectCard project={project} />
            </div>
          ))}
        </div>
        
        {/* Render pagination controls at the end of the page */}
        <div className="mt-16 mb-8">
          {renderPaginationControls()}
        </div>
      </div>
    </section>
  );
};

export default ProjectsContainer;