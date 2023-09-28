import React, { useState } from 'react';
import { useNavigate} from "react-router-dom";

function Login({ setToken, setUser }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

async function login(event) {
  event.preventDefault();

  try {
    const response = await fetch('https://fakestoreapi.com/auth/login',{
      method:'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body:JSON.stringify({
          username: username,
          password: password
      })
  })
  const result = await response.json();
  const token = result.token;

  setToken(token);
  setUser(username);
  token ? navigate("/") : null;

  } catch(error) {
    console.error(error)
  }
}

  return (
    <div>
      <h1>Login</h1>
      <h3>username: mor_2314</h3>
      <h4>password: 83r5^_</h4>
      <form onSubmit={login}>
        <label>
          Username: 
          <input 
            value={username}
            onChange={(event) => setUsername(event.target.value)}
            required
          />
        </label>
        <label>
          Password
          <input 
            type={"password"}
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            required
          />
        </label>
        <button>Submit</button>
      </form>
    </div>
  )
}

export default Login