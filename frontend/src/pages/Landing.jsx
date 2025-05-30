import React, { useState, useEffect } from 'react'
import { ShoppingCart, Star, Truck, Shield, Headphones, ArrowRight, Heart, Eye, Plus } from 'lucide-react';
import UserNavbar from '../components/UserNavbar'
import hero from "/assets/Assets/hero_image.png"
import ProductCard from '../components/ProductCard';

const Landing = ({ isLoggedIn, setIsLoggedIn }) => {

  const [products, setProducts] = useState([])

  useEffect(() => {

    try {
      fetch('http://localhost:3000/api/v1/product', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
        }
      }).then(async (response) => {
        const data = await response.json();
        if (data.valid) {
          setProducts(data.products)
        }
      })
    } catch (error) {

    }
  }, [])




  return (
    <div className="relative w-full flex flex-col items-center">
      <UserNavbar isLoggedIn={isLoggedIn} setLoggedIn={setIsLoggedIn} />

      <div className='h-auto mx-auto mb-10 mt-40 lg:mt-20'>
        <div className='h-auto mx-auto w-[90%]'>

          {/* hero section */}

          <div className='p-2 w-[90%]  m-auto flex items-center justify-center lg:justify-between lg:gap-40'>

            <div className='flex flex-col items-center lg:items-start w-[90%] lg:w-[20%] gap-8'>
              <h1 className='w-[100%] text-4xl lg:text-6xl font-bold text-center lg:text-start'>new Collections for everyone</h1>
              <button className='w-[50%] lg:w-[70%] p-2 bg-pink-400 text-white rounded-lg'>Explore Now {'->'}</button>
            </div>

            <div>
              <img className='w-[75%] hidden lg:block' src={hero} />
            </div>

          </div>






        </div>

        {/* Products */}
        <div className='mt-10 w-[70%] mx-auto flex flex-wrap items-center gap-20'>

          {/* <ProductCard />

          <ProductCard />
          <ProductCard /> */}

          {
            products.map((product, idx) => {
              return (
                <ProductCard product={product} key={idx} />
              )
            })
          }

        </div>



        <div className='flex flex-col w-[80%] m-auto items-center p-4 mt-20'>
          <h2 className='text-center text-4xl'>New Collections</h2>
          <div className='mt-10 w-[100%] mx-auto flex flex-wrap items-center gap-10'>


            {/* <ProductCard />
            <ProductCard />
            <ProductCard />
            <ProductCard />
            <ProductCard />
            <ProductCard /> */}

            {
              products.map((product, idx) => {
                return (
                  <ProductCard product={product} key={idx} />
                )
              })
            }

          </div>
        </div>


      </div>
    </div>
  )
}

export default Landing
