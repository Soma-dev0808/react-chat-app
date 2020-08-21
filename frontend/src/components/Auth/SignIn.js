import React, { useState, useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import AuthForm from "./AuthForm/AuthForm"

import { signIn } from "./service/service"
import { routePath } from "../../service/routes"

const SignIn = ({ history }) => {
    const dispatch = useDispatch()
    const { isAuthSucceeded, isAuthFailed, authError } = useSelector(({ authReducer }) => authReducer)
    const [ email, setEmail ] = useState("")
    const [ password, setPassword ] = useState("")

    useEffect(() => {
        isAuthSucceeded && history.push(routePath.selectRoom)
        isAuthFailed && alert(authError)
    }, [isAuthSucceeded, isAuthFailed])

    const login = () => {
        dispatch(signIn({email, password}))
    }

    return (
        <AuthForm 
            isLogin={true} 
            formAction={login} 
            setEmail={setEmail}
            setPassword={setPassword}
        />
    )
}

export default SignIn