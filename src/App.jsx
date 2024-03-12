import { useState, useCallback, useEffect, useRef } from 'react'
import './App.css'

function App() {

  const[length, setLength] = useState(8);
  const[numberAllowed, setNumberAllowed] = useState(false);
  const[spCharacterAllowed, setSpCharacterAllowed] = useState(false);
  const[password, setPassword] = useState("");

  //useRef Hook
  const passwordRef = useRef(null);

  const passwordGenerator = useCallback(() => {
    let pass = "";
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";

    if(numberAllowed) str += "0123456789";
    if(spCharacterAllowed) str+= "!@#$%^&*-_+=[]{}~`";

    for(let i=1; i<=length; i++){

      let index = Math.floor(Math.random() * str.length + 1);
      pass += str.charAt(index);
    }

    setPassword(pass);

  }, [length, numberAllowed, spCharacterAllowed, setPassword])

  const copyToClipboard = useCallback(() => {
    passwordRef.current?.select(password);
    passwordRef.current?.setSelectionRange(0, 10)
    window.navigator.clipboard.writeText(password);
  }, [password])

  useEffect(() => {
    passwordGenerator()
  }, [length, numberAllowed, spCharacterAllowed, passwordGenerator])
  return (
    <>
      <div 
      className='w-full max-w-md mx-auto shadow-md 
      rounded-lg px-4 py-3 my-8 text-orange-500 bg-gray-800'
      >
        <h1
        className='text-white text-center mb-5'
        >Password Generator</h1>
        <div 
        className='flex shadow rounded-lg overflow-hidden mb-4'
        >
            <input
            type='text'
            value={password}
            placeholder='password'
            className='outline-none w-full py-1 px-3'
            readOnly
            ref={passwordRef}
            />

            <button
            onClick={copyToClipboard}
            className='outline-none bg-blue-700 text-white
            px-4 py-2 shrink-0'
            >Copy</button>
        </div>

        <div className='flex text-sm gap-x-5'>
          <div className='flex items-center gap-x-1'>
            <input 
            type='range'
            min={8}
            max={50}
            value={length}
            className='cursor-pointer'
            onChange={(e) => setLength(e.target.value)}
            />
            <label>Length : {length}</label>
          </div>
          <div className='flex items-center gap-x-1'>
            <input
            type='checkbox'
            defaultChecked = {numberAllowed}
            id='numberInput'
            onChange={() => {
              setNumberAllowed((prev) => !prev)
            }}
            />
            <label>Numbers</label>
          </div>
          <div className='flex items-center gap-x-1'>
            <input
            type='checkbox'
            defaultChecked = {spCharacterAllowed}
            id='spCharInput'
            onChange={() => {
              setSpCharacterAllowed((prev) => !prev)
            }}
            />
            <label>Charcters</label>
          </div>
        </div>
      </div>
    </>
  )
}

export default App
