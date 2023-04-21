import React, { useState } from 'react'
import { Navbar } from '../components/Navbar'
import { InputText } from 'primereact/inputtext';
import { RadioButton } from "primereact/radiobutton";
import { Calendar } from 'primereact/calendar';
import { InputNumber } from 'primereact/inputnumber';
import { useForm } from '../hooks/useForm'
import { useAuthStore } from '../hooks/useAuthStore';
import Swal from 'sweetalert2';
import { Link } from 'react-router-dom';


const RegisterFormFields = {
    registerName: '',
    registerLastName: '',
    registerGender: '',
    registerBirthday: '',
    registerHigh: '',
    registerWeight: '',
    registerEmail: '',
    registerPassword: '',
    registerPassword2: '',
}



export const Register = () => {

    const { startLogin, errorMessage, startRegister } = useAuthStore();

    const [gender, setGender] = useState('');
    const [birthday, setBirthday] = useState(null);
    const [high, setHigh] = useState(null);
    const [weight, setWeight] = useState(null);


    const {
        registerName,
        registerLastName,
        registerEmail,
        registerPassword,
        registerPassword2,   
        onInputChange 
    } = useForm(RegisterFormFields);

    const registerSubmit = (event) => {
        event.preventDefault();

        if( registerPassword !== registerPassword2) {
            Swal.fire('Error en el registro', 'Las contraseñas no coinciden', 'error');
            return;
        }

        startRegister({
            name: registerName,
            lastName: registerLastName,
            email: registerEmail,
            password: registerPassword,
            password2: registerPassword2 , 
            gender,
            birthday,
            high,
            weight,
        })
    }


    return (
        <>
            <Navbar />

            <h1 className="font-bold text-center">Registro</h1>
            
            <form 
                className="flex flex-column justify-content-center gap-3 w-4 mx-auto h-auto mb-5"
                style={{
                        backgroundColor: '#ced6e0',
                        boxShadow: "0 3px 10px rgb(0 0 0 / 0.2)"
                }}
                onSubmit={registerSubmit} 
            >

                <div className="flex flex-row justify-content-center mt-4">
                    <label htmlFor="username" className="w-6rem mr-7 text-xl my-auto">
                        Nombre
                    </label>
                    <InputText 
                        id="username" 
                        type="text"
                        name="registerName"
                        value={registerName}
                        onChange={onInputChange} 
                    />
                </div>

                <div className="flex flex-row justify-content-center">
                    <label htmlFor="username" className="w-6rem mr-7 text-xl my-auto">
                        Apellido
                    </label>
                    <InputText 
                        id="username" 
                        type="text"
                        name="registerLastName"
                        value={registerLastName}
                        onChange={onInputChange}
                    />
                </div>

                <div className="flex flex-row justify-content-center gap-3">
                    
                    <label htmlFor="username" className="w-6rem mr-7 text-xl text-">
                        Sexo
                    </label>
                    
                    <div className="flex align-items-center gap-1">
            {/* Atributos de RadioButton inputId="ingredient1" name="pizza" value="Cheese" onChange={(e) => setIngredient(e.value)} checked={ingredient === 'Cheese'} */}
                        <RadioButton 
                            inputId="gender" 
                            name="registerGender" 
                            value="Hombre"
                            onChange={
                                (e) => setGender(e.value)
                            }
                            checked={gender === 'Hombre'}
                        />
                        <label htmlFor="ingredient1" className="text-lg">Hombre</label>
                    </div>
                    <div className="flex align-items-center gap-1">
            {/* Atributos de RadioButton inputId="ingredient1" name="pizza" value="Cheese" onChange={(e) => setIngredient(e.value)} checked={ingredient === 'Cheese'} */}
                        <RadioButton 
                            inputId="gender" 
                            name="registerGender" 
                            value="Mujer"
                            onChange={
                                (e) => setGender(e.value)
                            }
                            checked={gender === 'Mujer'}
                        />
                        <label htmlFor="ingredient1" className="text-lg">Mujer</label>
                    </div>
                </div>

                <div className="flex flex-row justify-content-center">
                    <label htmlFor="username" className="w-6rem mr-7 text-xl text-">
                        Fecha de nacimiento
                    </label>
                    <span className="p-float-label">
                        {/* Atributos de calendar inputId="birth_date" value={date} onChange={(e) => setDate(e.date)} */}
                        <Calendar 
                            inputId="birth_date"
                            name="registerBirthday"
                            value={birthday}
                            onChange={(e) => setBirthday(e.value)}  
                            dateFormat="dd/mm/yy"
                        />
                    </span>
                </div>
                
                <div className="flex flex-row justify-content-center">
                    <label htmlFor="username" className="w-6rem mr-7 text-xl text-">
                        Altura
                    </label>
                    <InputNumber 
                        id="integer" 
                        keyfilter="int" 
                        suffix=" cm" 
                        useGrouping={false}
                        name="registerHigh"
                        value={high}
                        onValueChange={(e) => setHigh(e.value)}
                    />
                </div>

                <div className="flex flex-row justify-content-center">
                    <label htmlFor="username" className="w-6rem mr-7 text-xl text-">
                        Peso
                    </label>
                    <InputNumber 
                        id="integer" 
                        keyfilter="int" 
                        suffix=" kg" 
                        useGrouping={false}
                        name="registerWeight"
                        value={weight}
                        onValueChange={(e) => setWeight(e.value)}
                    />
                </div>
                
                <div className="flex flex-row justify-content-center">
                    <label htmlFor="username" className="w-6rem mr-7 text-xl my-auto">
                            Correo
                        </label>
                    <InputText 
                        id="username" 
                        type="text" 
                        placeholder="example@example.com"
                        name="registerEmail"
                        value={registerEmail}
                        onChange={onInputChange}
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
                        name="registerPassword"
                        value={registerPassword}
                        onChange={onInputChange}
                    />
                </div>

                <div className="flex flex-row justify-content-center">
                    <label htmlFor="password" className="w-6rem mr-7 text-xl my-auto">
                        Validar
                    </label>
                    <InputText 
                        id="password" 
                        type="password" 
                        placeholder="Repite la contraseña" 
                        name="registerPassword2"
                        value={registerPassword2}
                        onChange={onInputChange}
                    />
                </div>
                
                <div className="w-full md:w-5 flex justify-content-center mx-auto">
                    <button 
                        type="submit" 
                        className="button-28 text-xl font-bold w-auto" 
                        role="button"
                    >    
                        Registrarse
                    </button>
                </div>
                <span className="account flex justify-content-center mx-auto w-7 flex mb-2 font-light text-base">
                        <Link to="/auth/login" style={{color:"black"}}>Ya tengo cuenta en <b>Healthy Habits</b></Link>
                </span>
            </form>
        
        
        
        </>
    )
}

