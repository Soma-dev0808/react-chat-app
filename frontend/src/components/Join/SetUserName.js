import React, { useState, useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"

import { setUserNameService } from "./service/service"
import { cleanUp } from "./store/actionCreator"
import { routePath } from "../../service/routes"
import RoomForm from "./RoomForm/RoomForm"

import "./Join.css"

const SetUserName = ({ history }) => {
    const dispatch = useDispatch()
    const { isRoomCreated, isRoomCreateFailed, roomError, roomName} = useSelector(({roomReducer}) => roomReducer)
    const [ userName, setUserName ] = useState("")
    const [ room, setRoom ] = useState("")

    useEffect(() => {
        isRoomCreated && history.push(routePath.chat)
        isRoomCreateFailed && alert(roomError)
    }, [isRoomCreated, isRoomCreateFailed]) // eslint-disable-line react-hooks/exhaustive-deps

    useEffect(() => {
        roomName 
            ? setRoom(roomName) 
            : history.push(routePath.selectRoom)

        return () => {
            dispatch(cleanUp())
        }
    }, []) // eslint-disable-line react-hooks/exhaustive-deps

    const handleSetUserName = () => {
        // Set user to chat room
        dispatch(setUserNameService({userName, roomName: room}))
    }

    return (
        <RoomForm 
            formTitle={"Set User Name"}
            formButtonTitle={"Set User Name"}
            setUserName={setUserName}
            setRoomName={null}
            buttonAction={handleSetUserName}
        />
    )
}

export default SetUserName