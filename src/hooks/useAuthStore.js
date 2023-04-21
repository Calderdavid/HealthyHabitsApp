import { useDispatch, useSelector } from "react-redux"
import healthyApi from '../api/healthyApi'
import { clearErrorMessage, onChecking, onLogin, onLogout } from "../store/authSlice";


export const useAuthStore = () => {
    
    const rol = 'USER_ROLE'

    const { status, user, errorMessage } = useSelector(state => state.auth);
    
    const dispatch = useDispatch();


    const startLogin = async({email, password}) => {

        dispatch( onChecking() );
        try {
            const {data} = await healthyApi.post('/auth/login',{correo: email, password: password});
            localStorage.setItem('token', data.token);
            localStorage.setItem('token-init-date', new Date().getTime());

            dispatch( onLogin({name: data.usuario.nombre, uid: data.usuario.uid}) );

        }catch (err) {
            dispatch(onLogout('Credenciales Incorrectas'))
            setTimeout(() => {
                dispatch(clearErrorMessage())
            }, 10);

        }

    }

    const startRegister = async(user) => {

        const {
            name,
            lastName,
            email,
            password,
            password2,
            gender,
            birthday,
            high,
            weight,
        } = user;

        dispatch( onChecking() );
        
        let options = {year: 'numeric', month: 'long', day: 'numeric' };

        const formatDate = birthday.toLocaleDateString('es-ES', options);

        try {
            const {data} = await healthyApi.post('/usuarios',{
                nombre: name,
                apellido: lastName,
                genero: gender,
                fecha_nacimiento: formatDate,
                altura: high,
                peso: weight,
                correo: email,
                password: password,
                rol: rol
            });
            localStorage.setItem('token', data.token);
            localStorage.setItem('token-init-date', new Date().getTime());

            dispatch( onLogin({name: data.usuario.nombre, uid: data.usuario.uid}) );

        }catch (err) {
            dispatch(onLogout(err.response.data?.msg || '--'))
            setTimeout(() => {
                dispatch(clearErrorMessage())
            }, 10);

        }

    }

    const checkAuthToken = async() => {
        const token = localStorage.getItem('token');

        if ( !token ) return dispatch(onLogout());

        try {
            const {data} = await healthyApi.get('/auth/renew');

            localStorage.setItem('token', data.token);
            localStorage.setItem('token-init-date', new Date().getTime());

            dispatch( onLogin({name: data.nombre, uid: data.token}) );

        } catch (err) {
            console.log(err)
            localStorage.clear();
            dispatch(onLogout());
        }
    }

    const startLogout = () => {
        localStorage.clear();
        dispatch(onLogout());
    }




    return {
        //  Propiedades
        errorMessage,
        status, 
        user, 


        // Métodos
        startLogin,
        startRegister,
        checkAuthToken,
        startLogout
    }
}