import { useState } from "react";
import "./PostBox.css";

function PostBox({ user, posts, setPosts }) {
  const [text, setText] = useState("");

  const handlePost = async () => {
    if (!text.trim()) return alert("Write something first");

    const newPost = { id: Date.now(), Username: user.Username, text };

    const res = await fetch("http://localhost:5000/posts", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newPost)
    });

    const savedPost = await res.json();
    setPosts([savedPost, ...posts]);
    setText("");
  };

  return (
    <div className="post-box">
      <textarea
        value={text}
        placeholder="Write something..."
        onChange={(e) => setText(e.target.value)}
      />
      <button onClick={handlePost}>Post</button>
    </div>
  );
}

export default PostBox;
