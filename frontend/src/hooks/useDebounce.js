import { useEffect, useState } from "react"


export const useDebounce = (word)=>{
    const [debouncedWord , setDebouncedWord] = useState('');
    useEffect(()=> { 
        const timeout = setTimeout(()=> {
            setDebouncedWord(word)
        } , 200)

        return () => clearInterval(timeout)
    } ,[word])
    return debouncedWord
}