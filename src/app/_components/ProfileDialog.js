"use client"
import React, { useState, useEffect } from 'react'
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,

} from "@/components/ui/dialog"
import Image from 'next/image'
import { Camera } from 'lucide-react'
import { useAppContext } from '../utils/GlobalContext'


const ProfileDialog = ({ setprofilemodalstate, profilemodalstate, loggedinuser, userId, currentuser }) => {

    const { storeprofilepic, updateUser, profilePreview } = useAppContext()
    const [file, setfile] = useState("")
    const [loading, setloading] = useState(false)
    const [name, setname] = useState(loggedinuser?.name)
    const [bio, setbio] = useState(loggedinuser?.bio)
    const [email, setemail] = useState(loggedinuser?.email)

    useEffect(() => {
        if (profilemodalstate) {
            setname(loggedinuser?.name)
            setemail(loggedinuser?.email)
            setbio(loggedinuser?.bio)
            if (loggedinuser?.profileimage) {
                handleprofileimage(loggedinuser?.profileimage)
            }
        } else {
            setname("")
            setbio("")
            setemail("")
        }
    }, [profilemodalstate])


    const handleprofileimage = async (id) => {
        const url = await profilePreview(id)
        setfile(url)
    }

    const handleProfilePicChange = (e) => {
        const image = e.target.files[0];

        console.log(image);

        if (image) {
            const fileReader = new FileReader();

            fileReader.onloadend = () => {
                setfile(fileReader.result);
            };

            fileReader.readAsDataURL(image);
        } else {
            setfile("");
        }
    };


    const handleSaveProfile = async () => {
        if (!name) {
            alert("name is mandatory")
            return
        }
        setloading(true)
        let profileId = loggedinuser?.profileimage ?? ""
        if (file) {
            profileId = await storeprofilepic(document.getElementById("profilepic").files[0])
        }
        await updateUser(name, email, bio, profileId, userId)
        setloading(false)
        await currentuser()
        setprofilemodalstate(false)
    }

    return (
        <div>
            <Dialog open={profilemodalstate} onOpenChange={setprofilemodalstate}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Edit Profile</DialogTitle>
                        <DialogDescription>
                            Modify below the fields to update your profile
                        </DialogDescription>
                        <div className=' pt-4'>
                            <div className='flex space-x-8 items-center'>
                                <div className='h-[150px] w-[150px] rounded-full bg-gray-300  cursor-pointer relative overflow-hidden'>
                                    {file &&
                                        <img src={file} className='h-full w-[100%] object-cover object-right' alt='profilepic' />

                                    }
                                    <Camera className='text-gray-400' />
                                    <input type="file" className='absolute opacity-0 cursor-pointer top-0 left-0 w-full h-full z-[1000]' name="" id="profilepic"
                                        onChange={handleProfilePicChange} />


                                </div>
                                <div className='flex flex-col space-y-2 grow' >
                                    <div>
                                        <label htmlFor="name" className="block text-xs font-medium text-gray-700"> Name </label>
                                        <input
                                            type="name"
                                            id="name"
                                            value={name}
                                            placeholder="name"
                                            className="mt-1 w-full p-3 border  rounded-md border-gray-400 shadow-sm sm:text-sm"
                                            onChange={(e) => setname(e.target.value)}
                                        />
                                    </div>
                                    <div>
                                        <label htmlFor="Userid" className="block text-xs font-medium text-gray-700"> Userid </label>

                                        <input
                                            type="Userid"
                                            id="Userid"
                                            value={"@" + (email ? email.split('@')[0] : 'N/A')}
                                            disabled
                                            placeholder="userid"
                                            className="mt-1 w-full p-3 border text-gray-400 rounded-md border-gray-400 shadow-sm sm:text-sm"
                                        />
                                    </div>
                                    <div>
                                        <label for="bio" class="block text-sm font-medium text-gray-700"> Bio </label>

                                        <textarea
                                            id="bio"
                                            value={bio}
                                            class="mt-2 w-full rounded-lg p-3 border border-gray-400 align-top shadow-sm sm:text-sm resize-none"
                                            rows="4"
                                            placeholder="Enter bio here..."
                                            onChange={(e) => setbio(e.target.value)}
                                        ></textarea>
                                    </div>
                                    <div>
                                        <button className='bg-black text-white uppercase w-full p-2 py-3 cursor-pointer' onClick={handleSaveProfile}>{loading ? "Saving..." : "Save"}</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </DialogHeader>
                </DialogContent>
            </Dialog>
        </div>
    )
}

export default ProfileDialog