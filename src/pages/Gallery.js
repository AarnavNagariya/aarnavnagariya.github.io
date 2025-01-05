import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Main from '../layouts/Main';

// Import Markdown files dynamically from the `blogs` directory
const importAll = (r) => r.keys().map((file) => file.replace('./', '').replace('.md', ''));

const getButtonColor = (file) => {
  if (file.startsWith('Planet of Lana')) {
    return '#d3f9d8'; // Very light green
  } if (file.startsWith('Cyberpunk')) {
    return '#d3f9ff'; // Very light blue
  } if (file.startsWith('Gris')) {
    return '#f9d3ff'; // Very light purple
  } if (file.startsWith('Extras')) {
    return '#f9d3d3'; // Very light red
  } if (file.startsWith('Ghost of Tsushima')) {
    return '#f9f3d3'; // Very light yellow
  } if (file.startsWith('Uncharted')) {
    return '#f9f3d3'; // Very light yellow
  } if (file.startsWith('Hogwarts')) {
    return '#f9f3d3'; // Very light yellow
  } if (file.startsWith('Tekken 8')) {
    return '#f9d3d3'; // Very light red
  } if (file.startsWith('Neva')) {
    return '#f9d3ff'; // Very light purple
  }
  return '#f7f7f7'; // Default color
};

const BlogList = () => {
  const [files, setFiles] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    // Dynamically load filenames from the `blogs` directory
    const fetchedFiles = importAll(require.context('../data/gallery', false, /\.md$/));
    setFiles(fetchedFiles);
  }, []);

  return (
    <Main title="Gallery" description="List of Gallery">
      <article className="post">
        <header>
          <div className="title">
            <h2>Gallery</h2>
            <p>As an art enthusiast, I like capturing stunning visuals, especially within games.</p>
          </div>
        </header>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px' }}>
          {files.map((file) => (
            <button
              key={file}
              type="button"
              onClick={() => navigate(`/gallery/${file}`)}
              style={{
                padding: '1px 20px',
                cursor: 'pointer',
                borderRadius: '5px',
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

export default BlogList;
