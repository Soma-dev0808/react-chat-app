import React, { useState, useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"

import { joinRoomService } from "./service/service"
import { cleanUp } from "./store/actionCreator"
import { routePath } from "../../service/routes"
import RoomForm from "./RoomForm/RoomForm"

import "./Join.css"

const Join = ({ history }) => {
    const dispatch = useDispatch()
    const { isRoomCreated, isRoomCreateFailed, roomError} = useSelector(({roomReducer}) => roomReducer)
    const [ roomName, setRoomName ] = useState("")

    useEffect(() => {
        isRoomCreated && history.push(routePath.chat)
        isRoomCreateFailed && alert(roomError)
    }, [isRoomCreated, isRoomCreateFailed]) // eslint-disable-line react-hooks/exhaustive-deps

    useEffect(() => {
        return () => {
            dispatch(cleanUp())
        }
    }, []) // eslint-disable-line react-hooks/exhaustive-deps

    const handleJoinRoom = () => {
        // Create or find room
        dispatch(joinRoomService(roomName, history))
    }

    return (
        <RoomForm 
            formTitle={"Join Room"}
            formButtonTitle={"Join Room"}
            setUserName={null}
            setRoomName={setRoomName}
            buttonAction={handleJoinRoom}
        />
    )
}

export default Join