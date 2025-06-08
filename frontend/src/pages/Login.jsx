import React, { useState } from 'react';

const Login = () => {
  const [state, setState] = useState('Sign Up');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');

  const onSubmitHandler = async (event) => {
    event.preventDefault();
  };

  return (
    <div className='flex items-center justify-center min-h-[80vh] bg-gray-100'>
      <div className='w-full max-w-md p-6 bg-white rounded-lg shadow-lg'>
        <h2 className='text-2xl font-semibold text-center text-gray-800'>
          {state === 'Sign Up' ? 'Create Account' : 'Login'}
        </h2>

        <p className='text-center text-sm text-gray-600'>
          Please {state === 'Sign Up' ? 'sign up' : 'log in'} to book an appointment
        </p>

        <form onSubmit={onSubmitHandler} className='mt-6'>
          {/* Full Name */}
          { state === 'Sign Up' && (
            <div className='mb-4'>
              <label htmlFor='name' className='block text-sm text-gray-600'>Full Name</label>
              <input
                type='text'
                id='name'
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                className='w-full p-3 mt-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500'
              />
            </div>
          )}

          {/* Email */}
          <div className='mb-4'>
            <label htmlFor='email' className='block text-sm text-gray-600'>Email</label>
            <input
              type='email'
              id='email'
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className='w-full p-3 mt-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500'
            />
          </div>

          {/* Password */}
          <div className='mb-6'>
            <label htmlFor='password' className='block text-sm text-gray-600'>Password</label>
            <input
              type='password'
              id='password'
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className='w-full p-3 mt-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500'
            />
          </div>

          <button
            type='submit'
            className='w-full p-3 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors duration-300'
          >
            {state === 'Sign Up' ? 'Create Account' : 'Login'}
          </button>

          <div className='mt-4 text-center'>
            <p className='text-sm text-gray-500'>
              {state === 'Sign Up' ? 'Already have an account?' : "Don't have an account?"}
              <button
                type='button'
                onClick={() => setState(state === 'Sign Up' ? 'Login' : 'Sign Up')}
                className='ml-1 text-blue-500 hover:underline'
              >
                {state === 'Sign Up' ? 'Login here' : 'Sign up here'}
              </button>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
