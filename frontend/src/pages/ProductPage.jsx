import React, { useEffect, useState } from 'react'
import toast, { ToastBar, Toaster } from 'react-hot-toast'
import { useLocation, useNavigate } from 'react-router-dom'
import UserNavbar from '../components/UserNavbar'
import { Minus, Plus } from 'lucide-react'

const ProductPage = ({ isLoggedIn }) => {
    const path = useLocation()
    const id = path.pathname.split('/').at(-1)
    const [product, setProduct] = useState(null)
    const [loading, setLoading] = useState(false);
    const [currentImage, setCuurentImage] = useState('')
    const [qunatity, setQunatity] = useState(localStorage.getItem(`${id}`) || 0);

    const navigate = useNavigate();

    useEffect(() => {
        const id = path.pathname.split('/').at(-1)
        console.log(id);
        try {
            setLoading(true)
            fetch('http://localhost:3000/api/v1/product/item/' + id, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                }
            }).then(async (response) => {
                const data = await response.json();
                console.log(data);
                if (data.valid) {
                    setProduct(data.product)
                    setCuurentImage(data.product.images[0].url)
                    setLoading(false)
                } else {
                    setLoading(false);
                    toast.error(data.message)
                }
            })
        } catch (error) {
            toast.error(data.message)

        } finally {
            setLoading(false);
        }
    }, [])

    function changeCurrentPhoto(url) {
        setCuurentImage(url)
    }

    function handleAddToCart() {
        if (!isLoggedIn) {
            toast.error('please signin')
            navigate('/signin')
            return

        }
        if (qunatity == 0) {
            toast.error('please select 1 item')
            return
        }
        localStorage.setItem(`${path.pathname.split('/').at(-1)}` , qunatity)

        try {
            fetch('http://localhost:3000/api/v1/cart/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    authorization: localStorage.getItem('token')
                },
                body: JSON.stringify({
                    product: {
                        product_id: product.id,
                        product_quantity: qunatity
                    }
                })
            }).then(async (response) => {
                const data = await response.json();
                
                if(data.valid) {
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
        <div className='relative w-full flex flex-col items-center'>

            <UserNavbar isLoggedIn={isLoggedIn} />

            <div className='max-w-8xl mt-30 p-4 h-full'>
                <Toaster />
                {
                    loading || product == null ? <div>Loading</div> : <div className='p-4 flex items-center gap-8'>
                        <div className='w-[50%] flex flex-col items-center gap-4'>

                            <div className='w-[100%]'>

                                <img className='w-[50%] m-auto rounded-lg' src={currentImage} />

                            </div>

                            <div className='flex gap-4 justify-center items-center w-[30%]'>
                                {
                                    product.images.map((image, idx) => (
                                        <img onClick={() => changeCurrentPhoto(image.url)} className='rounded-md object-cover w-[30%] cursor-pointer' key={idx} src={image.url} />
                                    ))
                                }
                            </div>

                        </div>

                        <div className='flex flex-col items-baseline justify-around gap-20'>

                            <div className='w-[70%]'>
                                <h1 className='text-4xl font-bold'>{product.name}</h1>
                                <p className='w-[100%] text-xl font-lg text-stone-600'>{product.desc}</p>
                            </div>

                            <div className='flex flex-col w-[100%] gap-8'>
                                <div className='shadow-lg shadow-zinc-400 rounded-lg p-2 flex items-center justify-between w-[50%]'>
                                    <Plus onClick={() => setQunatity(qunatity + 1)} className='cursor-pointer' />
                                    <p>{qunatity}</p>
                                    <Minus className='cursor-pointer' onClick={() => setQunatity(val => {
                                        if (val == 0) {
                                            return val
                                        } else {
                                            return val - 1
                                        }
                                    })} />
                                </div>

                                <button onClick={() => handleAddToCart()} className='w-[50%] p-4 bg-red-400 text-white rounded-lg cursor-pointer'>Add To Cart</button>
                            </div>

                        </div>
                    </div>
                }
            </div>
        </div>
    )
}

export default ProductPage
