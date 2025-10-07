
import SEO from '../components/common/SEO';
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
    <>
      <SEO
        title="Projects | Abdirahman Sheikh Ali"
        description="Explore innovative software engineering and advocacy projects by Abdirahman Sheikh Ali. Focused on AI, IoT, and child safety."
        image="/assets/preview.jpg"
        url="https://abdirahmansheikhali.com/projects"
      />
      <MainLayout>
        <ProjectsContainer />
      </MainLayout>
    </>
  );
};

export default Projects;
