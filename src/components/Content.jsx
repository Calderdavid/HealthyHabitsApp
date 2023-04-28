import React from 'react'
import c1 from '../assets/c1.jpg'
import c2 from '../assets/c2.jpg'
import c3 from '../assets/img2.jpg'

export const Content = () => {
  return (
    <>
        <div 
            className="container flex flex-row justify-content-around align-items-center"
            style={{
                boxShadow: "0 3px 10px rgb(0 0 0 / 0.2)"
            }}
        >

            <div className="img mx-6 my-4">
                    <img 
                        src={c1} 
                        style={{
                            width: "55vw", 
                            height: '80vh',
                            borderRadius: "10px",
                            boxShadow: "0 3px 10px rgb(0 0 0 / 0.2)"
                            }}
                    ></img>
            </div>

            <div className="mx-6 my-4">
                    
                    <h3>¡Activa tu bienestar!</h3>
                    <p className="text-justify">
                        Mantener un estilo de vida saludable y activo, 
                        que incluya actividad física regular, es esencial 
                        para mantener una buena salud en todos los aspectos de la vida. 
                    </p>                
            </div>

        </div>

        <div 
            className="container flex flex-row justify-content-around align-items-center"
            style={{
                boxShadow: "0 3px 10px rgb(0 0 0 / 0.2)"
            }}
        
        >

            <div className="mx-6 my-4">
                    
                    <h3>Optimiza tu salud</h3>
                    <p className="text-justify">
                    La actividad física activa no solo fortalece los músculos y huesos, 
                    sino que también libera endorfinas, lo que mejora el estado de ánimo 
                    y reduce el estrés.
                    </p>                
            </div>

            <div className="img mx-6 my-4">
                    <img 
                        src={c2} 
                        style={{
                            width: "55vw", 
                            height: '80vh',
                            borderRadius: "10px",
                            boxShadow: "0 3px 10px rgb(0 0 0 / 0.2)"
                            }}
                    ></img>
            </div>


        </div>

        <div 
            className="container flex flex-row justify-content-around align-items-center"
            style={{
                boxShadow: "0 3px 10px rgb(0 0 0 / 0.2)"
            }}
        >

            <div className="img mx-6 my-4">
                    <img 
                        src={c3} 
                        style={{
                            width: "55vw", 
                            height: '80vh',
                            borderRadius: "10px",
                            boxShadow: "0 3px 10px rgb(0 0 0 / 0.2)"
                        }}
                    ></img>
            </div>

            <div className="mx-6 my-4">
                    
                    <h3>¡Alimentate bien!</h3>
                    <p className="text-justify">
                    Con una alimentación equilibrada, 
                    rica en nutrientes esenciales, 
                    se obtiene el combustible adecuado para 
                    el cuerpo y la mente, lo que promueve una 
                    mayor energía y claridad mental.
                    </p>                
            </div>

        </div>
    
    </>
  )
}

