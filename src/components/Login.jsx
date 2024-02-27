import React, { useState } from "react";
import LogoWhite from "./LogoWhite";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [usernameActive, setUsernameActive] = useState(false);
  const [passwordActive, setPasswordActive] = useState(false);
  const [errorMessage, setErrorMessage] = useState(""); // State for error message

  const handleUsernameFocus = () => {
    setUsernameActive(true);
    setPasswordActive(false);
  };

  const handlePasswordFocus = () => {
    setUsernameActive(false);
    setPasswordActive(true);
  };

  const handleLogin = () => {
    console.log("pressed");
    if (username === "admin" && password === "admin") {
      window.location.href = "/inputdata";
    } else if (username === "student" && password === "student") {
      window.location.href = "/";
    } else {
      setErrorMessage("Invalid username or password"); // Set error message
    }
  };

  return (
    <div
      className="window flex justify-center items-center h-screen w-full rounded-r-xl relative"
      style={{
        width: "300%",
        boxShadow: "rgba(0,0,0,0.15) 1.95px 1.95px 2.6px",
      }}
    >
      <LogoWhite />
      <div
        className="w-full h-full bg-slate-500 absolute top-0 left-0 rounded-r-xl"
        style={{ zIndex: "-1", opacity: "0.4" }}
      ></div>
      <div className="flex flex-col jutify-center items-center">
        <label className="text-center text-white py-2 text-4xl font-mono">
          LOGIN
        </label>
        <label
          className="text-center text-white text-l font-mono"
          style={{ paddingBottom: "20px" }}
        >
          Loging to Your NOVA{" "}
        </label>
        <input
          type="text"
          placeholder="Username"
          onFocus={handleUsernameFocus}
          onBlur={() => setUsernameActive(false)}
          style={{ width: "150%", height: "60px" }}
          className={` px-4 py-2 border m-2 ${
            usernameActive ? "border-blue-500" : "border-gray-300"
          } rounded-md focus:outline-none focus:border-blue-500`}
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          onFocus={handlePasswordFocus}
          onBlur={() => setPasswordActive(false)}
          style={{ width: "150%", height: "60px" }}
          className={` px-4 py-2 border ${
            passwordActive ? "border-blue-500" : "border-gray-300"
          } rounded-md focus:outline-none focus:border-blue-500`}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        {errorMessage && ( // Render error message if it exists
          <p className="text-red-500 text-sm">{errorMessage}</p>
        )}
        <button
          onClick={handleLogin}
          style={{ width: "150%", height: "60px", backgroundColor: "#7FC7D9" }}
          className="mt-4 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
        >
          Login
        </button>
      </div>
    </div>
  );
};

export default Login;
