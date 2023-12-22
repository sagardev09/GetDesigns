"use client"
import React, { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useAppContext } from '@/app/utils/GlobalContext'



const Addnewdesign = () => {
    const router = useRouter()
    const { createdesign, storeprofilepic, getuserinfo } = useAppContext()
    const [file, setfile] = useState("")
    const [title, settitle] = useState("")
    const [desc, setdesc] = useState("")
    const [category, setcategory] = useState("")
    const [id, setid] = useState("")
    const [loading, setloading] = useState(false)




    //create new design

    const createnewDesign = async () => {

        if (!title || !desc || !file) {
            alert("all fields are mandatory")
            return
        }
        setloading(true)

        const designfile = document.getElementById("designimage").files[0]

        const imageId = await storeprofilepic(designfile)
        let user = await getuserinfo();
        let userId = user.$id;

        const userinfo = { imageId, title, desc, category, userId }
        await createdesign(userinfo)
        setloading(false)
        router.push("/dashboard")
    }

    // handle design change

    const handledesignChange = (e) => {
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



    return (
        <div className='min-h-screen bg-[#1B2430] text-white px-[64px]'>
            <div className='w-full flex items-center justify-between'>
                <button className='bg-transparent border text-white px-8 py-3 rounded-3xl capitalize text-xs' onClick={() => router.back()}>
                    cancel
                </button>
                <button className='bg-primary text-white px-8 py-3 rounded-3xl capitalize text-xs' onClick={createnewDesign}>
                    {loading ? "Creating..." : "Create"}
                </button>
            </div>
            <div className='w-full my-10'>
                <div>
                    <div>
                        <div className="flex items-center justify-center w-full relative">
                            <label for="dropzone-file" className="flex flex-col items-center justify-center w-full h-[450px] border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-700 ">
                                {file ? (
                                    <img src={file} alt="" className='object-contain h-[500px] w-[500px]' />
                                ) : <div className="flex flex-col items-center justify-center pt-5 pb-6">
                                    <svg className="w-8 h-8 mb-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 16">
                                        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2" />
                                    </svg>
                                    <p className="mb-2 text-sm text-gray-500 dark:text-gray-400"><span className="font-semibold">Click to upload</span> or drag and drop</p>
                                    <p className="text-xs text-gray-500 dark:text-gray-400">SVG, PNG, JPG or GIF (MAX. 800x400px)</p>
                                </div>}
                                <input id="designimage" type="file" className="opacity-0 absolute h-full w-full cursor-pointer"
                                    onChange={handledesignChange} />
                            </label>
                        </div>
                        {file && <div className='mt-3 flex items-center justify-end'>
                            <button className='bg-black p-3 px-6 rounded-full text-xs capitalize'
                                onClick={() => setfile(null)}>clear image</button>
                        </div>}
                    </div>
                    <div className='mt-2'>
                        <div>
                            <div>
                                <label htmlFor="Title" className="block text-xs font-medium text-white"> Title </label>

                                <input
                                    disabled={!file}
                                    value={title}
                                    onChange={(e) => settitle(e.target.value)}
                                    type="text"
                                    id="title"
                                    placeholder="xyz@rhcp.com"
                                    className="mt-1 w-full text-white bg-gray-700 rounded-md p-3 border-gray-200 shadow-sm sm:text-sm"
                                />
                            </div>
                        </div>
                        <div className='mt-3'>
                            <label for="OrderNotes" class="block text-sm font-medium text-white"> Description </label>

                            <textarea
                                disabled={!file}
                                value={desc}
                                onChange={(e) => setdesc(e.target.value)}
                                id="description"
                                class="mt-2 w-full rounded-lg p-3 text-white bg-gray-700 resize-none border-gray-200 align-top shadow-sm sm:text-sm"
                                rows="4"
                                placeholder="Enter the description about it..."
                            ></textarea>
                        </div>
                        <div className='mt-3'>
                            <div>
                                <label htmlFor="HeadlineAct" className="block text-sm font-medium text-white"> Category </label>

                                <select
                                    disabled={!file}
                                    value={category}
                                    onChange={(e) => setcategory(e.target.value)}
                                    name="HeadlineAct"
                                    id="HeadlineAct"
                                    className="mt-1.5 w-full p-3 text-white bg-gray-700 rounded-lg border-gray-300  sm:text-sm"
                                >
                                    <option value="default">Select a category</option>
                                    <option value="design">Design Inspiration</option>
                                    <option value="fashion">Fashion Trends</option>
                                    <option value="art">Artistic Creations</option>
                                    <option value="home">Home Decor Ideas</option>
                                    <option value="photography">Photography</option>
                                    <option value="food">Food and Recipes</option>
                                    <option value="travel">Travel Destinations</option>
                                    <option value="wedding">Wedding Planning</option>
                                    <option value="fitness">Fitness Motivation</option>
                                    <option value="quotes">Inspirational Quotes</option>
                                    <option value="technology">Technology Innovations</option>
                                    <option value="diy">DIY Projects</option>
                                </select>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    )
}

export default Addnewdesign