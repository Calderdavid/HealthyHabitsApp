import React, {useState} from 'react'
import 'primeflex/primeflex.css';
import 'primeicons/primeicons.css';
import { useAuthStore } from '../hooks/useAuthStore';
import { Button } from 'primereact/button';
import { Sidebar } from 'primereact/sidebar';
import { Link, Navigate } from 'react-router-dom';
import { Chatbot } from '../HealthyHabits/Chatbot';


export const Header = () => {

  const { startLogout, user } = useAuthStore();

  const [visible, setVisible] = useState(false);


  return (
    <>
        <div 
          className="container flex justify-content-between"
          style={{
            backgroundColor: '#FFFFFF',
            boxShadow: "0 10px 6px -6px #777",
          }}
        >
          {/* <h4 
            className="ml-6 font-bold text-6xl cursor-pointer" 
            style={{
                color:'black',
            }}
          >
              {user.nombre}
          </h4> */}
          <div className="ml-6 my-auto cursor-pointer">
            <Sidebar visible={visible} onHide={() => setVisible(false)} className="w-full md:w-20rem lg:w-30rem">
              <h2>Menú</h2>
              <nav>
                <Link to="/profile" className="ml-2 text-2xl"><li className="text-900">Perfil</li></Link>
                <Link to="/custom" className="ml-2 text-2xl"><li className="text-900">Crea tu plan</li></Link>
                <Link to="/chatbot" className="ml-2 text-2xl"><li className="text-900">Asistente virtual</li></Link>
                <Link to="/evaluation" className="ml-2 text-2xl"><li className="text-900">Evaluacion</li></Link>
              </nav>
            </Sidebar>
            <Button className="text-900 surface-0 border-transparent" icon="pi pi-bars text-3xl" onClick={() => setVisible(true)}/>
          </div>
          

          <Link to="/"><h4 
            className="ml-6 font-bold text-6xl cursor-pointer" 
            style={{
                color:'#2ECC71',
            }}
          >
              Healthy Habits 🧠
          </h4></Link>
          
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
