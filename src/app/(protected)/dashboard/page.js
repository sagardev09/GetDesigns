"use client"
import React, { useState } from 'react'
import DesignComponent from '@/app/_components/DesignComponent'


const Dashboard = () => {
    const [active, setactive] = useState("New Designs")
    return (
        <div className='flex w-full flex-col px-8 min-h-screen bg-[#1B2430]'>
            <div className='flex w-full justify-between px-4 sm:px-6 lg:px-8 mt-10'>
                <div className='flex space-x-10'>
                    <span onClick={() => setactive("New Designs")} className={(active === "New Designs" ? "border-b border-primary pb-3 text-white cursor-pointer" : "pb-3 text-white cursor-pointer")}>New Designs</span>
                    <span onClick={() => setactive("Your Designs")} className={(active === "Your Designs" ? "border-b border-primary pb-3 text-white cursor-pointer" : "pb-3 text-white cursor-pointer")}>Your Designs</span>
                </div>
                <div>
                    <button className='bg-primary px-6 py-3 text-white font-semibold rounded-md'>Create design</button>
                </div>
            </div>
            <div className='my-20'>
                <DesignComponent />
            </div>
        </div>
    )
}

export default Dashboard