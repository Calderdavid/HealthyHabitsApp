import React, {useEffect} from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'
import { Login } from '../auth/Login'
import { Register } from '../auth/Register'
import { HomePage } from '../HealthyHabits/HomePage'
import { useAuthStore } from '../hooks/useAuthStore'
import { Evaluation } from '../HealthyHabits/Evaluation'
import { OpenAI } from '../api/openAI'
import { EvaluationObj1 } from '../HealthyHabits/EvaluationObj1'
import { EvaluationObj2 } from '../HealthyHabits/EvaluationObj2'
import { EvaluationObj3 } from '../HealthyHabits/EvaluationObj3'
import { EvaluationObj4 } from '../HealthyHabits/EvaluationObj4'
import { EvaluationObj5 } from '../HealthyHabits/EvaluationObj5'
import { EvaluationObj6 } from '../HealthyHabits/EvaluationObj6'
import { Completed } from '../HealthyHabits/Completed'
import { Chatbot } from '../HealthyHabits/Chatbot'
import { Profile } from '../HealthyHabits/Profile'
import { RoutineCustom } from '../HealthyHabits/RoutineCustom'


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
                            <Route path="/completed" element={<Completed />} />
                            <Route path="/chatbot" element={<Chatbot />} />
                            <Route path="/profile" element={<Profile />} />
                            <Route path="/custom" element={<RoutineCustom />} />
                            <Route path="/api" element={<OpenAI/>} />
                            <Route path="/*" element={<Navigate to="/" />} />
                        </>
                    )

                }             

            </Routes>
        
        
        
        </>
    )
}
