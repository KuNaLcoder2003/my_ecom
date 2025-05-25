import { useEffect, useState } from "react"



export const useFetchAdmin = ()=>{

    const [admin , setAdmin] = useState({})
    const [loading , setLoading] = useState(false);
    const [error , setError] = useState("")
    const token = localStorage.getItem('token')

    useEffect(()=>{
        try {
        setLoading(true);
            fetch('http://localhost:3000/api/v1/user/admin' , {
                method : 'GET',
                headers : {
                    'Content-Type' : 'application/json',
                    authorization : token
                }
            }).then(async(response)=>{
                const data = await response.json()
                setLoading(false)
                if(data.valid) {
                    setAdmin(data.user)
                }
                else {
                    setError(data.message)
                }
            })
        } catch (error) {
            setLoading(false);

            setError(error);
            
        } finally {
            setLoading(false);
        }
    } , [])

    return {admin , loading , error}


}