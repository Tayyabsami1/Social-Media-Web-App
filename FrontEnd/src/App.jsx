import { useContext } from 'react'
import { Toaster } from 'react-hot-toast';

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

import {
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query'  

const App = () => {

  const user = useContext(AuthContext);
  const { darkMode } = useContext(DarkModeContext);
  const queryClient = new QueryClient()

  const Layout = () => {
    return (
      <QueryClientProvider   client={queryClient}>
      <div className={`theme-${darkMode ? "dark" : "light"} `}>
        <Navbar />
        <div style={{ display: "flex" }} className='mainbody'>
          <div style={{ flex: 6 }}>
            <Outlet />
          </div>
          <Rightbar />
        </div>
      </div>
      </QueryClientProvider>
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
        path: "/Profile/:id",
        element: <Profile />
      },
      {
        path: "/Messages",
        element: <Messages />
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
      <Toaster />
      <RouterProvider router={router} />
    </>
  )
}

export default App
