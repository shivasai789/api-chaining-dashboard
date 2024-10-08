import React, { useState, useEffect, useRef } from "react";
import { ThreeDots } from "react-loader-spinner";
import axios from "axios";
import Notification from '../Notification'; 
import './index.css';

const Dashboard = () => {
  const [users, setUsers] = useState([]);
  const [posts, setPosts] = useState([]);
  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [postData, setPostData] = useState({ title: "", body: "" });
  const [selectedUser, setSelectedUser] = useState(null);
  const [showComments, setShowComments] = useState(false);
  const [notification, setNotification] = useState({ message: '', type: '', visible: false });

  const postsRef = useRef(null);

  // Scroll down based on posts
  useEffect(() => {
    if (posts.length > 0) {
      postsRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [posts]);

  // Handle Errors
  const handleError = (errorMessage) => {
    setError(errorMessage);
    setLoading(false);
    showNotification(errorMessage, 'error');
  };

  const showNotification = (message, type) => {
    setNotification({ message, type, visible: true });
    setTimeout(() => {
      setNotification({ ...notification, visible: false });
    }, 3000); // Hide after 3 seconds
  };

  const updateSelectedUser = (event) => setSelectedUser(users.find(user => user.id === parseInt(event.target.value)));

  const onChangePostTitle = (event) => setPostData({ ...postData, title: event.target.value });

  const onChangePostBody = (event) => setPostData({ ...postData, body: event.target.value });

  // Fetching the users
  const fetchUsers = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await axios.get("https://jsonplaceholder.typicode.com/users");
      setUsers(response.data);
      showNotification("Users fetched successfully!", 'success');
    } catch (err) {
      handleError("Error fetching users.");
    } finally {
      setLoading(false);
    }
  };

  // Creating a post
  const createPost = async () => {
    if (postData.title === '' || postData.body === ''){
      handleError('The fields should not be empty!')
      return;
    }

    setLoading(true);
    setError(null);
    try {
      const response = await axios.post("https://jsonplaceholder.typicode.com/posts", {
        ...postData,
        userId: selectedUser.id,
      });
      setPosts([response.data, ...posts]);
      showNotification("Post created successfully!", 'success');
    } catch (err) {
      handleError("Error creating post.");
    } finally {
      setLoading(false);
    }
  };

  // Fetching comments
  const fetchComments = async (postId) => {
    setShowComments(true);
    setLoading(true);
    setError(null);
    try {
      const response = await axios.get(`https://jsonplaceholder.typicode.com/comments?postId=${postId}`);
      setComments(response.data);
      showNotification("Comments fetched successfully!", 'success');
    } catch (err) {
      handleError("Error fetching comments.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="md:container md:mx-auto p-6 space-y-8 bg-gray-50 min-h-screen relative flex flex-col justify-center align-center">
      <div className="text-center">
        <h1 className="text-5xl font-bold text-gray-900" style={{ color: '#10375C' }}>API Chaining Dashboard</h1>
        <p className="text-gray-600 mt-2">Fetch users, create posts, and see comments.</p>
      </div>

      {/* Fetch Users Button */}
      <div className="text-center">
        <button
          onClick={fetchUsers}
          className="bg-blue-600 hover:bg-blue-700 text-white font-bold px-6 py-3 rounded-lg shadow-md transform hover:scale-105 transition duration-300 ease-in-out"
        >
          Fetch Users
        </button>
      </div>

      {/* User Selection */}
      {users.length > 0 ? (
        <div className="text-center space-y-4">
          <h2 className="font-semibold text-2xl text-gray-800" style={{ color: '#10375C' }}>Select User:</h2>
          <select
            onChange={updateSelectedUser}
            className="block w-1/2 mx-auto p-3 border rounded-lg bg-white shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200"
          >
            <option value="">-- Select a User --</option>
            {users.map(user => (
              <option key={user.id} value={user.id}>{user.name}</option>
            ))}
          </select>
        </div>
      ) : (
        <p className="text-center text-gray-600">No users found. Please fetch users first.</p>
      )}

      {/* Create Post Form */}
      {selectedUser && (
        <>
        <div className="bg-white shadow-lg rounded-lg p-6 max-w-lg mx-auto space-y-4">
          <h2 className="font-bold text-3xl text-gray-900" style={{ color: '#10375C' }}>Create a Post</h2>
          <input
            type="text"
            placeholder="Post Title"
            className="w-full p-4 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200"
            value={postData.title}
            onChange={onChangePostTitle}
          />
          <textarea
            placeholder="Post Body"
            className="w-full p-4 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200"
            value={postData.body}
            onChange={onChangePostBody}
          />
          <button
            onClick={createPost}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold px-6 py-3 rounded-lg shadow-md transform hover:scale-105 transition duration-300 ease-in-out"
          >
            Create Post
          </button>
        </div>
        </>
      )}

      {/* Display Posts */}
      {posts.length > 0 && (
        <>
        <div className="bg-white shadow-lg rounded-lg p-6 max-w-lg mx-auto space-y-4 mt-8 overflow-auto max-h-96 scroll-smooth">
          <h2 className="font-bold text-3xl text-gray-900" style={{ color: '#10375C' }}>Created Posts</h2>
          <ul className="space-y-3">
            {posts.map((post, index) => (
              <li key={index} className="bg-gray-100 p-4 rounded-lg shadow-md">
                <pre className="whitespace-pre-wrap">{JSON.stringify(post, null, 2)}</pre>
              </li>
            ))}
          </ul>
        </div>
      <div className="text-center">
      <button onClick={() => fetchComments(posts[0].id)} className="bg-blue-600 hover:bg-blue-700 text-white font-bold w-30 px-6 py-3 rounded-lg shadow-md transform hover:scale-105 transition duration-300 ease-in-out">
        Fetch Comments
      </button>
      </div>
      <div ref={postsRef}></div>
        </>
      )}

      {/* Display Comments */}
      {showComments && (
        comments.length > 0 ? (
          <>
          <div className="bg-white shadow-lg rounded-lg p-6 max-w-lg mx-auto space-y-4 mt-8">
            <h2 className="font-bold text-3xl text-gray-900">Comments</h2>
            <ul className="space-y-3">
              {comments.map(comment => (
                <li key={comment.id} className="bg-gray-100 p-4 rounded-lg shadow-md">
                  <strong className="block text-gray-700 font-medium">{comment.name}</strong>
                  <p className="text-gray-600">{comment.body}</p>
                </li>
              ))}
            </ul>
          </div>
          </>
        ) : (
          <>
            <div className="flex justify-center">
              <img src="no-speak.png" alt="no comments" className="no-comments-img " />
            </div>
            <p className="text-center text-gray-600" style={{ margin: '0px !important' }}>No Comments Found!</p>
          </>
        )
      )}

      {/* Loading/Error States */}
      {loading && <LoaderOverlay />}
      {error && (
        <div className="text-center text-red-500">
          {error} <button onClick={() => setError(null)} className="underline">Dismiss</button>
        </div>
      )}

      {/* Notification */}
      {notification.visible && (
        <Notification 
          message={notification.message} 
          type={notification.type} 
          onClose={() => setNotification({ ...notification, visible: false })} 
        />
      )}
    </div>
  );
};

// Loader Overlay Component
const LoaderOverlay = () => (
  <div className="loader-overlay">
    <ThreeDots
      visible={true}
      height="80"
      width="80"
      color="black"
      radius="9"
      ariaLabel="three-dots-loading"
    />
  </div>
);

export default Dashboard;
