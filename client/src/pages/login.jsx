import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import * as ROUTES from '../constants/routes';
import { useSelector, useDispatch } from 'react-redux'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import { ToastContainer, toast } from 'react-toastify'

import { login } from '../features/auth/authActions'


const schema = yup
  .object({
    username: yup.string().required('Username is Required.'),
    password: yup.string().required('Password is Required.'),
  })
  .required()


function Login() {


  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { loginLoading, user, loginError, LoginSuccess, } = useSelector(
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
        dispatch(login(data))
    }

  useEffect(() => {
    document.title = 'Login - Instagram';
  }, []);

  useEffect(() => {
    if (!loginLoading && user && LoginSuccess) {
        toast.success(`Login Success`, {
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
        navigate('/')
    }
    if (!loginLoading && (loginError)) {
      toast.error(`Invalid username or password`, {
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
}, [loginLoading, loginError, user , LoginSuccess])

  return (
    <div className="grid">
      <div>
        <div className="top-grid -mb-36 p-5 ">
          <h1 className="-mx-16 flex w-full justify-center">
            <img src="/images/logo.png" alt="Instagram Logo" className="mt-4 mb-6 w-48 " />
          </h1>
          <h1 className="flex justify-center text-center ">
            <p className="mb-8 text-[22px] font-semibold text-gray-400 ">Login To Your Account.</p>
          </h1>
          {loginError && <p className="error-text">{loginError}</p>}
          <form onSubmit={handleSubmit(onSubmit)}>
            <input
              type="text"
              autoComplete="text"
              required
              aria-label="Enter Your Username"
              placeholder="Username"
              className="input"
              {...register('username')}
            />

            {errors.username && (
                    <p className=" mt-2  text-danger-500 block text-sm">
                        {errors.username.message}
                    </p>
            )}
            <input
               type="password"
               {...register('password')}

              autoComplete="current-password"
              required
              aria-label="Enter Your Password"
              placeholder="Password"
              className="input"
            />
            {errors.password && (
                    <p className=" mt-2  text-danger-500 block text-sm">
                        {errors.password.message}
                    </p>
            )}
            <button
              className={`submit`}
              disabled={errors.username || errors.password}
              type="submit"
            >
              {loginLoading ? 'Logging In' : 'Log In'}
            </button>
            <h1 className="flex justify-center text-center ">
              <button
                className="my-3 font-semibold text-blue-900 decoration-inherit"
              >
                Forgot Password?
              </button>
            </h1>
          </form>
        </div>
        <div className=" bottom-grid mt-40">
          <p className="mr-2 font-semibold">Don't Have An Account?</p>
          <Link to={ROUTES.SIGN_UP} className="font-bold text-blue-500">
            Sign Up
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Login;
