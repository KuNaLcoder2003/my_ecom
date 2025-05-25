import React, { useState } from 'react'
import Navbar from '../components/Navbar'
import { useFetchAdmin } from '../hooks/fetch';

const Upload = () => {
    const { admin, loading, error } = useFetchAdmin();
    const [productData, setProductData] = useState({
        product_name: '',
        product_description: '',
        product_price: 0,
        product_stock: '',
    })
    const handleFiles = (e)=>{
        console.log(e.target.files)
    }
    return (
        <div className=''>
            {
                loading ? (<div>Loading...</div>) : (
                    <div>
                        <Navbar isLoggedIn={true} userName={`${admin.first_name} ${admin.last_name}`} img={admin.avatar} />

                        <form className='max-w-7xl shadow-lg rounded-lg p-4'>

                            <div className='flex flex-col gap-8 h-auto items-center justify-center w-[100%]'>

                                <div className='flex items-center w-[100%] flex-wrap justify-around gap-10'>
                                    <input
                                        type="text"
                                        placeholder="Enter product name"
                                        className="w-full sm:w-1/2 md:w-1/3 lg:w-1/4 xl:w-1/5 px-4 py-2 rounded-lg text-zinc-600 placeholder:text-zinc-400 shadow-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                                    />

                                    <input type='number' placeholder='Enter product price' className="w-full sm:w-1/2 md:w-1/3 lg:w-1/4 xl:w-1/5 px-4 py-2 rounded-lg text-zinc-600 placeholder:text-zinc-400 shadow-md focus:outline-none focus:ring-2 focus:ring-indigo-500" />
                                    <input type='number' placeholder='Enter product stock' className="w-full sm:w-1/2 md:w-1/3 lg:w-1/4 xl:w-1/5 px-4 py-2 rounded-lg text-zinc-600 placeholder:text-zinc-400 shadow-md focus:outline-none focus:ring-2 focus:ring-indigo-500" />
                                </div>

                                <div className='w-[100%] m-auto'>
                                    <textarea rows={10} className='w-[90%] m-auto p-2 shadow-lg rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500' placeholder='Enter product description'/>
                                </div>

                                <div className=''>
                                    <input
                                        type="file"
                                        multiple
                                        className='w-[80%] px-4 py-2 focus:outline-none shadow-lg rounded-lg shadow-indigo-300'
                                        onChange={(e)=>handleFiles(e)}
                                    />
                                </div>

                                <button className='w-[40%] px-4 py-2 bg-indigo-600 text-white font-semibold rounded-lg'>Add Product</button>

                            </div>

                        </form>

                    </div>)
            }
        </div>
    )
}

export default Upload
