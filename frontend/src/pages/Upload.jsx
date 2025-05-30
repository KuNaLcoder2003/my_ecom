import React, { useState } from 'react'
import Navbar from '../components/Navbar'
import { useFetchAdmin } from '../hooks/fetch';
import toast, { Toaster } from 'react-hot-toast';

const Upload = () => {
    const { admin, loading, error } = useFetchAdmin();
    const [productData, setProductData] = useState({
        product_name: '',
        product_description: '',
        product_price: 0,
        product_stock: '',
        category : '',
        files: []
    })
    const handleFiles = (e) => {

        console.log(e.target.files)

        setProductData({ ...productData, files: e.target.files })

    }

    const handleFormSubmit = (e) => {
        e.preventDefault();

        const formData = new FormData();

        formData.append('product_name', productData.product_name)
        formData.append('product_description', productData.product_description)
        formData.append('product_price', productData.product_price)
        formData.append('product_stock', productData.product_stock)
        formData.append('images', productData.files[0])
        formData.append('images', productData.files[1])
        formData.append('images', productData.files[2])
        formData.append('images', productData.files[3])
        formData.append('category' , productData.category)



        try {
            fetch('http://localhost:3000/api/v1/product', {
                method: 'POST',
                headers: {
                    authorization: localStorage.getItem('token')
                },
                body: formData
            }).then(async (response) => {
                const data = await response.json()
                if (data.valid) {
                    setProductData({
                        product_name: '',
                        product_description: '',
                        product_price: 0,
                        product_stock: '',
                        files: [],
                        category : ''
                    })
                    toast.success(data.message)
                } else {
                    toast.error(data.message)
                }
            })
        } catch (error) {

            console.log(error);

        }
    }

    return (
        <div className=''>
            {
                loading ? (<div>Loading...</div>) : (
                    <div>
                        <Navbar isLoggedIn={true} userName={`${admin.first_name} ${admin.last_name}`} img={admin.avatar} />
                        <Toaster/>

                        <form className='max-w-7xl shadow-lg rounded-lg p-4 m-auto' onSubmit={handleFormSubmit}>

                            <div className='flex flex-col gap-8 h-auto items-center justify-center w-[100%]'>

                                <div className='flex items-center w-[100%] flex-wrap justify-around gap-10'>
                                    <input
                                        onChange={(e) => setProductData({ ...productData, product_name: e.target.value })}
                                        value={productData.product_name}
                                        type="text"
                                        placeholder="Enter product name"
                                        className="w-full sm:w-1/2 md:w-full lg:w-1/4 xl:w-1/5 px-4 py-2 rounded-lg text-zinc-600 placeholder:text-zinc-400 shadow-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                                    />
                                    <input
                                        onChange={(e) => setProductData({ ...productData, category: e.target.value })}
                                        value={productData.category}
                                        type="text"
                                        placeholder="Enter product catrgory"
                                        className="w-full sm:w-1/2 md:w-full lg:w-1/4 xl:w-1/5 px-4 py-2 rounded-lg text-zinc-600 placeholder:text-zinc-400 shadow-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                                    />

                                    <input value={productData.product_price} onChange={(e) => setProductData({ ...productData, product_price: e.target.value })} type='number' placeholder='Enter product price' className="w-full sm:w-1/2 md:w-1/3 lg:w-1/4 xl:w-1/5 px-4 py-2 rounded-lg text-zinc-600 placeholder:text-zinc-400 shadow-md focus:outline-none focus:ring-2 focus:ring-indigo-500" />
                                    <input type='number' value={productData.product_stock} onChange={(e) => setProductData({ ...productData, product_stock: e.target.value })} placeholder='Enter product stock' className="w-full sm:w-1/2 md:w-1/3 lg:w-1/4 xl:w-1/5 px-4 py-2 rounded-lg text-zinc-600 placeholder:text-zinc-400 shadow-md focus:outline-none focus:ring-2 focus:ring-indigo-500" />
                                </div>

                                <div className='w-[100%] m-auto'>
                                    <textarea rows={10} value={productData.product_description} onChange={(e) => setProductData({ ...productData, product_description: e.target.value })} className='w-[90%] m-auto p-2 shadow-lg rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500' placeholder='Enter product description' />
                                </div>

                                <div className=''>
                                    <input
                                        type="file"
                                        multiple
                                        className='w-[80%] px-4 py-2 focus:outline-none shadow-lg rounded-lg shadow-indigo-300'
                                        onChange={(e) => handleFiles(e)}
                                    />
                                </div>

                                <button type="submit" className='w-[40%] px-4 py-2 bg-indigo-600 text-white font-semibold rounded-lg'>Add Product</button>

                            </div>

                        </form>

                    </div>)
            }
        </div>
    )
}

export default Upload
