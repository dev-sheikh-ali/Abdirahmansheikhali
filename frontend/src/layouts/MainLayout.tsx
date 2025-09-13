import { FC, ReactNode } from 'react';

interface MainLayoutProps {
  children: ReactNode;
  isHero?: boolean;
}

const MainLayout: FC<MainLayoutProps> = ({ children, isHero = false }) => {
  return (
    <main className={`min-h-screen bg-black text-white flex flex-col ${
      isHero ? 'pt-0' : 'pt-4 md:pt-6'
    }`}>
      {children}
    </main>
  );
};

export default MainLayout;
