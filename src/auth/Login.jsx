import React, {useEffect} from 'react'
import { Navbar } from '../components/Navbar'
import 'primereact/resources/themes/saga-blue/theme.css'; // Tema de PrimeReact
import 'primereact/resources/primereact.min.css'; // Estilos de PrimeReact
import 'primeicons/primeicons.css'; // Iconos de PrimeReact
import { InputText } from 'primereact/inputtext';
import { useForm } from '../hooks/useForm'
import { useAuthStore } from '../hooks/useAuthStore';
import Swal from 'sweetalert2';
import { Link } from 'react-router-dom';



const loginFormFields = {
    loginEmail: '',
    loginPassword: '',
}

export const Login = () => {
    
    const { startLogin, errorMessage } = useAuthStore();
    
    const {loginEmail, loginPassword, onInputChange:onLoginInputChange} = useForm(loginFormFields);
    
    const loginSubmit = (event) => {
        event.preventDefault();

        Swal.fire(
            'Excelente!',
            'Bienvenido a Healthy Habits!',
            'success'
        )

        startLogin({email: loginEmail, password: loginPassword})
    }

    useEffect(() => {
      if (errorMessage !== undefined) {
        Swal.fire('Error en la autenticación', errorMessage, 'error')
      }
    }, [errorMessage])
    
    
    
    return (
        <>
            <Navbar />
            
            <h1 className="font-bold text-center">INICIO DE SESIÓN</h1>
            
            <form 
                className="flex flex-column justify-content-center gap-3 w-4 mx-auto h-auto"
                style={{
                        backgroundColor: '#ced6e0',
                        boxShadow: "0 3px 10px rgb(0 0 0 / 0.2)"
                }} 
                onSubmit={loginSubmit}
            >
                    <div className="flex flex-row justify-content-center mt-4">
                        <label htmlFor="username" className="w-6rem mr-7 text-xl my-auto">
                            Correo
                        </label>
                        <InputText 
                            id="username" 
                            type="text" 
                            placeholder="example@example.com"
                            name="loginEmail"
                            value={loginEmail}
                            onChange={onLoginInputChange}
                        />
                    </div>
                    <div className="flex flex-row justify-content-center">
                        <label htmlFor="password" className="w-6rem mr-7 text-xl my-auto">
                            Contraseña
                        </label>
                        <InputText 
                            id="password" 
                            type="password" 
                            placeholder="Ingrese una contraseña"
                            name="loginPassword"
                            value={loginPassword}
                            onChange={onLoginInputChange}
                        />
                    </div>
                    <div className="w-full md:w-5 flex justify-content-center  mx-auto">
                        <button type="submit" className="button-28 text-xl font-bold" role="button">INICIAR</button>
                    </div>
                    
                    <span className="account flex justify-content-center mx-auto w-7 flex mb-2 font-light text-base">
                        <Link to="/auth/register" style={{color:"black"}}>¿No estás registrado <b>Healthy Habits</b>?</Link>
                    </span>
                    
                </form>   
        </>
    )
}
