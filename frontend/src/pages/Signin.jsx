import React, { useState } from 'react'
import toast, { Toaster } from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

const Signin = ({setUser }) => {
    const [cred, setCred] = useState({
        email: '',
        password: ''
    })

    const navigate = useNavigate()


    const handleSignIn = (e) => {
        e.preventDefault();
        console.log(cred)
        try {
            fetch('http://localhost:3000/api/v1/user/signin' , {
                method : 'POST',
                headers : {
                    'Content-Type' : 'application/json'
                },
                body : JSON.stringify({
                    email : cred.email,
                    password : cred.password
                })
            }).then(async(response)=>{
                const data = await response.json();
                console.log(data)
                if(data.valid) {
                    setCred({
                        email : '',
                        password : ''
                    })
                    localStorage.setItem("token" , `Bearer ${data.token}`)
                    if(data.role == 'Admin') {
                        localStorage.setItem('role' , 'Admin');
                        setUser({isAdmin : true , isLoggedIn : true})
                        navigate('/admin')
                    } else {
                         localStorage.setItem("role" , `User`)
                        setUser({ isAdmin : false , isLoggedIn : true})
                    }
                    
                    toast.success(data.message)
                } else {
                    setUser({
                        isAdmin : false,
                        isLoggedIn : false
                    })
                    toast.error(data.message)
                }
            })
        } catch (error) {
            toast.error(error)
        }
    }

    
    return (
        <div className='w-full h-full flex items-center p-0'>
            <Toaster/>
            <form onSubmit={handleSignIn} className='h-128 w-[40%] m-auto flex flex-col gap-8 items-center justify-center shadow-xl shadow-gray-200 rounded-lg'>
                <h1 className='text-3xl text-center font-bold'>Login</h1>
                <div className='flex flex-col gap-10 items-center w-[100%]'>
                    <div className='flex flex-col gap-4 items-center w-[50%]'>
                        <p>Username : </p>
                        <input
                            onChange={(e) => setCred({...cred , email : e.target.value})}
                            value={cred.email}
                            type="text"
                            placeholder="Enter your username"
                            className="w-full px-4 py-2 rounded-lg text-zinc-600 placeholder:text-zinc-400 shadow-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                        />
                    </div>

                    <div className='flex flex-col gap-4 items-center w-[50%]'>
                        <p>Password : </p>
                        <input
                            onChange={(e) => setCred({...cred , password : e.target.value})}
                            value={cred.password}
                            type="password"
                            placeholder="Enter your password"
                            className="w-full px-4 py-2 rounded-lg text-zinc-600 placeholder:text-zinc-400 shadow-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                        />
                    </div>
                    <button type='submit' className='w-[50%] p-2 bg-indigo-600 text-white font-semibold rounded-lg self-center'>Login</button>
                </div>
            </form>
        </div>
    )
}

export default Signin
