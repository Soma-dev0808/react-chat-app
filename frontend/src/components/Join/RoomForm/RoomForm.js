import React from "react"

import "../Join.css"

const RoomForm = ({
    formTitle,
    formButtonTitle,
    setUserName,
    setRoomName,
    buttonAction
}) => {
    return (
        <div className="joinOuterContainer">
            <div className="joinInnerContainer">
                <h1 className="heading">{formTitle}</h1>

                {setUserName && 
                    <div>
                        <input placeholder="Name" className="joinInput" type="text" onChange={(event) => setUserName(event.target.value)} />
                    </div>
                }

                {setRoomName &&
                    <div>
                        <input placeholder="Room Name" className="joinInput mt-20" type="text" onChange={(event) => setRoomName(event.target.value)} />
                    </div>
                }
                
                <button className="button mt-20" type="submit" onClick={buttonAction}>
                    {formButtonTitle}
                </button>
            </div>
        </div>
    )
}

export default RoomForm