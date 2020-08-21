import React, { useState, useEffect } from "react"
import { Redirect, Route } from "react-router-dom"
import { auth } from "../service/firebase"

import { routePath } from "../service/routes"

const Private = (props) => {
    const { Component, ...rest } = props
    const [isAuth, setIsAuth] = useState(false)
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        auth.onAuthStateChanged((user) => {
            if(user) {
                setIsAuth(true)
                setIsLoading(false)
            }
            else {
                setIsAuth(false)
                setIsLoading(false)
            }
        })
    },[])

    return (
        isLoading ? null : 
        isAuth ? (
            <Route 
                {...rest} 
                render={(props) => (
                    <Component {...props}/>
                )} 
            />) 
        : <Redirect to={routePath.signIn} />
    )
}

export default Private