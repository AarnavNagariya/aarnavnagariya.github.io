import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types'; // Import PropTypes for validation
import { useParams } from 'react-router-dom';
import Markdown from 'markdown-to-jsx';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/blur.css';
import Main from '../layouts/Main';

// Define the custom image component outside of BlogPost
const LazyImage = ({ src, alt }) => (
  <LazyLoadImage
    src={src}
    alt={alt}
    effect="blur"
    style={{
      width: '100%',
      height: 'auto',
      borderRadius: '5px',
      boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
    }}
  />
);

// Add prop type validation for LazyImage
LazyImage.propTypes = {
  src: PropTypes.string.isRequired,
  alt: PropTypes.string.isRequired,
};

const BlogPost = () => {
  const { filename } = useParams(); // Get the filename from the URL
  const [markdown, setMarkdown] = useState('');

  useEffect(() => {
    import(`../data/gallery/${filename}.md`)
      .then((res) => fetch(res.default))
      .then((response) => response.text())
      .then(setMarkdown)
      .catch((err) => console.error('Failed to load Markdown file:', err));
  }, [filename]);

  // Custom Markdown options to replace <img> with LazyImage
  const markdownOptions = {
    overrides: {
      img: {
        component: LazyImage, // Use the pre-defined LazyImage component
      },
    },
  };

  return (
    <Main title={filename} description={`Blog post: ${filename}`}>
      <article className="post markdown">
        <header>
          <div className="title">
            <h2>{filename}</h2>
          </div>
        </header>
        {/* Apply custom markdown options */}
        <Markdown options={markdownOptions}>{markdown}</Markdown>
      </article>
    </Main>
  );
};

export default BlogPost;
