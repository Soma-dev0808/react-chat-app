import React, { useState, useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import AuthForm from "./AuthForm/AuthForm"

import { signUp } from "./service/service"
import { routePath } from "../../service/routes"

const SignUp = ({ history }) => {
    const dispatch = useDispatch()
    const { isAuthSucceeded, isAuthFailed, authError } = useSelector(({ authReducer }) => authReducer)
    const [ email, setEmail ] = useState("")
    const [ password, setPassword ] = useState("")

    useEffect(() => {
        isAuthSucceeded && history.push(routePath.selectRoom)
        isAuthFailed && alert(authError)
    }, [isAuthSucceeded, isAuthFailed])

    const registration = () => {
        dispatch(signUp({email, password}))
    }

    return (
        <AuthForm 
            isLogin={false} 
            formAction={registration} 
            setEmail={setEmail}
            setPassword={setPassword}
        />
    )
}

export default SignUp