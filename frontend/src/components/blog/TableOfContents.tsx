/**
 * TableOfContents Component
 * 
 * This component automatically generates a table of contents from headings (h2, h3, h4)
 * in markdown content. It provides clickable links to navigate to different sections.
 */
import React, { useEffect, useState } from 'react';

interface Heading {
  id: string;
  text: string;
  level: number;
}

interface TableOfContentsProps {
  content: string;
}

const TableOfContents: React.FC<TableOfContentsProps> = ({ content }) => {
  const [headings, setHeadings] = useState<Heading[]>([]);

  useEffect(() => {
    // Extract headings from markdown content
    const headingRegex = /^(#{2,4})\s+(.+)$/gm;
    const matches = Array.from(content.matchAll(headingRegex));
    
    const extractedHeadings = matches.map((match) => {
      const level = match[1].length; // ## = 2, ### = 3, #### = 4
      const text = match[2].trim();
      // Create slug similar to how rehype-slug does it
      const id = text
        .toLowerCase()
        .replace(/[^\w\s]/g, '')
        .replace(/\s+/g, '-');
      
      return { id, text, level };
    });
    
    setHeadings(extractedHeadings);
  }, [content]);

  if (headings.length === 0) {
    return null;
  }

  return (
    <nav className="text-gray-300">
      <ul className="space-y-1">
        {headings.map((heading, index) => (
          <li
            key={index}
            style={{ paddingLeft: `${(heading.level - 2) * 1.25}rem` }}
            className={
              heading.level === 2
                ? 'font-bold text-white text-base'
                : heading.level === 3
                ? 'font-normal text-gray-200 text-sm'
                : 'font-light text-gray-400 text-sm'
            }
          >
            <a
              href={`#${heading.id}`}
              className="block py-1 hover:text-blue-400 transition-colors"
            >
              {heading.text}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default TableOfContents;
