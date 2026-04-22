import { useState } from "react";
import "./SignUp.css";
import { useNavigate } from "react-router-dom";

function SignUp() {
  const [signupData, setSignupData] = useState({
    Username: "",
    Email: "",
    Password: "",
    Friends: [],
    sentRequests: [],
    receivedRequests: [],
  });

  const navigate = useNavigate();

  const handleInput = (e) => {
    const { name, value } = e.target;
    setSignupData((current) => ({
      ...current,
      [name]: value,
    }));
  };

  const handleSignUp = async (e) => {
    e.preventDefault();
    if (!signupData.Username.trim()) {
      alert("Please enter your username");
      return;
    }

    if (!signupData.Email.trim()) {
      alert("Please enter your email");
      return;
    }

    if (!signupData.Password.trim()) {
      alert("Please enter your password");
      return;
    }

    const getUrl = "http://localhost:5000/users";
    const res = await fetch(getUrl);
    const allUsers = await res.json();

    const userExists = allUsers.find((user) => user.Email === signupData.Email);
    if (userExists) {
      alert(`The email ${signupData.Email} is already taken`);
      return;
    }

    await fetch(getUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(signupData),
    });

    alert(`${signupData.Username}, your account is created`);

    localStorage.setItem("user", JSON.stringify(signupData));
    navigate("/Profile");
  };

  return (
    <>
      <h3 className="signup-title">Sign Up</h3>

      <form className="signup-form" onSubmit={handleSignUp}>
        <div className="signup-username">
          <label>Username:</label>
          <input
            type="text"
            placeholder="Enter your name"
            value={signupData.Username}
            onChange={handleInput}
            name="Username"
            required
          />
        </div>
        <br />
        <div className="signup-email">
          <label>Email:</label>
          <input
            type="email"
            placeholder="Enter your email"
            value={signupData.Email}
            onChange={handleInput}
            name="Email"
            required
          />
        </div>
        <br />
        <div className="signup-password">
          <label>Password:</label>
          <input
            type="password"
            placeholder="Enter your password"
            value={signupData.Password}
            onChange={handleInput}
            name="Password"
            required
          />
        </div>
        <br />
        <div className="signup-buttons">
          <button
            type="button"
            className="login-btn"
            onClick={() => navigate("/Login")}
          >
            Login
          </button>
          <button type="submit" className="submit-btn">
            Submit
          </button>
        </div>
      </form>
    </>
  );
}

export default SignUp;
