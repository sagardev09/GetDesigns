"use client"
import Spinner from '@/app/_components/Spinner'
import { useAppContext } from '@/app/utils/GlobalContext'
import React, { useEffect, useState } from 'react'
import DashBoardImages from '../../_components/DashBoardImages'
import { Heart } from 'lucide-react'
import DashboardProfileimage from '../../_components/DashboardProfileimage'

const DesignInfo = ({ params }) => {

    const [loading, setloading] = useState(false)
    const { fetchDesigns } = useAppContext()
    const [Design, setDesign] = useState([])

    useEffect(() => {
        if (params) {
            const designId = params.id
            console.log(designId);
            fetchDesignDetails(designId)
        }
    }, [params])

    const fetchDesignDetails = async (designId) => {
        setloading(true)
        const design = await fetchDesigns("", designId)
        console.log("design", design);
        setDesign(design.documents)
        setloading(false)
    }

    return (
        <div className='flex w-full flex-col px-16 min-h-screen items-center bg-[#1B2430]'>
            {
                loading ? <Spinner /> : (
                    Design.length === 0 ? (<p>Upload Designs Please</p>) : (
                        <div className='w-full flex flex-col space-y-3  max-w-4xl'>
                            <div className='w-full'>
                                <DashBoardImages imageid={Design[0]["image"]} height={700} />
                            </div>
                            <div className='flex items-center justify-end gap-4'>
                                <Heart className='text-red-500' />
                                <span className='text-red-500'> 0</span>
                            </div>
                            <div>
                                <h5 className='text-white font-semibold text-2xl'>{Design[0]["title"]}</h5>
                            </div>
                            <div className='flex items-center gap-3'>
                                <div>
                                    {/* <DashboardProfileimage imageid={}/> */}
                                </div>
                                <div></div>
                            </div>
                        </div>
                    )
                )
            }
        </div>
    )
}

export default DesignInfo