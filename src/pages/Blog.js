import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Main from '../layouts/Main';

// Import Markdown files dynamically from the `blogs` directory
const importAll = (r) => r.keys().map((file) => file.replace('./', '').replace('.md', ''));

const BlogList = () => {
  const [files, setFiles] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    // Dynamically load filenames from the `blogs` directory
    const fetchedFiles = importAll(require.context('../data/blogs', false, /\.md$/));
    setFiles(fetchedFiles);
  }, []);

  return (
    <Main title="Blog" description="List of blog posts">
      <article className="post">
        <header>
          <div className="title">
            <h2>Blog Posts</h2>
          </div>
        </header>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px' }}>
          {files.map((file) => (
            <button
              key={file}
              type="button"
              onClick={() => navigate(`/blog/${file}`)}
              style={{
                padding: '1px 20px',
                cursor: 'pointer',
                borderRadius: '5px',
                border: '1px solid #ccc',
                backgroundColor: '#f7f7f7',
              }}
            >
              {file}
            </button>
          ))}
        </div>
      </article>
    </Main>
  );
};

export default BlogList;
