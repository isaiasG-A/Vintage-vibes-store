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
    <div className='card' style={{width: "44%", margin: "0 auto"}}>
      <h4 class="display-5">Login</h4>
      <div className='card container mb-3' style={{width: "14rem"}}>
        <h6>username: mor_2314</h6>
        <h6>password: 83r5^_</h6>
      </div>
      <form className='form' onSubmit={login}>
        <div class="mb-3">
          <label class="form-label">
            Username
            <input 
              class="form-control"
              value={username}
              onChange={(event) => setUsername(event.target.value)}
              required
            />
          </label>
        </div>
        <div class="mb-3">
          <label class="form-label">
            Password
            <input
               class="form-control"
              type={"password"}
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              required
            />
          </label>
        </div>
        <button className='btn btn-outline-success mb-4'>Submit</button>
      </form>
    </div>
  )
}

export default Login