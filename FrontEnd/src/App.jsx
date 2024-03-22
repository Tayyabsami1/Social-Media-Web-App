import React from 'react'
import { useEffect,useState } from 'react'

const App = () => {
  const[data,setData]=useState([]);
  useEffect(()=>{
    fetch('http://localhost:3000/Card').then(res=>res.json()).then(res=>setData(res.recordset));

  },[])
  
  return (
    <div>
        {
          data.map((d,i)=>{
            return (
            <div key={i}>
              <p>This  {d.cardNum} has a pin {d.PIN}</p>
            </div>
            )
            
          })
        }
    </div>
  )
}

export default App
