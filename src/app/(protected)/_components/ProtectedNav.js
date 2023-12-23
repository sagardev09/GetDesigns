"use client"
import { useAppContext } from '@/app/utils/GlobalContext'
import { ChevronDown } from 'lucide-react'
import Link from 'next/link'
import React, { useState, useEffect } from 'react'
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { useRouter } from 'next/navigation'

const ProtectedNav = () => {
    const { profilePreview, getuserinfo, getuserdetails, logout } = useAppContext()
    const [file, setfile] = useState("")
    const [UserDeatils, setUserDeatils] = useState()
    const [active, setactive] = useState(false)

    useEffect(() => {
        currentuser()
        console.log(active);
    }, [active])
    const router = useRouter()

    const currentuser = async () => {

        try {
            let user = await getuserinfo();
            const userid = user?.$id;
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

    const handlelogout = async () => {
        await logout()
        router.push("/")
    }

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
                        <DropdownMenu>
                            <DropdownMenuTrigger>
                                <ChevronDown className='text-white' />
                            </DropdownMenuTrigger>
                            <DropdownMenuContent>
                                <DropdownMenuLabel>My Account</DropdownMenuLabel>
                                <DropdownMenuSeparator />
                                <Link href={"/profile"}>
                                    <DropdownMenuItem>My Profile</DropdownMenuItem>
                                </Link>
                                <DropdownMenuItem onClick={() => handlelogout()}>Logout</DropdownMenuItem>
                            </DropdownMenuContent>
                        </DropdownMenu>
                    </div>
                </div>
            </div>

        </header>
    )
}

export default ProtectedNav