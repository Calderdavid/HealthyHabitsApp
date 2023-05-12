import React, {useEffect} from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'
import { Login } from '../auth/Login'
import { Register } from '../auth/Register'
import { HomePage } from '../HealthyHabits/HomePage'
import { useAuthStore } from '../hooks/useAuthStore'
import { Evaluation } from '../HealthyHabits/Evaluation'
import { OpenAI } from '../api/openAI'


export const AppRouter = () => {

    const {status, checkAuthToken}= useAuthStore();

    useEffect(() => {
        checkAuthToken();
    }, [])
    

    if (status === 'checking') {
        return (
            <h3>Cargando...</h3>
        )
    }

    //Si no estoy autenticado me va a redireccionar directamente al auth/login

    //De lo contrario si estoy autenticado me va a redireccionar a la pagina principal 



    return (
        <>
            <Routes>
                {
                    (status === 'not-authenticated')
                    
                    ? (
                        <>
                            <Route path="/auth/*" element={<Login/>} />
                            <Route path="/auth/register" element={<Register/>} />
                            <Route path="/*" element={<Navigate to="/auth/login" />} />
                        </>
                    )
                        
                    
                    : (
                        <>
                            <Route path="/" element={<HomePage/>} />
                            <Route path="/evaluation" element={<Evaluation/>} />
                            <Route path="/api" element={<OpenAI/>} />
                            <Route path="/*" element={<Navigate to="/" />} />
                        </>
                    )

                }             

            </Routes>
        
        
        
        </>
    )
}
