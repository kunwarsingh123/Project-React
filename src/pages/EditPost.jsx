import React ,{useEffect,useState} from 'react'
import service from '../appwrite/config'
import { Postform,Container } from '../components'
import { useNavigate, useParams } from 'react-router-dom'


function EditPost() {
const [post,setPosts]=useState(null)

const {slug}=useParams()
const navigate=useNavigate()


useEffect(()=>{
if(slug)
{
    service.getPost(slug).then((post)=>{
        if(post){
            setPosts(post)
        }
    })
}
else{
    navigate('/')

}


},[slug,navigate])

  return post ? <div className='py-8'>
   <Container>
    <Postform post={post}/>
   </Container>
  </div> :null
}

export default EditPost