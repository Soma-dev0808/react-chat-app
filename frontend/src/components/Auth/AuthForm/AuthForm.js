import React from "react"

import "../Auth.css"

const AuthForm = ({
    isLogin,
    formAction,
    setEmail,
    setPassword
}) => {
    return (
        <div className="joinOuterContainer">
            <div className="joinInnerContainer">
                <h1 className="heading">{isLogin ? "Sign In" : "Sign Up"}</h1>
                <div>
                    <input placeholder="Email Address" className="joinInput" type="text" onChange={(event) => setEmail(event.target.value)} />
                </div>
                <div>
                    <input placeholder="Password" className="joinInput mt-20" type="password" onChange={(event) => setPassword(event.target.value)} />
                </div>
                <button className="button mt-20" type="submit" onClick={formAction}> 
                    {isLogin ? "Sign In" : "Sign Up"}
                </button>
            </div>
        </div>
    )
}

export default AuthForm