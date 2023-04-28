import React from 'react'
import 'primeicons/primeicons.css';

export const Footer = () => {
  return (
    <>
    
        <div 
            className="container flex flex-row justify-content-around align-items-center"
            style={{
                backgroundColor: "#f1f2f6",
            }}
        >
            
            <div className="footer-desc mx-6 my-2">
                <h3>Healthy Habits</h3>

                <p className="text-justify text-lg">
                    Es una aplicación web que aborda temas de planificación de comidas 
                    saludables y rutinas de entrenamiento personalizadas para ayudar 
                    a las personas a mejorar su salud y estado físico de manera
                    sostenible y efectiva.
                </p>
            </div>

            <div className="footer-contact mx-6 my-2">
                <h3>Contacto</h3>

                <p className="text-lg my-2"><i className="pi pi-home"> Santiago, Chile</i></p>
                <p className="text-lg my-2"><i className="pi pi-inbox"> info@example.com</i></p>
                <p className="text-lg my-2"><i className="pi pi-phone"> +56 9 22455634</i></p>
            </div>



        </div>
    
    
    
    </>
  )
}