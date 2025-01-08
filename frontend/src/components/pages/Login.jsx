import React, { useState } from 'react';
import axios from 'axios';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:3000/api/users/login', {
        email,
        password,
      });
      console.log('Login successful:', response.data);
      // Handle successful login (e.g., store token, redirect)
    } catch (error) {
      console.error('Login error:', error.response ? error.response.data : error.message);
    }
  };

  return (
    <>
      <div className='h-screen w-screen flex justify-center items-center bg-slate-800'>
        <div className='h-96 w-64 flex justify-center items-center'>
          <form onSubmit={handleSubmit} className="bg-white p-4 rounded-lg shadow-md border border-white">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email"
              required
              className="mb-2 p-2 border border-gray-300 rounded"
            />
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
              required
              className="mb-2 p-2 border border-gray-300 rounded"
            />
            <button type="submit" className="w-full bg-blue-500 text-white p-2 rounded">
              Login
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default Login;