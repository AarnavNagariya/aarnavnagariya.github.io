import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Markdown from 'markdown-to-jsx';
import Main from '../layouts/Main';

const BlogPost = () => {
  const { filename } = useParams(); // Get the filename from the URL
  const [markdown, setMarkdown] = useState('');

  useEffect(() => {
    import(`../data/blogs/${filename}.md`)
      .then((res) => fetch(res.default))
      .then((response) => response.text())
      .then(setMarkdown)
      .catch((err) => console.error('Failed to load Markdown file:', err));
  }, [filename]);

  return (
    <Main title={filename} description={`Blog post: ${filename}`}>
      <article className="post markdown">
        <header>
          <div className="title">
            <h2>{filename}</h2>
          </div>
        </header>
        <Markdown>{markdown}</Markdown>
      </article>
    </Main>
  );
};

export default BlogPost;
