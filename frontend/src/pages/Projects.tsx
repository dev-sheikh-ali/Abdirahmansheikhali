import { FC, useEffect } from 'react';
import MainLayout from '../layouts/MainLayout';
import ProjectsContainer from '../components/projects';
import '../styles/projects.css';

const Projects: FC = () => {
  useEffect(() => {
    document.title = "Projects | Abdirahman Sheikh Ali";
    window.scrollTo(0, 0);
  }, []);

  return (
    <MainLayout>
      <ProjectsContainer />
    </MainLayout>
  );
};

export default Projects;
