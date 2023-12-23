"use client"
import UserDialog from '@/app/_components/UserDialog'
import { useAppContext } from '@/app/utils/GlobalContext'
import { ChevronDown } from 'lucide-react'
import Link from 'next/link'
import React, { useState, useEffect } from 'react'

const ProtectedNav = () => {
    const { profilePreview, getuserinfo, getuserdetails, } = useAppContext()
    const [file, setfile] = useState("")
    const [UserDeatils, setUserDeatils] = useState()
    const [active, setactive] = useState(false)

    useEffect(() => {
        currentuser()
        console.log(active);
    }, [active])

    const currentuser = async () => {

        try {
            let user = await getuserinfo();
            const userid = user.$id;
            let userdetails = await getuserdetails(userid);
            setUserDeatils({ ...userdetails });
            if (userdetails?.profileimage) {
                await handleprofileimage(userdetails?.profileimage);
            }

        } catch (error) {
            console.error("Error fetching user data:", error);

        }
    };

    const handleprofileimage = async (id) => {
        try {
            const url = await profilePreview(id);
            setfile(url)
        } catch (error) {
            console.error("Error fetching profile image:", error);
        }
    };

    return (
        <header className="bg-[#1B2430] w-full px-8 py-6 relative">
            <div className="mx-auto flex h-16 max-w-screen items-center justify-between gap-8 px-4 sm:px-6 lg:px-8">
                <div>
                    <Link className="block text-white" href="/dashboard">
                        <span className="sr-only">Home</span>
                        <h5 className='font-semibold uppercase'>GetDesigns</h5>
                    </Link>
                </div>
                <div className="flex items-center">
                    <Link href={"/profile"}>
                        <div className='h-[40px] w-[40px] rounded-full border bg-primary flex items-center justify-center cursor-pointer overflow-hidden' >
                            {!file && (
                                <h5 className='text-black font-semibold uppercase'>{UserDeatils && UserDeatils?.name?.[0]}</h5>
                            )}
                            {file && <img src={file} className='h-full w-full object-cover object-center' />}
                        </div>
                    </Link>
                    <div className='cursor-pointer ml-4' >
                        <ChevronDown onClick={() => setactive(!active)} />
                    </div>
                </div>
            </div>
            <div className='absolute right-10 top-[100px]'>
                <UserDialog setactive={setactive} active={active} />
            </div>

        </header>
    )
}

export default ProtectedNav