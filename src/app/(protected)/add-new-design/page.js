"use client"
import React, { useState } from 'react'
import UploadForm from '../_components/UploadForm'


const Addnewdesign = () => {
    const [file, setfile] = useState(null)
    const [title, settitle] = useState("")
    const [desc, setdesc] = useState("")
    const [category, setcategory] = useState("")
    return (
        <div className='min-h-screen bg-[#1B2430] text-white px-[64px]'>
            <div className='w-full flex items-center justify-between'>
                <button className='bg-transparent border text-white px-8 py-3 rounded-3xl capitalize text-xs'>
                    cancel
                </button>
                <button className='bg-primary text-white px-8 py-3 rounded-3xl capitalize text-xs'>
                    create
                </button>
            </div>
            <div className='w-full my-10'>
                <UploadForm file={file} setfile={setfile} settitle={settitle} setdesc={setdesc} setcategory={setcategory} title={title} desc={desc} category={category} />
            </div>
        </div>
    )
}

export default Addnewdesign