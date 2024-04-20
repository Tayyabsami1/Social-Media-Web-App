import React from 'react'
import { useEffect, useState } from 'react'
import {
  createBrowserRouter,
  Navigate,
  Outlet,
  RouterProvider,
} from "react-router-dom";
import Login from './Components/Login';
import SignUp from './Components/SignUp';
import Home from './Components/Home';
import Navbar from './Components/Navbar';
import Profile from './Components/Profile';
import Rightbar from './Components/Rightbar';

const App = () => {
  
  // const [data, setData] = useState([]);
  // useEffect(() => {
  //   fetch('http://localhost:3000/Card').then(res => res.json()).then(res => setData(res.recordset));

  // }, [])

  const user= true;

  const Layout =()=>{
    return (
    <>
    <Navbar/>
    <div style={{display: "flex"}}>
    <div style={{flex: 6}}>
    <Outlet/>
    </div>
    <Rightbar/>
    </div>
    </>
    )
  }

  const ProtectedRoute=({children})=>{
    if(!user)
    {
      return <Navigate to='/Login'/>
    }
    return children;
  }

  const router = createBrowserRouter([
    {
      path: "/",
      element: <ProtectedRoute><Layout/></ProtectedRoute>,
      children: [{
        path:"/",
        element:<Home/>,
      },
      {
        path: "/Profile",
        element: <Profile/>
      }
    ]
    },
    {
      path: "/Login",
      element: <Login />,
    },
    {
      path: "/Signup",
      element: <SignUp />,
    },
  ]);


  return (
    <>
      <RouterProvider router={router} />
    </>
  )
}

export default App
