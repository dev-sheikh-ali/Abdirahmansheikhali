import { AxiosError } from 'axios';
import cmsClient from '../../lib/cmsClient';
import { Project, ProjectsResponse } from '../../types/projects';

// Transform projects data to include full URLs for thumbnails
const transformProjectThumbnails = (projects: Project[]): Project[] => {
  return projects.map(project => {
    // Make sure Thumbnail exists and has a URL
    if (project.Thumbnail && project.Thumbnail.url) {
      const baseUrl = import.meta.env.VITE_STRAPI_URL || 'http://localhost:1337';
      
      // If URL is not absolute, add the base URL
      if (!project.Thumbnail.url.startsWith('http')) {
        project.Thumbnail.url = `${baseUrl}${project.Thumbnail.url}`;
      }
      
      // Transform format URLs if they exist
      if (project.Thumbnail.formats) {
        Object.keys(project.Thumbnail.formats).forEach(format => {
          const formatObj = project.Thumbnail.formats[format];
          if (formatObj && formatObj.url && !formatObj.url.startsWith('http')) {
            formatObj.url = `${baseUrl}${formatObj.url}`;
          }
        });
      }
    }
    
    return project;
  });
};

export const fetchProjects = async (): Promise<ProjectsResponse> => {
  try {
    const response = await cmsClient.get('/projects?populate=*');
    
    if (!response.data) {
      throw new Error('Projects data not found in response');
    }
    
    // Transform the project data to include full thumbnail URLs
    if (response.data.data) {
      response.data.data = transformProjectThumbnails(response.data.data);
    }
    
    return response.data;
  } catch (error) {
    console.error('Projects fetch error:', error);
    if (error instanceof AxiosError) {
      throw new Error(error.response?.data?.error?.message || 'Failed to fetch projects data');
    }
    throw error;
  }
};