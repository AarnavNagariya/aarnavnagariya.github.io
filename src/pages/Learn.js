import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Main from '../layouts/Main';

// Import Markdown files dynamically from the `blogs` directory
const importAll = (r) => r.keys().map((file) => file.replace('./', '').replace('.md', ''));

const Learn = () => {
  const [files, setFiles] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredFiles, setFilteredFiles] = useState([]);
  const [fileContents, setFileContents] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    const fetchFiles = async () => {
      const fetchedFiles = importAll(require.context('../data/learn', false, /\.md$/));
      setFiles(fetchedFiles);

      try {
        // Fetch all file contents in parallel
        const contentPromises = fetchedFiles.map(async (file) => {
          const res = await import(`../data/learn/${file}.md`);
          const response = await fetch(res.default);
          const text = await response.text();
          return { file, text };
        });

        const contents = await Promise.all(contentPromises);
        const contentMap = contents.reduce((acc, { file, text }) => {
          acc[file] = text;
          return acc;
        }, {});

        setFileContents(contentMap);
        setFilteredFiles(fetchedFiles); // Initially show all files
      } catch (err) {
        console.error('Failed to load content for files:', err);
      }
    };

    fetchFiles();
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

  // Update filtered files based on search query
  useEffect(() => {
    if (searchQuery.trim() === '') {
      setFilteredFiles(files); // Show all files if search is empty
    } else {
      const matchedFiles = files.filter((file) => {
        const content = fileContents[file]?.toLowerCase();
        const query = searchQuery.toLowerCase();
        return content?.includes(query);
      });
      setFilteredFiles(matchedFiles);
    }
  }, [searchQuery, files, fileContents]);

  return (
    <Main title="Learn" description="List of Learning posts">
      <article className="post">
        <header>
          <div className="title">
            <h2>Learn</h2>
            <p>Here are Your Learning Notes</p>
            <p>
              These are made/compiled from various sources for credits/references, Feel free to{' '}
              <a href="/contact">contact</a>.
            </p>
          </div>
        </header>
        <div style={{ marginBottom: '20px' }}>
          <input
            type="text"
            placeholder="Search for a topic..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            style={{
              width: '100%',
              padding: '10px',
              fontSize: '16px',
              borderRadius: '5px',
              border: '1px solid #ccc',
            }}
          />
        </div>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px' }}>
          {filteredFiles.map((file) => (
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
