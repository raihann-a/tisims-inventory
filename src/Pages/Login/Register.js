// src/Pages/Login/Register.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Register = () => {
  const [form, setForm] = useState({
    email: '',
    password: '',
    username: ''
  });
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const url = 'http://localhost:3001/api/register';
    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form),
    };

    try {
      const response = await fetch(url, requestOptions);
      const data = await response.json();
      
      if (response.ok) {
        setErrorMessage('Account registered successfully. Please log in.');
        setTimeout(() => navigate('/'), 2000);
      } else {
        setErrorMessage(data.message);
      }
    } catch (error) {
      setErrorMessage('An error occurred. Please try again.');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="flex flex-wrap w-full max-w-4xl shadow-lg rounded-lg overflow-hidden">
        <div className="w-full md:w-1/2 bg-cover bg-center" style={{ backgroundImage: 'url("Login.png")' }}>
        </div>
        <div className="w-full md:w-1/2 bg-white p-4 md:p-8">
          <h2 className="text-2xl font-bold mb-2">Register</h2>
          <p className="mb-8">Create your account</p>
          {errorMessage && <p className="text-red-500 mb-4">{errorMessage}</p>}
          <form onSubmit={handleSubmit} className="w-full">
            <div className="mb-4">
              <label htmlFor="username" className="block text-gray-700 text-sm font-semibold mb-2">Username:</label>
              <input type="text" id="username" name="username" value={form.username} onChange={handleChange} className="w-full px-3 py-2 border rounded-lg text-gray-700 focus:outline-none focus:border-blue-500" placeholder="Enter your username" required />
            </div>
            <div className="mb-4">
              <label htmlFor="email" className="block text-gray-700 text-sm font-semibold mb-2">Email:</label>
              <input type="email" id="email" name="email" value={form.email} onChange={handleChange} className="w-full px-3 py-2 border rounded-lg text-gray-700 focus:outline-none focus:border-blue-500" placeholder="Enter your email" required />
            </div>
            <div className="mb-6">
              <label htmlFor="password" className="block text-gray-700 text-sm font-semibold mb-2">Password:</label>
              <input type="password" id="password" name="password" value={form.password} onChange={handleChange} className="w-full px-3 py-2 border rounded-lg text-gray-700 focus:outline-none focus:border-blue-500" placeholder="Enter your password" required />
            </div>
            <button type="submit" className="w-full bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-lg">Register</button>
            <p className="mt-4 text-center">
              Already have an account? <button type="button" onClick={() => navigate('/')} className="text-blue-500 hover:text-blue-700">Login</button>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Register;
