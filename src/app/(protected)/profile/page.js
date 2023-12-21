"use client"
import { ChevronLeft } from 'lucide-react'
import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import Image from 'next/image'
import { useAppContext } from '@/app/utils/GlobalContext'


const Profile = () => {
    const router = useRouter()
    const { getuserinfo, getuserdetails } = useAppContext()
    const [loggedinuser, setloggedinuser] = useState(null)

    useEffect(() => {
        currentuser()
    }, [])

    const currentuser = async () => {
        let user = await getuserinfo()
        const userid = user.$id
        let userdetails = await getuserdetails(userid)
        setloggedinuser({ ...userdetails })
        console.log(userdetails);
    }

    return (
        <div className='bg-[#1B2430] text-white px-[64px] flex flex-col space-y-4 min-h-screen'>
            <div className='flex items-center justify-start space-x-10'>
                <div className='h-[45px] w-[45px] flex items-center justify-center bg-primary rounded-full cursor-pointer' onClick={() => router.back()}>
                    <ChevronLeft className='mr-1' />
                </div>
                <div>
                    <h5 className='text-lg capitalize font-semibold'>Welcome user</h5>
                </div>
            </div>
            <div className='flex items-center justify-between w-full pt-10'>
                <div className='flex space-x-8 items-center'>
                    <div className='h-[150px] w-[150px] rounded-full bg-white'>
                        <Image />
                    </div>
                    <div className='flex flex-col space-y-2'>
                        <h5 className='text-xl capitalize font-medium'>{loggedinuser?.name}</h5>
                        <h5 className='text-xs font-light opacity-70'>{loggedinuser?.email}</h5>
                        <h5>{loggedinuser?.bio}</h5>
                    </div>
                </div>
                <div>
                    <h5 className='text-sm capitalize  hover:underline cursor-pointer'>edit profile</h5>
                </div>
            </div>
            <div className='py-10'></div>
            <div className='w-full'>
                <h2>
                    work
                </h2>

                <div className='flex justify-center mt-20'>
                    <h1>no designs yet</h1>
                </div>
            </div>

        </div>
    )
}

export default Profile