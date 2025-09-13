import { useQuery } from '@tanstack/react-query';
import { fetchProjects } from '../../api/projects/projectsApi';
import { Project, ProjectsResponse } from '../../types/projects';

export const useProjectsData = () => {
  return useQuery<ProjectsResponse, Error, Project[]>({
    queryKey: ['projects'],
    queryFn: fetchProjects,
    staleTime: 1000 * 60 * 5, // 5 minutes
    select: (data: ProjectsResponse) => data.data,
  });
};
