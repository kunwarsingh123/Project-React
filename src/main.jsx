import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { Provider } from 'react-redux'
import store from './store/store.js'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Home from './pages/Home.jsx'
import Protected from './components/AuthLayout.jsx'
import { Login } from './components/index.js'
import AllPosts from './pages/AllPosts.jsx'
import EditPost from './pages/EditPost.jsx'
import Post from './pages/Post.jsx'
import Signup from './pages/Signup.jsx'
import React from 'react'
import AddPost from './pages/AddPost.jsx'
const router=createBrowserRouter([
  {
    path:'/',
    element:<App/>,
    children:[
      {
path:'/',
element:<Home/>


      },
      {
        path:'/login',
        element:(
          <Protected authentication={false}>
           <Login/>

          </Protected>
        )
      },

{
  path:"/signup",
  element:(
    <Protected authentication={false}> 
    <Signup/>
    </Protected>
  )

},
{
  path:"/add-post",
  element:(
    <Protected authentication>
      {" "}
      <AddPost/>

    </Protected>
  )

}
,

{
  path:"/all-posts",
  element:(
    <Protected authentication>
{" "}
<AllPosts/>

    </Protected>
  )
},

{
    path:"/edit-post/:slug",
    element:(
      <Protected authentication>
{" "}
<EditPost/>

      </Protected>
    )
}
,

{
   path:"/post/:slug",
   element:<Post/>
}

    ]
  }

])


createRoot(document.getElementById('root')).render(
    <React.StrictMode>
  <Provider store={store}>
   <RouterProvider router={router}/>
  </Provider>,
  </React.StrictMode>
)

