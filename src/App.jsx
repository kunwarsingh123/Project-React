import { useState,useEffect } from 'react'
import conf from './conf/conf'
import { useDispatch } from 'react-redux'

import authservice from './appwrite/auth'
import { login,logout } from './store/authSlice'
import { Header,Footer } from './components'
import { Outlet } from 'react-router-dom'


function App() {
 
  // ish loading ka matlab h yadi data load ho gya h to nhi dhikayege server load ho gya h
  const [loading,setloading]=useState(true)
   const dispatch =useDispatch()
useEffect(()=>{
  authservice.getCurrentUser()
  .then((data)=>{
   if(data){
    dispatch(login({
      data
    }))
   }

   else{
    dispatch(logout())
   }


  })
  .finally(()=>setloading(false))

},[])


return !loading ?  (
  <>
 <div className="min-h-screen flex flex-col bg-slate-500 text-white">
  <Header />

  <main className="flex-1 p-4">
    <Outlet />
  </main>

  <Footer /> 
</div>

  
  </>
):null

}

export default App
