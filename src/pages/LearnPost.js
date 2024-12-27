import React, { useState, useEffect, useRef } from 'react';
import 'highlight.js/styles/atom-one-dark.css'; // Import the highlight.js theme first
import hljs from 'highlight.js'; // Import highlight.js
import { useParams } from 'react-router-dom';
import Markdown from 'markdown-to-jsx';
import Main from '../layouts/Main';

const LearnPost = () => {
  const { filename } = useParams(); // Get the filename from the URL
  const [markdown, setMarkdown] = useState('');
  const markdownRef = useRef(null);

  useEffect(() => {
    const fetchMarkdown = async () => {
      try {
        const res = await import(`../data/learn/${filename}.md`); // Dynamically import the markdown file
        const response = await fetch(res.default); // Fetch the markdown file
        const text = await response.text(); // Get text from the response
        setMarkdown(text); // Set the markdown content
      } catch (err) {
        console.error('Failed to load Markdown file:', err); // Log error if markdown fails to load
      }
    };

    fetchMarkdown();
  }, [filename]); // Re-run effect when filename changes

  useEffect(() => {
    // Highlight code blocks after the markdown content is rendered
    if (markdownRef.current) {
      const codeBlocks = markdownRef.current.querySelectorAll('pre code');
      codeBlocks.forEach((block) => {
        hljs.highlightElement(block); // Apply syntax highlighting to each code block
      });
    }
  }, [markdown]); // Re-run after markdown content is updated

  return (
    <Main title={filename} description={`Learn post: ${filename}`}>
      <article className="post markdown">
        <header>
          <div className="title">
            <h2>{filename}</h2>
          </div>
        </header>
        <div ref={markdownRef}>
          <Markdown>{markdown}</Markdown> {/* Render the markdown content */}
        </div>
      </article>
    </Main>
  );
};

export default LearnPost;
