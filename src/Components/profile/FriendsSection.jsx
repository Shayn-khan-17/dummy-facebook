import "./FriendsSection.css";

function FriendsSection({ user, allUsers, setUser }) {
  const updateUser = async (updatedUser) => {
    await fetch(`http://localhost:5000/users/${updatedUser.id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(updatedUser)
    });
  };

  const sendRequest = async (toUser) => {
    const updatedMe = { ...user, sentRequests: [...(user.sentRequests || []), toUser.id] };
    const updatedToUser = { ...toUser, receivedRequests: [...(toUser.receivedRequests || []), user.id] };
    await updateUser(updatedMe);
    await updateUser(updatedToUser);
    setUser(updatedMe);
    localStorage.setItem("user", JSON.stringify(updatedMe));
  };

  const acceptRequest = async (fromUser) => {
    const updatedMe = {
      ...user,
      friends: [...(user.friends || []), fromUser.id],
      receivedRequests: user.receivedRequests.filter(id => id !== fromUser.id)
    };
    const updatedFromUser = {
      ...fromUser,
      friends: [...(fromUser.friends || []), user.id],
      sentRequests: fromUser.sentRequests.filter(id => id !== user.id)
    };
    await updateUser(updatedMe);
    await updateUser(updatedFromUser);
    setUser(updatedMe);
    localStorage.setItem("user", JSON.stringify(updatedMe));
  };

  const rejectRequest = async (fromUser) => {
    const updatedMe = { ...user, receivedRequests: user.receivedRequests.filter(id => id !== fromUser.id) };
    const updatedFromUser = { ...fromUser, sentRequests: fromUser.sentRequests.filter(id => id !== user.id) };
    await updateUser(updatedMe);
    await updateUser(updatedFromUser);
    setUser(updatedMe);
    localStorage.setItem("user", JSON.stringify(updatedMe));
  };

  const getFriendStatus = (u) => {
    if (user.friends?.includes(u.id)) return "friends";
    if (user.sentRequests?.includes(u.id)) return "sent";
    if (user.receivedRequests?.includes(u.id)) return "received";
    return "none";
  };

  return (
    <div className="friends-section">
      <h3>People you may know</h3>
      {allUsers.map(u => {
        const status = getFriendStatus(u);
        return (
          <div key={u.id} className="friend-card">
            <span>{u.Username}</span>
            {status === "none" && <button onClick={() => sendRequest(u)}>Add Friend</button>}
            {status === "sent" && <button disabled>Request Sent</button>}
            {status === "received" && (
              <>
                <button onClick={() => acceptRequest(u)}>Accept</button>
                <button onClick={() => rejectRequest(u)}>Reject</button>
              </>
            )}
            {status === "friends" && <button disabled>Friends</button>}
          </div>
        );
      })}
    </div>
  );
}

export default FriendsSection;
