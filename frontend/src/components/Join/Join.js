import React, { useState } from 'react'
import logo from '../../images/logo.png'

import { Link } from 'react-router-dom'

let user;

const Join = () => {
    const [name, setName] = useState()

    const sendUser = () => {
        user = name
        setName("")
    }

    return (
        <div className={"flex flex-col justify-center items-center bg-zinc-900  w-full h-screen "}>
            <img className='w-40 mb-8' src={logo} alt="logo" />
            <h1 className='text-slate-100 text-5xl tracking-wide uppercase pr-28 pl-28 border-b-2 mb-3'>Chat</h1>
            <input placeholder='Enter Your Name' value={name} type="text" className='py-4 px-5 w-[355px] my-3' onChange={(e) => setName(e.target.value)} />
            <Link onClick={(e) => (!name) ? e.preventDefault() : null} to="/chat" >
                <button className={"py-4 px-5 w-[355px] my-3 bg-rose-600 text-white text-xl"} onClick={sendUser} >
                    login
                </button>
            </Link>
        </div >
    )
}

export default Join;
export { user };