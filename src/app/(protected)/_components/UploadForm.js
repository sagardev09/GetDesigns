import React from 'react'
import Image from 'next/image'

const UploadForm = ({ setfile, file, settitle, setdesc, setcategory, title, desc, category }) => {
    return (
        <div>
            <div>
                <div className="flex items-center justify-center w-full">
                    <label for="dropzone-file" className="flex flex-col items-center justify-center w-full h-[450px] border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-700 ">
                        {file ? (
                            <Image src={window.URL.createObjectURL(file)} alt={file.name} height={500} width={500} className='object-contain h-[90%]' />
                        ) : <div className="flex flex-col items-center justify-center pt-5 pb-6">
                            <svg className="w-8 h-8 mb-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 16">
                                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2" />
                            </svg>
                            <p className="mb-2 text-sm text-gray-500 dark:text-gray-400"><span className="font-semibold">Click to upload</span> or drag and drop</p>
                            <p className="text-xs text-gray-500 dark:text-gray-400">SVG, PNG, JPG or GIF (MAX. 800x400px)</p>
                        </div>}
                        <input id="dropzone-file" type="file" className="hidden" onChange={(e) => setfile(e.target.files[0])} />
                    </label>
                </div>
                {file && <div className='mt-3 flex items-center justify-end'>
                    <button className='bg-black p-3 px-6 rounded-full text-xs capitalize' onClick={() => setfile(null)}>clear image</button>
                </div>}
            </div>
            <div className='mt-2'>
                <div>
                    <div>
                        <label htmlFor="UserEmail" className="block text-xs font-medium text-white"> Email </label>

                        <input
                            disabled={!file}
                            value={title}
                            onChange={(e) => settitle(e.target.value)}
                            type="email"
                            id="UserEmail"
                            placeholder="xyz@rhcp.com"
                            className="mt-1 w-full text-white bg-gray-700 rounded-md p-3 border-gray-200 shadow-sm sm:text-sm"
                        />
                    </div>
                </div>
                <div className='mt-3'>
                    <label for="OrderNotes" class="block text-sm font-medium text-white"> Order notes </label>

                    <textarea
                        disabled={!file}
                        value={desc}
                        onChange={(e) => setdesc(e.target.value)}
                        id="OrderNotes"
                        class="mt-2 w-full rounded-lg p-3 text-white bg-gray-700 resize-none border-gray-200 align-top shadow-sm sm:text-sm"
                        rows="4"
                        placeholder="Enter any additional order notes..."
                    ></textarea>
                </div>
                <div className='mt-3'>
                    <div>
                        <label htmlFor="HeadlineAct" className="block text-sm font-medium text-white"> Headliner </label>

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
    )
}

export default UploadForm