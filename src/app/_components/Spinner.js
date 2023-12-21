import React from 'react'
import spinner from "../../../public/spinner.gif"
import Image from 'next/image'

const Spinner = () => {
    return (
        <div className='min-h-screen flex flex-col items-center justify-center gap-4'>
            <Image src={spinner} alt='spinner' className=' h-[300px] w-[500px]' />
            <h1 className='uppercase text-xl font-semibold'>Loading...</h1>
        </div>
    )
}

export default Spinner