import { useAppContext } from '@/app/utils/GlobalContext'
import React, { useState, useEffect } from 'react'


const DashboardProfileimage = ({ imageid }) => {
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
            {imageid ? <img className='w-8 h-8 rounded-full' src={file} alt="" /> : (
                <h5>A</h5>
            )}
        </div>
    )
}

export default DashboardProfileimage