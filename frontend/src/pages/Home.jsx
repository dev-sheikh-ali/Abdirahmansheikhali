
import Hero from '../components/home/Hero';
import Skills from '../components/home/Skills';
import Expertise from '../components/home/Expertise';
import CommunityImpact from '../components/home/CommunityImpact';

export default function Home() {
  return (
    <>
      <Hero hero={{}} />
      <Skills skills={[]} />
      <Expertise expertise={[]} />
      <CommunityImpact community={[]} />
    </>
  );
}
