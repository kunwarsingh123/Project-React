import React,{useEffect,useState} from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

export default function Protected({children,authentication=true}) {

const navigate=useNavigate()
const [loader,setloader]=useState(true)
const authStatus=useSelector(state=>state.auth.status)

useEffect(()=>{

    // Todo make it more Easy to understand

// if(authStatus===true)
// {
//     navigate("/")
// }
// else if(authStatus===false)
// {
//     navigate("/login")
// }

    if(authentication && authStatus!==authentication){
        navigate("/login")

    }

    else if(!authentication && authStatus!==authentication)
    {
        navigate("/")
    }
    setloader(false)


},[authStatus,navigate,authentication])


  return loader ? <h1>Loading...</h1> :<>{children}</>
}

