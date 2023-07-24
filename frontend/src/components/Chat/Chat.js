import React, { useEffect, useState } from 'react'
import { user } from '../Join/Join'
import socketIO from "socket.io-client"

// import styles from './Chat.module.css'

import sendLogo from "../../images/send.png"

import closeIcon from "../../images/closeIcon.png"

import Message from "../Message/Message"

import ReactScrollToBottom from 'react-scroll-to-bottom';

let socket;

const ENDPOINT = "http://localhost:4500/";

const Chat = () => {
    const [message, setMessage] = useState("");
    const [id, setId] = useState();
    const [messages, setMessages] = useState([]);

    const send = () => {
        if (message === "") return
        socket.emit('message', { message, id })
        setMessage("");
    }

    useEffect(() => {
        socket = socketIO(ENDPOINT, { transports: ['websocket'] })

        socket.on('connect', () => {
            setId(socket.id)
        })

        console.log(socket)
        socket.emit('joined', { user })

        socket.on('welcome', (data) => {
            setMessages([...messages, data])
            console.log(data.user, data.message)
        })

        socket.on('userJoined', (data) => {
            setMessages([...messages, data])
            console.log(data.user, data.message)
        })

        socket.on('leave', (data) => {
            setMessages([...messages, data])
            console.log(data.user, data.message)
        })

        return () => {
            console.log("lalaal")
            socket.emit('disconnect')
            socket.off();
        }
    }, [])


    useEffect(() => {
        socket.on('sendMessage', (data) => {
            setMessages([...messages, data])
        })
        return () => {
            socket.off()
        }
    }, [messages])



    return (
        <>
            <div className={"bg-slate-800 w-screen h-screen flex justify-center items-center"}>
                <div className={"bg-slate-300 w-1/2 h-3/5"}>
                    <div className={"bg-rose-600 h-[15%] flex justify-between items-center p-6"}>
                        <h2 className='text-white font-semibold tracking-wider'>CHAT</h2>
                        <a href="/" className='hover:scale-150'>
                            <img src={closeIcon} alt="close" />
                        </a>

                    </div>
                    <ReactScrollToBottom className={"h-[70%] overflow-y-auto border-box"}>
                        ..
                        {messages.map((item, i) => <Message user={item.id === id ? '' : item.user} message={item.message} classs={item.id === id ? "right" : "left"} />)}
                    </ReactScrollToBottom>
                    <div className={"h-[15%] border-box flex border-y-2  border-red-700"}>
                        <input onKeyPress={e => e.key === 'Enter' ? send() : null} type="text" className={"w-[80%] border-none bg-white border-box p-3 outline-none font-sans text-xl"} value={message} onChange={e => setMessage(e.target.value)} />
                        {/* <input type="file" onchange={(e) => {
                            console.log(e)
                        }} /> */}
                        <button className={"group bg-rose-600 hover:bg-rose-800 w-[21%] border-none transition-all duration-300 ease-linear cursor-pointer p-4"} onClick={send} >
                            <img src={sendLogo} className="invert group-hover:translate-x-4 duration-300 ease-linear w-10" alt="send" />
                        </button>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Chat;
