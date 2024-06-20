import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function AuthForm() {
  const [isLogin, setIsLogin] = useState(true);
  const [form, setForm] = useState({
    email: '',
    password: '',
    name: '' 
  });
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isLogin) {
      console.log('Logging in:', form);
      // Implement login logic 
      navigate('/dashboard');
    } else {
      console.log('Registering:', form);
      // Implement registration logic 
      navigate('/dashboard');
    }
  };

  const toggleForm = () => {
    setIsLogin(!isLogin);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="flex flex-wrap w-full max-w-4xl shadow-lg rounded-lg overflow-hidden">
        <div className="w-full md:w-1/2 bg-cover bg-center" style={{ backgroundImage: 'url("Login.png")' }}>
        </div>
        <div className="w-full md:w-1/2 bg-white p-4 md:p-8">
          <div className="flex flex-col justify-between h-full">
            <div className="flex flex-col items-center justify-center flex-grow">
              <img src="Logo TSM.png" alt="Logo" className="mb-4 w-20" />
              <h2 className="text-2xl font-bold mb-2">{isLogin ? 'Login' : 'Register'}</h2>
              <p className="mb-8">{isLogin ? 'Log into your account' : 'Create your account'}</p>
            </div>
            <form onSubmit={handleSubmit} className="w-full">
              {!isLogin && (
                <div className="mb-4">
                  <label htmlFor="name" className="block text-gray-700 text-sm font-semibold mb-2">Name:</label>
                  <input type="text" id="name" name="name" value={form.name} onChange={handleChange} className="w-full px-3 py-2 border rounded-lg text-gray-700 focus:outline-none focus:border-blue-500" placeholder="Enter your name" required />
                </div>
              )}
              <div className="mb-4">
                <label htmlFor="email" className="block text-gray-700 text-sm font-semibold mb-2">Email:</label>
                <input type="email" id="email" name="email" value={form.email} onChange={handleChange} className="w-full px-3 py-2 border rounded-lg text-gray-700 focus:outline-none focus:border-blue-500" placeholder="Enter your email" required />
              </div>
              <div className="mb-6">
                <label htmlFor="password" className="block text-gray-700 text-sm font-semibold mb-2">Password:</label>
                <input type="password" id="password" name="password" value={form.password} onChange={handleChange} className="w-full px-3 py-2 border rounded-lg text-gray-700 focus:outline-none focus:border-blue-500" placeholder="Enter your password" required />
              </div>
              <button type="submit" className="w-full bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-lg">{isLogin ? 'Login' : 'Register'}</button>
              <p className="mt-4 text-center">
                {isLogin ? 'Need an account? ' : 'Already have an account? '}
                <button type="button" onClick={toggleForm} className="text-blue-500 hover:text-blue-700">{isLogin ? 'Register' : 'Login'}</button>
              </p>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AuthForm;
