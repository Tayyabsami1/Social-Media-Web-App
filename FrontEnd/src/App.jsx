import React from 'react'
import { useEffect, useState } from 'react'
import { BrowserRouter,Routes,Route } from "react-router-dom";
import Login from './Components/Login';
import SignUp from './Components/SignUp';
import Home from './Components/Home';

const App = () => {
  // const [data, setData] = useState([]);
  // useEffect(() => {
  //   fetch('http://localhost:3000/Card').then(res => res.json()).then(res => setData(res.recordset));

  // }, [])

  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/Login"
          element={ <Login/>}
        />
        <Route
          path='/SignUp'
          element={ <SignUp/>}
        />
        <Route
        path='/Home'
        element={<Home/>}
        />
      </Routes>
    </BrowserRouter>
  )
}

export default App
