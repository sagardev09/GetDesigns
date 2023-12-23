"use client"
import { Heart } from 'lucide-react'
import React, { useState, useEffect } from 'react'
import DashBoardImages from '../(protected)/_components/DashBoardImages'
import DashboardProfileimage from '../(protected)/_components/DashboardProfileimage'
import { useRouter } from 'next/navigation'


const DesignComponent = ({ finalRecords, userRecords }) => {

    const router = useRouter()



    return (
        <div className='flex flex-col items-center justify-center grow'>
            {finalRecords.length === 0 ?
                <h1 className='text-white text-xl capitalize'>No designs yet</h1> :
                <div className='grid grid-cols-3 gap-10 w-full'>
                    {finalRecords.map((item, index) => {
                        return (
                            <div key={index} className='flex flex-col space-y-3 w-full  text-gray-500'
                                onClick={() => router.push("/design/" + item.$id)}
                            >
                                <DashBoardImages imageid={item["image"]} height={350} />
                                <div className='flex justify-between items-center'>
                                    <div className='flex items-center gap-3'>
                                        <DashboardProfileimage imageid={userRecords[item?.userid]?.["profileimage"]} />
                                        {userRecords[item?.userid] && <span>{userRecords[item?.userid]?.["name"]}</span>}
                                    </div>
                                    <div className='flex items-center gap-3'>
                                        <Heart className='text-red-500 w-4' />
                                        <span>0</span>
                                    </div>
                                </div>
                            </div>
                        )
                    })}
                </div>
            }
        </div>
    )
}

export default DesignComponent