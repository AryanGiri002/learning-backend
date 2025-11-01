import { useState } from 'react'
import './App.css'
import axios from 'axios'
import { useEffect } from 'react';


function App() {
  const [jokes, setJokes] = useState([]);
  useEffect(()=>{
    axios.get("/api/jokes")
    .then((response)=>{
      setJokes(response.data)
    })
    .catch((error)=>{
      console.log(error);
    })
  },[])
  return (
    <>
      <h1>Chai aur FullStack</h1>
      <p>JOKES : {jokes.length}</p>
      {
        jokes.map((item) => (
          <div key={item.id}>
            <h3> <span>{item.id}</span> {item.title}</h3>
            <p>{item.content}</p>
          </div>
        ))
      }
    </>
  )
}

export default App
