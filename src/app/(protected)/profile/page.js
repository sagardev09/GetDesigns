"use client"
import { ChevronLeft } from 'lucide-react'
import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import Image from 'next/image'
import { useAppContext } from '@/app/utils/GlobalContext'
import Spinner from '@/app/_components/Spinner'
import ProfileDialog from '@/app/_components/ProfileDialog'
import DesignComponent from '@/app/_components/DesignComponent'



const Profile = () => {
    const router = useRouter()
    const { getuserinfo, getuserdetails, profilePreview, fetchDesigns } = useAppContext()
    const [loggedinuser, setloggedinuser] = useState()
    const [loading, setloading] = useState(false)
    const [profilemodalstate, setprofilemodalstate] = useState(false)
    const [file, setfile] = useState("")
    const [userId, setuserId] = useState()
    const [userdesigns, setuserdesigns] = useState([])

    useEffect(() => {
        currentuser()
    }, [])

    const currentuser = async () => {
        setloading(true);
        try {
            let user = await getuserinfo();
            const userid = user?.$id;
            setuserId(userid);
            if (userid) {
                let userdetails = await getuserdetails(userid);
                fetchdesigns(userid)

                setloggedinuser({ ...userdetails });
                if (userdetails?.profileimage) {
                    await handleprofileimage(userdetails?.profileimage);
                }
            }


            setloading(false);
        } catch (error) {
            console.error("Error fetching user data:", error);
            setloading(false);
        }
    };

    const fetchdesigns = async (id) => {
        let records = await await fetchDesigns(id, "")
        setuserdesigns(records.documents)
    }

    const handleprofileimage = async (id) => {
        try {
            const url = await profilePreview(id);
            setfile(url)
        } catch (error) {
            console.error("Error fetching profile image:", error);
        }
    };


    return (
        <div className='bg-[#1B2430] text-white px-[64px] flex flex-col space-y-4 min-h-screen'>
            {loading ? <div>
                <Spinner />
            </div> : <>
                <div className='flex items-center justify-start space-x-10'>
                    <div className='h-[45px] w-[45px] flex items-center justify-center bg-primary rounded-full cursor-pointer' onClick={() => router.back()}>
                        <ChevronLeft className='mr-1' />
                    </div>
                    <div>
                        <h5 className='text-lg capitalize font-semibold'>Welcome {loggedinuser?.name}</h5>
                    </div>
                </div>
                <div className='flex items-center justify-between w-full pt-10'>
                    <div className='flex space-x-8 items-center'>
                        <div className='h-[150px] w-[150px] rounded-full bg-gray-200 overflow-hidden flex items-center justify-center'>
                            {!file && (
                                <h5 className='text-black font-semibold uppercase text-6xl'>{loggedinuser && loggedinuser?.name?.[0]}</h5>
                            )}
                            {file && <img src={file} className='h-full w-full object-cover object-center' />}
                        </div>
                        <div className='flex flex-col space-y-2'>
                            <h5 className='text-xl capitalize font-medium'>Name : {loggedinuser?.name}</h5>
                            <h5 className='text-xs font-light opacity-70'>userid : {(loggedinuser?.email ? loggedinuser.email.split('@')[0] : 'N/A')}</h5>
                            <h5 className='text-xl capitalize font-medium'>Bio : {loggedinuser?.bio}</h5>
                        </div>
                    </div>
                    <div>
                        <h5 className='text-sm capitalize  hover:underline cursor-pointer' onClick={() => setprofilemodalstate(true)}>edit profile</h5>
                    </div>
                </div>
                <div className='py-10'></div>
                <div className='w-full'>
                    <h2>
                        work
                    </h2>
                    <div className='flex justify-center mt-10'>
                        {userdesigns.length === 0 ? <h1>no designs yet</h1> :
                            <DesignComponent finalRecords={userdesigns} userRecords={null} />}
                    </div>
                </div>

            </>}
            <ProfileDialog setprofilemodalstate={setprofilemodalstate} profilemodalstate={profilemodalstate} loggedinuser={loggedinuser} userId={userId} currentuser={currentuser} />
        </div>
    )
}

export default Profile