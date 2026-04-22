import "./PostCard.css";

function PostCard({ post, user, posts, setPosts, editPostId, setEditPostId, editText, setEditText }) {
  
  const startEditPost = () => {
    setEditPostId(post.id);
    setEditText(post.text);
  };

  
  const saveEditPost = async () => {
    const updatedPost = { ...post, text: editText };

    await fetch(`http://localhost:5000/posts/${post.id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(updatedPost),
    });

    setPosts(posts.map(p => (p.id === post.id ? updatedPost : p)));
    setEditPostId(null);
    setEditText("");
  };


  const cancelEdit = () => {
    setEditPostId(null);
    setEditText("");
  };

  
  const deletePost = async () => {
    await fetch(`http://localhost:5000/posts/${post.id}`, { method: "DELETE" });
    setPosts(posts.filter(p => p.id !== post.id));
  };

  return (
    <div className="post-card">
      <strong>{post.Username}</strong>

      
      {editPostId === post.id ? (
        <>
          <textarea value={editText} onChange={(e) => setEditText(e.target.value)} />
          <button className="save-btn" onClick={saveEditPost}>Save</button>
          <button className="cancel-btn" onClick={cancelEdit}>Cancel</button>
        </>
      ) : (
        <p>{post.text}</p>
      )}

      {post.Username === user.Username && editPostId !== post.id && (
        <>
          <button className="edit-btn" onClick={startEditPost}>Edit</button>
          <button className="delete-btn" onClick={deletePost}>Delete</button>
        </>
      )}
    </div>
  );
}

export default PostCard;
