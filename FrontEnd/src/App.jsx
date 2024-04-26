import React, { useContext } from 'react'
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

import './Styles.scss'
import { DarkModeContext } from './Context/darkModeContext';
import { AuthContext } from './Context/AuthContext';
import './App.scss'
import Messages from './Components/Messages';
import Friends from './Components/Friends';

const App = () => {

  // const [data, setData] = useState([]);
  // useEffect(() => {
  //   fetch('http://localhost:3000/Card').then(res => res.json()).then(res => setData(res.recordset));

  // }, [])

  const user = useContext(AuthContext);
  const { darkMode } = useContext(DarkModeContext);

  const Layout = () => {
    return (
      <div className={`theme-${darkMode ? "dark" : "light"} `}>
        <Navbar />
        <div style={{ display: "flex" }} className='mainbody'>
          <div style={{ flex: 6 }}>
            <Outlet />
          </div>
          <Rightbar />
        </div>
      </div>
    )
  }

  const ProtectedRoute = ({ children }) => {
    if (!user) {
      return <Navigate to='/Login' />
    }
    return children;
  }

  const router = createBrowserRouter([
    {
      path: "/",
      element: <ProtectedRoute><Layout /></ProtectedRoute>,
      children: [{
        path: "/",
        element: <Home />,
      },
      {
        path: "/Profile",
        element: <Profile />
      },
      {
        path: "/Messages",
        element: <Messages />
      },
      {
        path: "/Friends",
        element: <Friends/>
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
