import { useAppContext } from '@/app/utils/GlobalContext'
import React, { useState, useEffect } from 'react'


const DashBoardImages = ({ imageid, height }) => {
    const { profilePreview } = useAppContext()

    const [file, setfile] = useState()

    useEffect(() => {
        if (imageid) {
            setImages()
        }

    }, [imageid])

    const setImages = async () => {
        const url = await profilePreview(imageid)
        setfile(url)
    }
    return (
        <div>
            <img className='w-full h-auto' src={file} alt="" />
        </div>
    )
}

export default DashBoardImages