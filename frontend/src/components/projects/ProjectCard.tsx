import { FC } from 'react';
import { Project } from '../../types/projects';
import { FaGithub } from 'react-icons/fa';
import { BiLinkExternal } from 'react-icons/bi';
import '../../styles/projects.css';

interface ProjectCardProps {
  project: Project;
}

const ProjectCard: FC<ProjectCardProps> = ({ project }) => {
  // URL is now already transformed in the API layer
  const thumbnailUrl = project.Thumbnail ? project.Thumbnail.url : '';
  
  return (
    <div className="project-card group bg-gray-900 rounded-lg overflow-hidden flex flex-col">
      <div className="relative overflow-hidden h-52">
        <img 
          src={thumbnailUrl} 
          alt={project.Title} 
          className="project-image w-full h-full object-cover"
        />
      </div>
      
      <div className="p-5 flex flex-col flex-grow">
        <h3 className="text-xl font-semibold text-white mb-2">
          {project.Title}
        </h3>
        
        {/* Tech stack after title */}
        {project.techStack && project.techStack.length > 0 && (
          <div className="mb-3">
            <div className="flex flex-wrap gap-1">
              {project.techStack.map((tech) => (
                <div key={tech.id} className="flex items-center bg-gray-800 px-1 py-0.5 rounded text-xs text-gray-200">
                  {tech.icon && (
                    <img 
                      src={tech.icon} 
                      alt={tech.name} 
                      className="w-3 h-3 mr-1" 
                    />
                  )}
                  {tech.name}
                </div>
              ))}
            </div>
          </div>
        )}
        
        <p className="text-gray-300 mb-4 flex-grow">
          {project.description}
        </p>
        
        {/* Dividing line */}
        <div className="border-t border-gray-700 my-3"></div>
        
        {/* Link icons at the bottom */}
        <div className="flex items-center gap-4">
          {project.GitHubLink && (
            <a 
              href={project.GitHubLink}
              title="GitHub Repository"
              target="_blank"
              rel="noopener noreferrer"
              className="project-icon-link"
            >
              <FaGithub className="text-2xl hover:text-purple-500 transition-colors" />
            </a>
          )}
          
          {project.LiveLink && (
            <a 
              href={project.LiveLink}
              title="Live Demo"
              target="_blank"
              rel="noopener noreferrer"
              className="project-icon-link"
            >
              <BiLinkExternal className="text-2xl hover:text-purple-500 transition-colors" />
            </a>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProjectCard;