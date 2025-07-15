import React,{useState} from 'react'
import authservice from '../appwrite/auth'
import {Link,useNavigate} from 'react-router-dom'
import {login} from '../store/authSlice'
import {Button,Input,Logo} from './index'
import { useDispatch } from 'react-redux'
import { useForm } from 'react-hook-form'

function Signup() {

const navigate=useNavigate()
const [error,setError]=useState("")
const dispatch =useDispatch()
const {register,handleSubmit}=useForm()


const create=async(data)=>{
    setError("")
    try {
       const userData=    await authservice.createAccount(data)

      if(userData)
      {
      const user=   await authservice.getCurrentUser()
      if(user)
      {
        dispatch(login(user))
        navigate("/")
      }

      }
        
    } catch (error) {
        setError(error.message)
        
    }

}

  return (
    <div className='flex items-center justify-center'>
        <div className={`mx-auto w-full max-w-lg bg-gray-100 rounded-xl p-10 border-black/10`}>
            
            <div className='mb-2 flex justify-center'>
             <span className='inline-block w-full max-w-[100px'>
                <Logo widht='100%'/>
             </span>

            </div>

            <h2 className='text-center tex-2xl font-bold leading-tight'>Sign in your Account </h2>
            
              <p className='mt-2 text-center text-base text-black/60'>
                          Don&apos;t have any account?&nbsp;
                          <Link to='/signup'
                           className='font-medium text-primary transition-all duration-200 hover:underline'>
                            Sign in</Link>
              
              </p>

{error && <p className='text-red-600 mt-8 text-center'>{error}</p>}

<form onSubmit={handleSubmit(create)}>

    <div className='space-y-5'>

<Input label="Full Name:" 
placeholder="enter your full name"
{...register("name",{
    required:true,
})}
/>

    </div>


<div className='space-y-5'>
    
    <Input
    label="Email:"
    placeholder="Enter your Email"
    type="Email"
 {...register("email",{required:true,
validate:{matchPatern:(value)=>/^[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$/.test(value)
  || "Email address must be a valid address" ,



}})}
 />
    
    </div> 



<div className='space-y-5'>

<Input 

label="password:"
type="password"
placeholder="enter your password"
{...register ("password",{required:true})}



/>


  <Button type="submit" className="w-full">
                            Create Account
                        </Button>
</div>


</form>



         </div>
        
      
        
        
        Signup</div>
  )
}

export default Signup