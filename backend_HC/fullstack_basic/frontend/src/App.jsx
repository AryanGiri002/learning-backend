import { useState } from 'react'
import './App.css'
import axios from 'axios'
import { useEffect } from 'react'

function App() {
  const [jokes,setJokes] = useState([])

  useEffect(()=>{
    axios.get('/api/jokes')
    .then((response) =>{
      setJokes(response.data)
    })
    .catch((error)=>{
      console.log(error);
      
    })
  })
  return (
    <>
      <h1
        style={{
          color: '#FF5722',
          textAlign: 'center',
          fontFamily: 'Arial, sans-serif',
          fontSize: '2.5rem',
          marginBottom: '20px'
        }}
      >
        Chai & full stack
      </h1>
      <p
        style={{
          fontWeight: '600',
          fontSize: '18px',
          marginBottom: '25px',
          textAlign: 'center',
          color: '#FF7043',
          fontFamily: 'Arial, sans-serif'
        }}
      >
        JOKES : {jokes.length}
      </p>

      {
        jokes.map((joke, index) => (
          <div
            key={joke.id}
            style={{
              backgroundColor: '#2C2C2C',
              padding: '15px',
              margin: '15px 0',
              borderRadius: '10px',
              boxShadow: '0 4px 6px rgba(0,0,0,0.2)'
            }}
          >
            <h3
              style={{
                margin: '0 0 8px 0',
                color: '#FF8A65',
                fontSize: '20px',
                fontFamily: 'Verdana, sans-serif'
              }}
            >
              {joke.title}
            </h3>
            <p
              style={{
                margin: 0,
                color: '#E0E0E0',
                fontSize: '16px',
                lineHeight: '1.5',
                fontFamily: 'Verdana, sans-serif'
              }}
            >
              {joke.content}
            </p>
          </div>
        ))
      }
    </>
  )
}

export default App
