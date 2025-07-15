import React, { useState } from 'react';
import authservice from '../appwrite/auth';
import { Link, useNavigate } from 'react-router-dom';
import { login } from '../store/authSlice';
import { Button, Input, Logo } from './index';
import { useDispatch } from 'react-redux';
import { useForm } from 'react-hook-form';

function Signup() {
  const navigate = useNavigate();
  const [error, setError] = useState('');
  const dispatch = useDispatch();
  const { register, handleSubmit } = useForm();

  const create = async (data) => {
    setError('');
    try {
      const userData = await authservice.createAccount(data);
      if (userData) {
        const user = await authservice.getCurrentUser();
        if (user) {
          dispatch(login(user));
          navigate('/');
        }
      }
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-100 to-gray-200 px-4">
      <div className="w-full max-w-lg bg-white rounded-2xl shadow-xl p-8 md:p-10 border border-gray-300">
        {/* Logo */}
        <div className="mb-6 flex justify-center">
          <span className="inline-block w-24">
            <Logo width="100%" />
          </span>
        </div>

        {/* Heading */}
        <h2 className="text-center text-3xl font-bold text-gray-800 mb-2">
          Create your Account
        </h2>
        <p className="text-center text-sm text-gray-600 mb-6">
          Already have an account?{' '}
          <Link
            to="/login"
            className="text-blue-600 font-medium hover:underline transition-all"
          >
            Log in
          </Link>
        </p>

        {/* Error Message */}
        {error && (
          <p className="text-red-600 text-center text-sm mb-4">{error}</p>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit(create)} className="space-y-6">
          <Input
            label="Full Name"
            placeholder="Enter your full name"
            {...register('name', {
              required: true,
            })}
          />

          <Input
            label="Email"
            placeholder="Enter your email"
            type="email"
            {...register('email', {
              required: true,
              validate: {
                matchPattern: (value) =>
                  /^[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$/.test(value) ||
                  'Email address must be a valid address',
              },
            })}
          />

          <Input
            label="Password"
            type="password"
            placeholder="Enter your password"
            {...register('password', { required: true })}
          />

          <Button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded-md font-semibold hover:bg-blue-700 transition-colors duration-300"
          >
            Create Account
          </Button>
        </form>
      </div>
    </div>
  );
}

export default Signup;
