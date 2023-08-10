import React, { useState } from 'react'
import { Navbar } from '../components/Navbar'
import { useSelector } from 'react-redux';
import { useAuthStore } from '../hooks/useAuthStore';
import healthyApi from '../api/healthyApi';
import { Mypdf } from '../components/Mypdf';
import { Results } from './Results';

export const Completed = () => {

    const [generatePDF, setGeneratePDF] = useState(false);
    
    const { listMain } = useSelector(state => state.ui);

    const { user } = useAuthStore()

    const [response, setResponse] = useState([]);
    
    const mensaje = `Soy ${user.genero}, nací el ${user.fecha_nacimiento}. 
    Actualmente peso ${user.peso} kg y mido ${user.altura} cm.
    Que me recomiendas si tengo los siguientes objetivos 
    ${listMain[0].obj}, ${listMain[1].obj}, ${listMain[2].obj}.
    
    Los cuales los quiero conseguir de la siguiente forma
    ${listMain[3].obj}, ${listMain[4].obj}, ${listMain[5].obj}, respectivamente.
    
    Finalmente generame una rutina de entrenamiento que yo pueda seguir continuamente.`
    
    const prompt = [{
        "role": "user",
        "content": mensaje,   //texto de la evaluacion completa
        // "content": "Define que es Youtube en 3 lineas",   //Texto de prueba
    }]
    
    const handleSubmit = async(e) => {
        e.preventDefault();
        
        
        await healthyApi.post('/chat', {prompt})
            .then((res) => {
                let newText = res.data.replace(/-/g, '\n\n');
                setResponse(newText);
                setGeneratePDF(true);
                console.log(newText)
            })
            .catch((error) => {
                console.log(error);
            });
    }

    return (
        <>
            <Navbar />
            <h1 className="font-bold text-center">¡Gracias por confiar en nosotros!</h1>
                
                <div 
                    className="flex flex-column justify-content-center w-6 mx-auto h-auto mb-3"
                    style={{
                            backgroundColor: '#ced6e0',
                            boxShadow: "0 3px 10px rgb(0 0 0 / 0.2)"
                    }} 
                >

                    <p className="text-justify p-4 text-2xl">
                        Basado en la información que nos has brindado, 
                        hemos preparado un plan de entramiento basado 
                        en tus objetivos de estado físico.
                    </p>

                    <p className="text-justify p-4 text-2xl">
                        Además te dejamos una lista de recetas que puedes 
                        seguir que permitirán mejorar tu salud de 
                        una manera sostenible y efectiva.
                    </p>

                    <p className="text-justify p-4 text-2xl">
                        <b>Healthy Habits</b> quiere mejorar la calidad de vida 
                        de nuestros usuarios fomentando hábitos 
                        que te permitan alcanzar tus objetivos.
                    </p>

                    <div  className="flex flex-row justify-content-center mb-3">
                        {/* <Link to="/api"><button type="submit" className="button-28 text-2xl font-bold w-auto h-2rem" role="button">Siguiente</button></Link> */}
                        <button onClick={handleSubmit} type="submit" className="button-28 text-2xl font-bold h-2rem" role="button">Generar resultado</button>
                    </div>

                    <div className="flex flex-row justify-content-center mb-3">

                        
                        {/* {generatePDF === true && <Results data={response}/>} */}
                        {generatePDF === true && <Mypdf data={response}/>}
                        {/* <p className="text-justify">{response ? response : "Ask me anything..."}</p> */}
                    </div>
                </div>  
        </>
    )
}
