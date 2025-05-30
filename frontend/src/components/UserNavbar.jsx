import { User2Icon, Menu, X, Flag, ShoppingCartIcon } from 'lucide-react';
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { useDebounce } from '../hooks/useDebounce';
import toast from 'react-hot-toast';
import logo from "/assets/Assets/logo.png"



const UserNavbar = ({ isLoggedIn, setLoggedIn }) => {
  const [isOpen, setIsOpen] = React.useState(false);
  
  const navigate = useNavigate();

  const links = [
    {
      to: isLoggedIn ? '' : '',
      title: 'Shop'
    },
    {
      to: '/',
      title: 'Men'
    },
    {
      to: '/',
      title: 'Women'
    },

  ]

  return (
    <>

      <div className='fixed w-[100vw] bg-zinc-100 p-4'>


        <div className='flex items-center flex-wrap justify-between lg:flex-nowrap lg:justify-around '>
          <div className='flex items-center gap-2'>
            <img src={logo} />
            <p className='text-2xl font-bold'>Shopper</p>
          </div>

          <div className='lg:hidden'>
            <Menu onClick={() => setIsOpen(!isOpen)} />
          </div>

          {
            isOpen && (
              <div className='w-[90%]  m-auto flex flex-col items-center gap-4'>
                <div className='flex flex-col lg:hidden items-center justify-center gap-4'>

                  {
                    links.map((link, index) => {
                      return (
                        <p key={index} className='text-xl font-semibold cursor-pointer'>{link.title}</p>
                      )
                    })
                  }

                </div>

                {
                  isLoggedIn ? <button className='block m-auto lg:hidden p-2 w-[50%] text-center bg-red-400 text-white font-semibold rounded-lg'>
                    Logout
                  </button>
                    : <button className='block lg:hidden m-auto p-2 w-[50%] text-center bg-red-400 text-white font-semibold rounded-lg'>
                      Login
                    </button>
                }

              </div>
            )
          }

          <div className='hidden lg:flex items-center gap-8'>

            {
              links.map((link, index) => {
                return (
                  <p key={index} className='text-xl font-semibold cursor-pointer'>{link.title}</p>
                )
              })
            }

          </div>

          {
            isLoggedIn ? <div className='hidden lg:flex items-center gap-4 w-[10%] '>
              <ShoppingCartIcon onClick={()=>navigate('/cart')} className='cursor-pointer' />
              <button className='hidden lg:block p-2 w-[100%] text-center bg-red-400 text-white font-semibold rounded-lg'>
                Logout
              </button>

            </div>
              : <div className='hidden lg:flex items-center gap-4 w-[10%]'>
                <ShoppingCartIcon  className='cursor-pointer' onClick={()=>navigate('/signin')} />
                <button onClick={()=>navigate('/signin')} className='hidden lg:block  p-2 w-[100%] text-center bg-red-400 text-white font-semibold rounded-lg'>
                  Login
                </button>

              </div>
          }

        </div>

        <div>

        </div>



      </div>

    </>
  )
}

export default UserNavbar
