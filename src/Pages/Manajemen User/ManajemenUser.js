import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function ManajemenUser() {
  const [user, setUser] = useState({
    email: '',
    oldPassword: '',
    newPassword: '',
    username: '',
  });
  const navigate = useNavigate();

  useEffect(() => {
    const storedUser = localStorage.getItem('currentUser');
    if (storedUser) {
      const parsedUser = JSON.parse(storedUser);
      setUser((prev) => ({
        ...prev,
        email: parsedUser.email || '',
        username: parsedUser.username || '',
      }));
    }
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const storedUser = localStorage.getItem('currentUser');
    const currentUser = storedUser ? JSON.parse(storedUser) : null;

    if (!currentUser || !currentUser.id) {
      console.error('User not found or invalid user data.');
      return;
    }

    try {
      const response = await fetch('/api/updateUser', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          userId: currentUser.id,
          username: user.username,
          email: user.email,
          oldPassword: user.oldPassword,
          newPassword: user.newPassword,
        }),
      });

      const data = await response.json();
      if (response.ok) {
        alert(data.message);
        navigate('/dashboard');
      } else {
        alert(data.message);
      }
    } catch (error) {
      console.error('Update error:', error);
      alert('An error occurred. Please try again.');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="w-full max-w-md p-8 space-y-6 bg-white rounded-lg shadow-md">
        <h1 className="text-xl font-semibold text-gray-900">User Management Settings</h1>
        <form onSubmit={handleSubmit} className="space-y-6">
          <InputField label="Email" type="email" name="email" value={user.email} onChange={handleChange} />
          <InputField label="Username" name="username" value={user.username} onChange={handleChange} />
          <PasswordInput label="Old Password" name="oldPassword" value={user.oldPassword} onChange={handleChange} />
          <PasswordInput label="New Password" name="newPassword" value={user.newPassword} onChange={handleChange} />
          <button type="submit" className="w-full bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded">
            Save Changes
          </button>
        </form>
      </div>
    </div>
  );
}

function InputField({ label, type = 'text', name, value, onChange }) {
  return (
    <div className="mb-4">
      <label className="block text-sm font-medium text-gray-700">{label}</label>
      <input type={type} name={name} value={value} onChange={onChange} className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500" />
    </div>
  );
}

function PasswordInput({ label, name, value, onChange }) {
  const [showPassword, setShowPassword] = useState(false);
  const togglePasswordVisibility = () => setShowPassword(!showPassword);

  return (
    <div className="mb-4">
      <label className="block text-sm font-medium text-gray-700">{label}</label>
      <div className="relative">
        <input
          type={showPassword ? 'text' : 'password'}
          name={name}
          value={value}
          onChange={onChange}
          className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
        />
        <button
          type="button"
          onClick={togglePasswordVisibility}
          className="absolute inset-y-0 right-0 px-3 flex items-center text-sm text-gray-500"
        >
          {showPassword ? 'Hide' : 'Show'}
        </button>
      </div>
    </div>
  );
}

export default ManajemenUser;
