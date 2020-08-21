import React, { useState, useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"

import { launchRoomService } from "./service/service"
import { cleanUp } from "./store/actionCreator"
import { routePath } from "../../service/routes"
import RoomForm from "./RoomForm/RoomForm"

import "./Join.css"

const Launch = ({ history }) => {
    const dispatch = useDispatch()
    const { isRoomCreated, isRoomCreateFailed, roomError} = useSelector(({roomReducer}) => roomReducer)
    const [ userName, setUserName ] = useState("")
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

    const handleLaunchRoom = () => {
        // Create or find room
        dispatch(launchRoomService({userName, roomName}))
    }

    return (
        <RoomForm 
            formTitle={"Launch Room"}
            formButtonTitle={"Launch Room"}
            setUserName={setUserName}
            setRoomName={setRoomName}
            buttonAction={handleLaunchRoom}
        />
    )
}

export default Launch