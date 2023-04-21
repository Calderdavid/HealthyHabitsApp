import React from 'react'
import 'primeflex/primeflex.css';
import 'primeicons/primeicons.css';
import { useAuthStore } from '../hooks/useAuthStore';


export const Header = () => {

  const { startLogout, user } = useAuthStore();

  return (
    <>
        <div 
          className="container flex justify-content-between"
          style={{
          backgroundColor: '#FFFFFF',
          boxShadow: "0 10px 6px -6px #777"
          }}
        >
          <h4 
            className="ml-6 font-bold text-6xl cursor-pointer" 
            style={{
                color:'black',
            }}
          >
              {user.name}
          </h4>
          

          <h4 
            className="ml-6 font-bold text-6xl cursor-pointer" 
            style={{
                color:'#2ECC71',
            }}
          >
              Healthy Habits 🧠
          </h4>
          
          <div className="my-auto mr-6">
                    <a 
                        href="#" 
                        className="login-link font-bold"
                        style={{
                          color: '#c0392b'
                        }}
                        onClick={startLogout}
                        
                      >
                        Cerrar Sesión
                    </a>
          </div>
        </div>  
    
    </>
    
  )
}
