import React from 'react'
import Link from 'next/link'

const Hero = () => {
    return (
        <div>
            <section className="bg-[#1B2430] text-white">
                <div className="mx-auto max-w-screen px-4 py-32 lg:flex lg:h-screen/2  lg:items-center">
                    <div className="mx-auto max-w-3xl text-center">
                        <h1
                            className="bg-gradient-to-r from-green-300 via-blue-500 to-purple-600 bg-clip-text text-3xl font-extrabold text-transparent sm:text-6xl"
                        >
                            Design  Dreams  Share,

                            <span className="sm:block my-1"> Inspire  Create! </span>
                        </h1>

                        <p className="mx-auto mt-4 max-w-xl sm:text-xl/relaxed">
                            Unleash Your Creativity: Upload Your Designs, Get Inspired, and Spark Your Imagination with our Design Hub!
                        </p>

                        <div className="mt-8 flex flex-wrap justify-center gap-4">
                            <Link
                                className="block w-full rounded border border-primary bg-primary px-12 py-3 text-sm font-medium text-white  focus:ring active:text-opacity-75 sm:w-auto"
                                href="/signup"
                            >
                                Get Started
                            </Link>

                            <a
                                className="block w-full rounded border border-primary px-12 py-3 text-sm font-medium text-primary  focus:outline-none focus:ring sm:w-auto"
                                href="/"
                            >
                                Learn More
                            </a>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    )
}

export default Hero