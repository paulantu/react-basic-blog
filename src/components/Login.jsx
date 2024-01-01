import React, { useState } from 'react'
import { Link, Navigate, useNavigate } from 'react-router-dom'
import { login as authLogin } from '../store/authSlice'
import { Button, Input } from './index'
import Logo from './Logo/Logo'
import { useDispatch } from 'react-redux'
import authService, { AuthService } from '../appwrite/auth'
import { useForm } from 'react-hook-form'


function Login() {

    const navigation = useNavigate();
    const dispatch = useDispatch();
    const {register, handleSubmit} = useForm();
    const [error, setError] = useState('');


    const login = async() => {
        setError("");
        try {
            const session = await authService.login(data);
            if (session) {
                const userData = await authService.getCurrentUser();
                if (userData) dispatch(authLogin(userData));
                Navigate('/');   
            }
        } catch (error) {
            setError(error.message);
        }
    }



  return (
    <div
    className='flex items-center justify-center w-full'
    >
        <div
        className={`mx-auto w-full max-w-lg bg-gray-100 rounded-xl p-10 border border-black/10`}
        >
            <div
            className='mv-2 flex justify-center'
            >
                <span
                className='inline-block w-full max-w-[100px]'
                >
                    <Logo width="100%" />
                </span>
            </div>

            <h2
            className='text-center text-2xl font-bold'
            >
                Sign in to your account
            </h2>

            <p
            className='mt-2 text-center text-base text-black/60'
            >
                Don&apos;t have any account?
                &nbsp;
                <Link
                to={`/signup`}
                className='font-medium text-primary transition-all duration-200 hover:underline'
                >
                    Sign Up
                </Link>
            </p>

            {error && <p className='text-red-500 mt-8 text-center'>{error}</p>}



            <form
            onSubmit={handleSubmit(login)}
            className='mt-8'
            >
                <div
                className='space-y-5'
                >
                    <Input
                    lebel="Email: "
                    placeholder="Enter your email"
                    type="email"
                    {...register("email", {
                        required: true,
                        validate: {
                            matchPatern: (value) => {
                                /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/.test(value) || "Please enter a valid email"
                            }
                        }
                    })}
                    />

                    <Input
                        label="Password: "
                        placeholder="Enter your password"
                        type="password"
                        {...register("password", {
                            required: true
                        })}
                    />

                    <Button
                    type="submit"
                    className="w-full"
                    >
                        Sign in
                    </Button>
                </div>
            </form>
        </div>

    </div>
  )
}

export default Login