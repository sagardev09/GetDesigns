"use client"
import React, { useState } from 'react'
import { useFormik } from 'formik';
import * as Yup from 'yup';
import Link from 'next/link';
import { useAppContext } from '../utils/GlobalContext';


const LoginForm = () => {

    const [loading, setloading] = useState(false)


    const { login } = useAppContext()


    const formik = useFormik({
        initialValues: {
            email: '',
            password: '',
        },
        validationSchema: Yup.object({
            email: Yup.string().email("invalid email address")
                .required('Required'),
            password: Yup.string()
                .min(6, 'Must be 6 characters or more')
                .required('Required'),
        }),
        onSubmit: values => {
            handleLogin(values)
        },
    });


    const handleLogin = async (values) => {
        setloading(true)
        await login(values)

        setloading(false)
    }

    return (
        <div>
            <h1 className='capitalize font-medium'>Sign in to getdesigns</h1>
            <form action="#" className="mt-8 grid grid-cols-6 gap-6" onSubmit={formik.handleSubmit}>
                <div className="col-span-12">
                    <label htmlFor="Email" className="block text-sm font-medium text-gray-700"> Email </label>

                    <input
                        type="email"
                        id="email"
                        name="email"
                        placeholder='email'
                        className="mt-1 w-full border px-2 py-3  rounded-md border-gray-200 bg-white text-sm text-gray-700 shadow-sm"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.email}
                    />
                    {formik.touched.email && formik.errors.email ? (
                        <div className='mt-1' >
                            <p className='text-xs text-red-500 '>{formik.errors.email}</p>
                        </div>
                    ) : null}
                </div>

                <div className="col-span-12 ">
                    <label htmlFor="Password" className="block text-sm font-medium text-gray-700"> Password </label>

                    <input
                        type="password"
                        id="Password"
                        name="password"
                        placeholder='passowrd'
                        className="mt-1 w-full border px-2 py-3  rounded-md border-gray-200 bg-white text-sm text-gray-700 shadow-sm"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.password}
                    />
                    {formik.touched.password && formik.errors.password ? (
                        <div className='mt-1' >
                            <p className='text-xs text-red-500 ' >{formik.errors.password}</p>
                        </div>
                    ) : null}
                </div>
                <div className="col-span-6 sm:flex sm:items-center sm:gap-4">
                    <button
                        className="inline-block shrink-0 rounded-md border border-blue-600 bg-blue-600 px-12 py-3 text-sm font-medium text-white transition hover:bg-transparent hover:text-blue-600 focus:outline-none focus:ring active:text-blue-500"
                    >
                        {loading ? "loging in" : "Login"}
                    </button>

                    <p className="mt-4 text-sm text-gray-500 sm:mt-0">
                        {"Don't"} have an account?
                        <Link href="/signup" className="text-gray-700 underline">Sign up</Link>.
                    </p>
                </div>
            </form>
        </div>
    )
}

export default LoginForm