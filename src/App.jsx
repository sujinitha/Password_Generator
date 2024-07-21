import { useCallback, useEffect, useRef, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
//useRef is a React Hook that lets you reference a value that’s not needed for rendering.
//useState is a React Hook that lets you add a state variable to your component.
//useEffect is a React Hook that lets you synchronize a component with an external system.
//useCallback is a React Hook that lets you cache a function definition between re-renders.
function App() {
  const [length,setLength]=useState(8)
  const [numberAllowed,setNumberAllowed]=useState(false)
  const [symbolAllowed,setSymbolAllowed]=useState(false)
  const [password,setPassword]=useState('')

  const passwordRef=useRef(null)

  const generatePassword=useCallback(()=>{  // usecallback has 2 parts
    //logic
    let password=''
    let str="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz"
    if(numberAllowed){
      str+="0123456789"
    }
    if(symbolAllowed){
      str+="%$#@!*()_+!^"
    }
    for(let i=1;i<length;i++){
      const sym =Math.floor(Math.random()*str.length+1)
      password+=str.charAt(sym)
      }
      setPassword(password)
    
  },[length,numberAllowed,symbolAllowed]) //dependency array

  const copyPassword=()=>{
    window.navigator.clipboard.writeText(password)
    passwordRef.current?.select()
    
  }

  useEffect(()=>{
    generatePassword()
  },[length,numberAllowed,symbolAllowed])

  return (
    <div className='w-full max-w-md mx-auto shadow-md
    rounded-lg px-4 py-3 my-8 bg-gray-800 text-orange-500'>
      <h1 className='text-3xl font-bold rounded-lg mb-2 text-center my-3'>PASSWORD GENERATOR</h1>
      <div className='flex shadow rouded-xl overflow-hidden mb-4 '>
        <input type="text" value={password}
        className='outline-none w-full py-1 px-3 rounded-xl'
        placeholder='Password' 
        readOnly
        ref={passwordRef}

        />
        <button 
        onClick={copyPassword}
        className='outline-none bg-blue-700 text-white px- py-0.5 shrink-0 rounded-xl'>COPY</button>
      </div>
      <div className='flex text-sm gap-x-2 '>
        <div className='flex items-center gap-x-l'>
          <input type="range" min={6} max={50} value={length} 
          className='cursor-pointer 'onChange={(e)=>setLength(e.target.value)}
          name=" "
          id ="" />
          <label htmlFor="length">Length: {length}</label>
        </div>
        
        <div className='flex items-center gap-x-l'>
          <input type="checkbox"
          defaultChecked={numberAllowed}
          onChange={()=>{
            setNumberAllowed((prev)=>!prev)
          }} />
          <label htmlFor="number">Numbers</label>
          
        </div>
        <div className='flex items-center gap-x-l'>
          <input type="checkbox"
          defaultChecked={symbolAllowed}
          onChange={()=>{
            setSymbolAllowed((prev)=>!prev)
          }} />
          <label htmlFor="symbol">Symbols</label>
          
        </div>

      </div>
    </div>

  )
}

export default App
