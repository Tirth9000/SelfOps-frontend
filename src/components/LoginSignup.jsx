// src/components/LoginSignup.jsx
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";  // Import axios for API calls

const LoginSignup = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (isLogin) {
      if (email && password) {
        try {
          const response = await axios.post("http://127.0.0.1:8000/login", {
            email: email,  // Adjust if backend uses 'email' instead of 'username'
            password: password,
          });

          if (response.status === 200) {
            localStorage.setItem("token", response.data.access_token);
            navigate("/dashboard");
          } else {
            alert(response.data.message || "Login failed");
          }
        } catch (error) {
          alert(error.response?.data?.detail || "An error occurred during login");
        }
      } else {
        alert("Please enter email and password");
      }
    } else {
      if (username && email && password && confirmPassword) {
        if (password !== confirmPassword) {
          alert("Passwords do not match");
          return;
        }
        try {
          const response = await axios.post("http://127.0.0.1:8000/register", {
            username: username,
            email: email,
            password: password,
          });

          if (response.status === 201) {
            alert("Account created! Please login.");
            setIsLogin(true);
          } else {
            alert(response.data.message || "Signup failed");
          }
        } catch (error) {
          alert(error.response?.data?.detail || "An error occurred during signup");
        }
      } else {
        alert("Please fill all fields");
      }
    }
  };

  return (
    <div className="min-h-screen flex">
      {/* Left Panel */}
      <div className="hidden md:flex w-1/2 bg-gray-800 relative justify-center items-center overflow-hidden">
        <div className="absolute w-48 h-48 bg-white/10 rounded-full -top-10 -left-10 animate-pulse"></div>
        <div className="absolute w-36 h-36 bg-white/10 rounded-full bottom-20 right-10 animate-pulse"></div>
        <div className="absolute w-24 h-24 bg-white/10 rounded-full top-1/4 right-1/4 animate-bounce"></div>

        <div className="text-center text-white z-10 px-6">
          <h1 className="text-4xl font-bold mb-2">Welcome to SelfOps</h1>
          <p className="text-lg text-gray-200">Manage your apps & containers easily</p>
        </div>
      </div>

      {/* Right Panel */}
      <div className="flex flex-1 justify-center items-center bg-gray-50">
        <div className="bg-white shadow-lg rounded-2xl p-10 w-full max-w-md animate-fadeIn">
          <h2 className="text-3xl font-bold mb-6 text-center text-gray-800">
            {isLogin ? "Welcome Back!" : "Create Account"}
          </h2>

          <form className="space-y-4" onSubmit={handleSubmit}>
            {!isLogin && (
              <input
                type="text"
                placeholder="Username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full px-5 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-gray-500 transition duration-300 transform hover:scale-105"
                required
              />
            )}
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-5 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-gray-500 transition duration-300 transform hover:scale-105"
              required
            />
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-5 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-gray-500 transition duration-300 transform hover:scale-105"
              required
            />
            {!isLogin && (
              <input
                type="password"
                placeholder="Confirm Password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="w-full px-5 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-gray-500 transition duration-300 transform hover:scale-105"
                required
              />
            )}

            <button
              type="submit"
              className="w-full py-3 bg-gray-800 text-white font-semibold rounded-xl hover:bg-gray-700 transition transform hover:scale-105 shadow-md"
            >
              {isLogin ? "Login" : "Sign Up"}
            </button>
          </form>

          <p className="text-center mt-4 text-gray-500">
            {isLogin ? "Don't have an account?" : "Already have an account?"}{" "}
            <span
              className="text-gray-800 cursor-pointer hover:underline"
              onClick={() => setIsLogin(!isLogin)}
            >
              {isLogin ? "Sign Up" : "Login"}
            </span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginSignup;