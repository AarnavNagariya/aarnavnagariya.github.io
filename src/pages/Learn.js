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

  // Function to determine button color based on filename
  const getButtonColor = (file) => {
    if (file.startsWith('[OOPS]')) {
      return '#d3f9d8'; // Very light green
    } if (file.startsWith('[ALGORITHM]')) {
      return '#d3f9ff'; // Very light blue
    } if (file.startsWith('[GRAPHS]')) {
      return '#f9d3ff'; // Very light purple
    } if (file.startsWith('[STANDARD]')) {
      return '#f9d3d3'; // Very light red
    }
    return '#f7f7f7'; // Default color
  };

  return (
    <Main title="Learn" description="List of Learning posts">
      <article className="post">
        <header>
          <div className="title">
            <h2>Learn</h2>
            <p>Here are Your Learning Notes</p>
            <p>These are made/compiled from various sources for credits/references, Feel free to <a href="/Personal-Website/contact">contact</a>.</p>
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
                borderRadius: '3px',
                border: '1px solid #ccc',
                backgroundColor: getButtonColor(file), // Set the background color based on filename
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
