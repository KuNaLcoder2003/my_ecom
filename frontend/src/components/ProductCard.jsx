import React, { useState } from 'react'

import prod_image from "/assets/Assets/product_21.png"
import { Minus, Plus } from 'lucide-react';
import { useNavigate } from 'react-router-dom';



const ProductCard = ({ product }) => {

    const navigate = useNavigate()

    return (
        <div className='max-w-[300px] m-auto h-auto rounded-lg shadow-lg shadow-indigo-200'>
            <div className='flex flex-col  p-0 gap-4'>

                <div className='overflow-hidden'>

                    <img src={product.image.url} className='object-cover rounded-t-lg' />

                </div>

                <div className='p-4 flex flex-col items-baseline gap-4'>

                    <p className='w-[100%] truncate text-lg font-semibold text-stone-500'>{product ? product.name : "Men Green Solid Zippered Full-Zip Slim Fit Bomber Jacket"}</p>
                    <div className='flex w-[100%] items-cemt'>
                        <p className='text-md font-semibold'>$30</p>
                    </div>
                    <button onClick={()=>navigate(`/product/${product.id}`)}  className='w-[100%] cursor-pointer p-2 bg-red-400 text-white rounded-lg'>View Product</button>
                    
                </div>

            </div>
        </div>
    )
}

export default ProductCard
