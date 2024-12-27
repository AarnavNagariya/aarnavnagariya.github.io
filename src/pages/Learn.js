import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Main from '../layouts/Main';

// Import Markdown files dynamically from the `blogs` directory
const importAll = (r) => r.keys().map((file) => file.replace('./', '').replace('.md', ''));

const Learn = () => {
  const [files, setFiles] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    // Dynamically load filenames from the `blogs` directory
    const fetchedFiles = importAll(require.context('../data/learn', false, /\.md$/));
    setFiles(fetchedFiles);
  }, []);

  return (
    <Main title="Learn" description="List of Learning posts">
      <article className="post">
        <header>
          <div className="title">
            <h2>Learn</h2>
            <p>Here are the resources for learning.</p>
            <p>These are made from various sources for credits/references feel free to contact.</p>
          </div>
        </header>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px' }}>
          {files.map((file) => (
            <button
              key={file}
              type="button"
              onClick={() => navigate(`/learn/${file}`)}
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

export default Learn;
