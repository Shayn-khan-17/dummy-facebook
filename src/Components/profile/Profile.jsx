import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom"; // Added only for logout navigation
import "./Profile.css";
import PostBox from "./PostBox";
import PostCard from "./PostCard";
import FriendsSection from "./FriendsSection";

function Profile() {
  const storedUser = JSON.parse(localStorage.getItem("user")) || null;
  const [user, setUser] = useState(storedUser);
  const [allUsers, setAllUsers] = useState([]);
  const [posts, setPosts] = useState([]);
  const [editPostId, setEditPostId] = useState(null);
  const [editText, setEditText] = useState("");

  const navigate = useNavigate(); 

  
  const handleLogout = () => {
    localStorage.removeItem("user");
    navigate("/login");
  };

  useEffect(() => {
    if (!user) return;
    const fetchUsers = async () => {
      const res = await fetch("http://localhost:5000/users");
      const data = await res.json();
      setAllUsers(data.filter(u => u.id !== user.id));
    };
    fetchUsers();
  }, [user]);

  useEffect(() => {
    if (!user) return;
    const fetchPosts = async () => {
      const res = await fetch("http://localhost:5000/posts");
      const data = await res.json();
      const friendUsernames = allUsers
        .filter(u => user.friends?.includes(u.id))
        .map(u => u.Username);
      const visiblePosts = data.filter(
        p => p.Username === user.Username || friendUsernames.includes(p.Username)
      );
      setPosts(visiblePosts.reverse());
    };
    fetchPosts();
  }, [user, allUsers]);

  if (!user) return <h3>No user logged in</h3>;

  return (
    <div className="profile-container">
      <h2>Welcome, {user.Username}</h2>

      <button onClick={handleLogout} className="logout-btn">Logout</button>

      <PostBox user={user} posts={posts} setPosts={setPosts} />

      <div className="posts-section">
        {posts.length === 0 ? (
          <p>No posts yet</p>
        ) : (
          posts.map((p) => (
            <PostCard
              key={p.id}
              post={p}
              user={user}
              posts={posts}
              setPosts={setPosts}
              editPostId={editPostId}
              setEditPostId={setEditPostId}
              editText={editText}
              setEditText={setEditText}
            />
          ))
        )}
      </div>

      <FriendsSection user={user} allUsers={allUsers} setUser={setUser} />
    </div>
  );
}

export default Profile;
