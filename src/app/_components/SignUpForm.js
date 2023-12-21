"use client"
import Link from 'next/link'
import React, { useState } from 'react'
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useAppContext } from '../utils/GlobalContext';

const SignUpForm = () => {

    const [loading, setloading] = useState(false)


    const { signup, createuserprofile } = useAppContext()


    const formik = useFormik({
        initialValues: {
            firstname: "",
            lastname: "",
            email: '',
            password: '',
            confirmPassword: ''
        },
        validationSchema: Yup.object({
            email: Yup.string().email("invalid email address")
                .required('Required'),
            password: Yup.string()
                .min(6, 'Must be 6 characters or more')
                .required('Required'),
            firstname: Yup.string().min(3, "Must be 3 characters ").required("Required"),
            lastname: Yup.string().min(3, "Must be 3 characters "),
            confirmPassword: Yup.string().min(6, "Must be 6 characters or more").required("Required"),
        }),
        onSubmit: values => {
            if (values.password !== values.confirmPassword) {
                formik.setFieldError('confirmPassword', 'Passwords do not match')
            } else {
                handleSignup(values);
            }

        },
    });

    const handleSignup = async (values) => {
        setloading(true)
        await signup(values)
        setloading(false)
    }


    return (
        <div>
            <h1 className='capitalize font-medium mt-2'>Log in to getdesigns</h1>
            <form className="mt-8 grid grid-cols-6 gap-6" onSubmit={formik.handleSubmit}>
                <div className="col-span-6 sm:col-span-3">
                    <label htmlFor="firstname" className="block text-sm font-medium text-gray-700">
                        First Name
                    </label>
                    <input
                        type="text"
                        id="firstname"
                        name="firstname"
                        placeholder='firstname'
                        className="mt-1 w-full border px-2 py-3 rounded-md border-gray-200 bg-white text-sm text-gray-700 shadow-sm"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.firstname}
                    />
                    {formik.touched.firstname && formik.errors.firstname ? (
                        <div className='mt-1' >
                            <p className='text-xs text-red-500 '>{formik.errors.firstname}</p>
                        </div>
                    ) : null}
                </div>

                <div className="col-span-6 sm:col-span-3">
                    <label htmlFor="lastname" className="block text-sm font-medium text-gray-700">
                        Last Name
                    </label>

                    <input
                        type="text"
                        placeholder='lastname'
                        id="lastname"
                        name="lastname"
                        className="mt-1 w-full border px-2 py-3 rounded-md border-gray-200 bg-white text-sm text-gray-700 shadow-sm"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.lastname}
                    />
                    {formik.touched.lastname && formik.errors.lastname ? (
                        <div className='mt-1' >
                            <p className='text-xs text-red-500 '>{formik.errors.lastname}</p>
                        </div>
                    ) : null}
                </div>

                <div className="col-span-6">
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700"> Email </label>

                    <input
                        type="email"
                        placeholder='email'
                        id="email"
                        name="email"
                        className="mt-1 w-full border px-2 py-3 rounded-md border-gray-200 bg-white text-sm text-gray-700 shadow-sm"
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

                <div className="col-span-6 sm:col-span-3">
                    <label htmlFor="password" className="block text-sm font-medium text-gray-700"> Password </label>

                    <input
                        type="password"
                        placeholder='password'
                        id="password"
                        name="password"
                        className="mt-1 w-full border px-2 py-3 rounded-md border-gray-200 bg-white text-sm text-gray-700 shadow-sm"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.password}
                    />
                    {formik.touched.password && formik.errors.password ? (
                        <div className='mt-1' >
                            <p className='text-xs text-red-500 '>{formik.errors.password}</p>
                        </div>
                    ) : null}
                </div>

                <div className="col-span-6 sm:col-span-3">
                    <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700">
                        Password Confirmation
                    </label>

                    <input
                        type="password"
                        placeholder='confirmPassword'
                        id="confirmPassword"
                        name="confirmPassword"
                        className="mt-1 w-full border px-2 py-3 rounded-md border-gray-200 bg-white text-sm text-gray-700 shadow-sm"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.confirmPassword}
                    />
                    {formik.touched.confirmPassword && formik.errors.confirmPassword ? (
                        <div className='mt-1' >
                            <p className='text-xs text-red-500 '>{formik.errors.confirmPassword}</p>
                        </div>
                    ) : null}
                </div>


                <div className="col-span-6">
                    <p className="text-sm text-gray-500">
                        By creating an account, you agree to our
                        <a href="#" className="text-gray-700 underline"> terms and conditions </a>
                        and
                        <a href="#" className="text-gray-700 underline">privacy policy</a>.
                    </p>
                </div>

                <div className="col-span-6 sm:flex sm:items-center sm:gap-4">
                    <button
                        className="inline-block shrink-0 rounded-md border border-blue-600 bg-blue-600 px-12 py-3 text-sm font-medium text-white transition hover:bg-transparent hover:text-blue-600 focus:outline-none focus:ring active:text-blue-500"
                    >
                        {loading ? "Signing up ..." : "Create an account"}
                    </button>

                    <p className="mt-4 text-sm text-gray-500 sm:mt-0">
                        Already have an account?
                        <Link href="/login" className="text-gray-700 underline">Log in</Link>.
                    </p>
                </div>
            </form>
        </div>
    )
}

export default SignUpForm