import Link from 'next/link'
import React from 'react'

const ProtectedNav = () => {
    return (
        <header className="bg-[#1B2430] w-full px-8 py-6">
            <div className="mx-auto flex h-16 max-w-screen items-center justify-between gap-8 px-4 sm:px-6 lg:px-8">
                <div>
                    <Link className="block text-white" href="/">
                        <span className="sr-only">Home</span>
                        <h5 className='font-semibold uppercase'>GetDesigns</h5>
                    </Link>
                </div>
                <div className="flex items-center">
                    <Link href={"/profile"}>
                        <div className='h-[40px] w-[40px] rounded-full border bg-primary flex items-center justify-center cursor-pointer'>
                            <h5 className='text-white'>S</h5>
                        </div>
                    </Link>
                </div>
            </div>
        </header>
    )
}

export default ProtectedNav