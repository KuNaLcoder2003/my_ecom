import React, { useEffect, useState } from 'react'
import UserNavbar from '../components/UserNavbar';
import toast, { ToastBar, Toaster } from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

const Cart = ({ isLoggedIn }) => {
    const [cart, setCart] = useState([]);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        try {
            setLoading(true)
            fetch('http://localhost:3000/api/v1/cart/products', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    authorization: localStorage.getItem('token')
                }
            }).then(async (response) => {
                const data = await response.json();
                console.log(data)
                if (data.valid) {
                    setLoading(false)
                    setCart(data.cart.products)
                } else {
                    setCart([])
                    toast.error(data.message)
                    setLoading(false)
                }
            })
        } catch (error) {
            console.log(error)
            toast.error('something went wrong')
        } finally {
            setLoading(false)
        }
    }, [])

    function handleRemoveFromCart(id) {
        if (!id) {
            toast.error('something went wrong')
            return
        }

        try {
            fetch('http://localhost:3000/api/v1/cart/item/', {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                    authorization: localStorage.getItem('token')
                },
                body: JSON.stringify({
                    product: id
                })
            }).then(async (respone) => {
                const data = await respone.json();
                if (data.valid) {
                    if (data.cart.length == 0) {
                        setCart([])
                    } else {
                        setCart(data.cart)
                    }

                } else {
                    toast.error(data.message)
                }
            })
        } catch (error) {
            toast.error('Something went wrong')
        }

    }

    return (

        <div className='relative w-full flex flex-col items-center'>

            <UserNavbar isLoggedIn={isLoggedIn} />


            <div className='w-[60%] mx-auto mt-30 p-4'>
                <Toaster />
                {
                    loading ? <div>
                        Loading...
                    </div> : cart.length == 0 ? <div>No items to show</div> : <div className='flex flex-col w-[70%] m-auto gap-8'>
                        {
                            cart?.map((item, idx) => (
                                <div className='p-4 rounded-lg w-[100%] flex items-center justify-between gap-20 shadow-lg shadow-gray-200' key={idx}>
                                    <div className='w-[50%]'>
                                        <img src={item.product_id.product_images[0].url} className='rounded-lg object-cover' />
                                    </div>

                                    <div className='flex flex-col items-baseline justify-between gap-10 w-[100%]'>

                                        <div className='flex flex-col items-baseline gap-2'>
                                            <h2 className='text-2xl font-bold '>{item.product_id.product_name}</h2>
                                            <p className='font-lg text-zinc-600'>qunatity : {item.product_quantity}</p>
                                            <p className='font-semibold'>Price : ${item.product_id.product_price}</p>

                                        </div>

                                        <button onClick={() => handleRemoveFromCart(item.product_id._id)} className='w-[100%] cursor-pointer p-2 rounded-lg bg-red-400 text-white font-bold'>Remove from Cart</button>
                                    </div>
                                </div>
                            ))
                        }
                    </div>
                }

            </div>

        </div>
    )
}

export default Cart
