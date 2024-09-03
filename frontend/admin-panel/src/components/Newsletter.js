import React, { useState, useEffect } from 'react';
import './Newsletter.css';

// Function to fetch posts from the backend
const fetchPosts = async () => {
  try {
    const response = await fetch('/api/newsletter');
    if (!response.ok) throw new Error('Failed to fetch posts');
    return await response.json();
  } catch (error) {
    console.error('Error fetching posts:', error);
    return [];
  }
};

// Function to add a new post to the backend
const addPost = async (post) => {
  try {
    const response = await fetch('/api/newsletter', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(post),
    });
    if (!response.ok) throw new Error('Failed to add post');
    return await response.json();
  } catch (error) {
    console.error('Error adding post:', error);
    return null;
  }
};

const Newsletter = () => {
  const [posts, setPosts] = useState([]);
  const [newPost, setNewPost] = useState({ title: '', content: '' });
  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    const getPosts = async () => {
      const postsData = await fetchPosts();
      setPosts(postsData);
    };
    getPosts();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewPost({ ...newPost, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (newPost.title && newPost.content) {
      const addedPost = await addPost(newPost);
      if (addedPost) {
        setPosts([addedPost, ...posts]);
        setNewPost({ title: '', content: '' });
        setShowForm(false);
      }
    }
  };

  return (
    <div className="newsletter">
      <h2>Newsletter</h2>
      <div className="articles-wrapper">
        <div className="articles">
          {posts.concat(posts).map((post, index) => (
            <div key={index} className="article">
              <h3>{post.title}</h3>
              <p>{post.content}</p>
              <a href="./NotificationsPanel" className="read-more">Read more</a>
            </div>
          ))}
        </div>
      </div>
      <button onClick={() => setShowForm(!showForm)} className="plus-button">
        +
      </button>
      {showForm && (
        <form className="post-form" onSubmit={handleSubmit}>
          <input
            type="text"
            name="title"
            value={newPost.title}
            onChange={handleInputChange}
            placeholder="Title"
          />
          <textarea
            name="content"
            value={newPost.content}
            onChange={handleInputChange}
            placeholder="Content"
          />
          <button type="submit">Submit</button>
        </form>
      )}
    </div>
  );
};

export default Newsletter;
