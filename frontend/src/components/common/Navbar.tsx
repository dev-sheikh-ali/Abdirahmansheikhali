import { useState } from 'react';

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  
  return (
    <nav className="bg-black border-b border-neutral-800 sticky top-0 z-50 w-full">
      <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto px-4 py-3">
        <a href="/" className="flex items-center space-x-4 rtl:space-x-reverse select-none">
          <img src="/assets/logo.png" className="h-16 w-16 rounded-full hover:scale-105 transition-transform" alt="Logo" />
          <span className="self-center text-2xl lg:text-3xl font-semibold whitespace-nowrap text-white">Abdirahman Sheikh</span>
        </a>
        <button
          type="button"
          className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-white rounded-lg md:hidden hover:bg-blue-600/20 focus:outline-none focus:ring-2 focus:ring-blue-500"
          aria-controls="navbar-default"
          aria-expanded={menuOpen ? 'true' : 'false'}
          onClick={() => setMenuOpen((open) => !open)}
        >
          <span className="sr-only">Open main menu</span>
          <svg className="w-5 h-5" aria-hidden="true" fill="none" viewBox="0 0 17 14">
            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 1h15M1 7h15M1 13h15" />
          </svg>
        </button>
        <div className={`${menuOpen ? '' : 'hidden'} w-full md:block md:w-auto`} id="navbar-default">
          <ul className="flex flex-col md:flex-row md:space-x-8 font-semibold text-white text-base md:mt-0 mt-4 md:justify-end md:items-center">
            <li>
              <a href="/" className="block py-2 px-3 hover:text-blue-400 transition-colors md:p-0">Home</a>
            </li>
            <li>
              <a href="/projects" className="block py-2 px-3 hover:text-blue-400 transition-colors md:p-0">Projects</a>
            </li>
            <li>
              <a href="/blog" className="block py-2 px-3 hover:text-blue-400 transition-colors md:p-0">Blog</a>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}
