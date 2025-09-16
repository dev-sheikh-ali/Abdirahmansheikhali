


// Import the Hero section component for the home page
import { Hero } from '../components/home/hero';
// Import the Skills section component for the home page
import Skills from '../components/home/skills';
// Import the Expertise section component for the home page
import Expertise from '../components/home/expertise';
// Import the Community Impact section component for the home page
import CommunityImpact from '../components/home/communityImpact';

// The Home page is a functional React component that composes all home sections
export default function Home() {
  return (
    <>
      {/* Renders the Hero section at the top of the home page */}
      <Hero />
      {/* Renders the Skills section below the Hero section */}
      <Skills />
      {/* Renders the Expertise section below the Skills section */}
      <Expertise />
      {/* Renders the Community Impact section at the bottom */}
      <CommunityImpact />
    </>
  );
}
