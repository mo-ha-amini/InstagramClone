import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import * as ROUTES from '../constants/routes';
import { useSelector, useDispatch } from 'react-redux'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import { ToastContainer, toast } from 'react-toastify'

import { SignIn } from '../features/auth/authActions'


const schema = yup
  .object({
    username: yup.string().required('Username is required.'),
    email: yup
      .string()
      .email('Please enter a valid email address.')
      .required('Email is required.'),
    password: yup
      .string()
      .min(6, 'Password must be at least 6 characters long.')
      .max(20, 'Password cannot be longer than 20 characters.')
      .required('Password is required.'),
    confirmPassword: yup
      .string()
      .required('Confirm password is required.')
      .oneOf([yup.ref('password'), null], 'Passwords must match.'),
    name: yup.string()
      .required('Name is required.'),
  })
  .required();


function SignUp() {
 
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { signInLoading, signInError, signInSuccess, } = useSelector(
      (state) => state.auth
    )

  const {
        register,
        formState: { errors },
        handleSubmit,
    } = useForm({
        resolver: yupResolver(schema),
        mode: 'all',
    })

    const onSubmit = (data) => {
        dispatch(SignIn(data))
    }


  
  useEffect(() => {
    document.title = 'Sign Up - Instagram 2.0';
  }, []);

  
  useEffect(() => {
    if (!signInLoading && signInSuccess) {
        toast.success(`SignIn Success`, {
            position: 'top-right',
            autoClose: 1000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: 'light',
            rtl: true,
        })
        navigate('/login')
    }
    if (!signInLoading && (signInError)) {
      toast.error(`SignIn Failed.`, {
          position: 'top-right',
          autoClose: 1000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: 'light',
          rtl: true,
      })
  }
}, [signInLoading, signInError, signInSuccess])

  return (
    <div className="grid">
      <div>
        <div className="top-grid my-3 p-[24px]">
          <h1 className="-mx-16 flex w-full justify-center ">
            <img src="/images/logo.png" alt="Instagram Logo" className="mt-4 mb-4 w-48 " />
          </h1>
          <h1 className="flex justify-center text-center ">
            <p className="mb-8 text-[22px] font-semibold text-gray-400 ">
              Sign up to see photos and videos from your friends.
            </p>
          </h1>
          <form onSubmit={handleSubmit(onSubmit)}>
            <input
              type="text"
              autoComplete="name"
              required
              aria-label="Enter Your Full Name"
              placeholder="Full Name"
              className="input"
              {...register('name')}
            />
            {errors.name && (
                    <p className=" mt-2  text-danger-500 block text-sm">
                        {errors.name.message}
                    </p>
            )}
            <input
              type="text"
              autoComplete="username"
              required
              aria-label="Enter Your Username"
              placeholder="Username"
              className="input "
              {...register('username')}
            />
            {errors.username && (
                    <p className=" mt-2  text-danger-500 block text-sm">
                        {errors.username.message}
                    </p>
            )}
            <input
              type="email"
              autoComplete="email"
              required
              aria-label="Enter Your Email Address"
              placeholder="Email Address"
              className="input "
              {...register('email')}
            />
            {errors.email && (
                    <p className=" mt-2  text-danger-500 block text-sm">
                        {errors.email.message}
                    </p>
            )}
            <input
              type="text"
              autoComplete="Gender"
              required
              aria-label="Enter Your Gender"
              placeholder="Gender"
              className="input "
              {...register('gender')}
            />
           
            <input
              type="number"
              autoComplete="09120000000"
              required
              aria-label="Enter Your PhoneNumber"
              placeholder="Phone Number"
              className="input "
              {...register('phoneNumber')}
            />
            <input
              type="password"
              autoComplete="new-password"
              required
              aria-label="Enter Your Password"
              placeholder="Password"
              className="input"
              {...register('password')}
            />
            {errors.password && (
                    <p className=" mt-2  text-danger-500 block text-sm">
                        {errors.password.message}
                    </p>
            )}
            <input
              type="password"
              autoComplete="new-password"
              required
              aria-label="Confirm Your Password"
              placeholder="Confirm Password"
              className="input"
              {...register('confirmPassword')}
            />
            {errors.confirmPassword && (
                    <p className=" mt-2  text-danger-500 block text-sm">
                        {errors.confirmPassword.message}
                    </p>
            )}
            <button
              className={`submit`}
              disabled={signInError || signInLoading}
              type="submit"
            >
              {signInLoading ? 'Creating Your Account' : 'Sign Up'}
            </button>
          </form>
        </div>
        <div className=" bottom-grid">
          <p className="mr-2 font-semibold">Already have An Account?</p>
          <Link to={ROUTES.LOGIN} className="font-bold text-blue-500">
            Log In
          </Link>
        </div>
      </div>
    </div>
  );
}

export default SignUp;
