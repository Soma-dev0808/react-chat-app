import React, { useState, useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import io from "socket.io-client"

import InfoBar from "../InfoBar/InfoBar"
import Input from "../Input/Input"
import Messages from "../Messages/Messages"
import TextContainer from "../TextContainer/TextContainer"

import { fetchUser, fetchMessages, saveMessages } from "./service/service"
import { requestMessageCleanUp } from "./store/actionCreator"

import "./Chat.css"

let socket

const Chat = () => {
    const dispatch = useDispatch()
    const { userName, roomName } = useSelector(({ roomReducer }) => roomReducer)
    const {
        isUserFetching,
        fetchedUserName, 
        isFetchUserFailed, 
        fetchUserError 
    } = useSelector(({ userReducer }) => userReducer)
    const { 
        isMessageFetching, 
        fetchedMessages, 
        isFetchMessagesFailed, 
        fetchedMessagesError
    } = useSelector(({ messageReducer }) => messageReducer)
    const [ name, setName ] = useState("")
    const [ room, setRoom ] = useState("")
    const [ users, setUsers ] = useState()
    const [ message, setMessage ] = useState("")
    const [ messages, setMessages ] = useState([])
    const ENDPOINT = process.env.REACT_APP_SERVER_ENDPOINT

    // Get Username, room name and messages
    useEffect(() => {
        if(userName && roomName) {
            userName && setName(userName.trim().toLowerCase())
            roomName && setRoom(roomName)
            // When refreshed page, the room name will the key to fetch user
            localStorage.setItem("roomName", roomName)
            dispatch(fetchMessages(roomName))
        }
        else {
            const storedRoomName = localStorage.getItem("roomName")
            setRoom(storedRoomName)
            dispatch(fetchUser(storedRoomName))
            dispatch(fetchMessages(storedRoomName))
        }
    }, []) // eslint-disable-line react-hooks/exhaustive-deps

    // Refrect fetching user result
    useEffect(() => {
        fetchedUserName && setName(fetchedUserName.trim().toLowerCase())
        isFetchUserFailed && alert(fetchUserError)
    }, [isUserFetching]) // eslint-disable-line react-hooks/exhaustive-deps

    // Refrect fetching message result
    useEffect(() => {
        fetchedMessages && setMessages(fetchedMessages.concat(messages))
        isFetchMessagesFailed && alert(fetchedMessagesError)
    }, [isMessageFetching]) // eslint-disable-line react-hooks/exhaustive-deps

    // Start session 
    useEffect(() => {
        socket = io(ENDPOINT)
        if(name && room) socket.emit("join", { name, room }, (err) => err && alert(err.err))
    }, [name, room, ENDPOINT])

    // Start listening message from server and room data
    useEffect(() => {
        if(name && room) {
            socket.on("message", (message) => {
                setMessages([...messages, message])
            })

            socket.on("roomData", ({users}) => {
                setUsers(users)
            })
        }
    }, [messages, name, room])

    useEffect(() => {
        window.onbeforeunload = function(e) {
            e.preventDefault()
            socket.emit("disconnected")
            socket.off()
        };

        return () => {
            socket.emit("disconnected")
            socket.off()
            window.onbeforeunload = null
            dispatch(requestMessageCleanUp())
        }
    }, [])

    const sendMessage = (event) => {
        event.preventDefault()
        if(message) {
            socket.emit("sendMessage", message, () => setMessage(""))
            room && name && dispatch(saveMessages({ message, room, name}))
        }
    }

    return (
        <div className="outerContainer">
            <div className="container">
                <InfoBar room={room} />
                <Messages messages={messages} name={name} />
                <Input 
                    message={message} 
                    setMessage={setMessage} 
                    sendMessage={sendMessage} 
                />
            </div>
            <TextContainer users={users} />
        </div>
    )
}

export default Chat