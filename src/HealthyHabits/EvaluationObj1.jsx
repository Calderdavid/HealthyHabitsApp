import React, {useState, useEffect} from 'react'
import { Navbar } from '../components/Navbar'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios';
import healthyApi from '../api/healthyApi';
import { useAuthStore } from '../hooks/useAuthStore';
import { useSelector } from 'react-redux';
import { EvaluationObj2 } from './EvaluationObj2';
import { EvaluationObj3 } from './EvaluationObj3';
import { EvaluationObj4 } from './EvaluationObj4';
import { EvaluationObj5 } from './EvaluationObj5';
import { EvaluationObj6 } from './EvaluationObj6';
import { animateScroll as scroll} from 'react-scroll';
import { useDispatch } from "react-redux"
import { fillList } from '../store/ui/uiSlice';

const goals = {
    objetivo1: "Comenzar etapa de volumen con baja cantidad de grasa",
    objetivo2: "Quiero mantener mi peso pero desarrollar los músculos",
    objetivo3: "Quiero progresar y levantar mayor peso",
}

export const EvaluationObj1 = ({list, setList, finish, setFinish}) => {
    
    // const { listMain, ids } = useSelector(state => state.ui);

    // const [index, setIndex] = useState(0)
    const dispatch = useDispatch();

    // console.log(listMain)
    //almacena la lista de objetivos seleccionados
    // const [list, setList] = useState([])
    
    //configura el prompt para hacer la petición a la api de openai
    const [prompt, setPrompt] = useState("");
    const [response, setResponse] = useState("");
    
    //Informacion del usuario autenticado
    const { user } = useAuthStore();

    const navigate = useNavigate();

    
    const [goal1, setGoal1] = useState({
        id: 1,
        obj: "Comenzar etapa de volumen con baja cantidad de grasa",
        estado: false
    });
    const [goal2, setGoal2] = useState({
        id: 2,
        obj: "Quiero mantener mi peso pero desarrollar los músculos",
        estado: false
    });
    const [goal3, setGoal3] = useState({
        id: 3,
        obj: "Quiero progresar y levantar mayor pesos",
        estado: false
    });

    //Controla la cantidad de elementos seleccionados (3)
    const [count, setCount] = useState(0);


    useEffect(() => {

        let filteredList = list.filter(item => item.estado === true );
        
        setList(filteredList)
        
        dispatch(fillList(filteredList));    
      
    }, [goal1, goal2, goal3, finish])
    
    
    const addElements = (item) => {
        setList([...list, item]);
    }

    const removeItem = (obj) => {
        const newList = list.map(e => {
            if(e.obj === obj){
                return {...e, estado: false}
            }
            return e
        })
        setList(newList);
    }
    
    // const requestUser = async(id) => {
        
    //     await healthyApi.get("/usuarios")
    //         .then((res) => {
    //             // console.log(res)
    //             //se obtiene toda la info del usuario
    //             let filteredList = res.data.usuarios.filter(user => user.uid === id );
    //         })
    //         .catch((err) => {
    //             console.log(err)
    //         })
    // }
                
    // requestUser(id)
    
                
    const handleSubmit = async(e) => {
        e.preventDefault();

        if (list.length === 6) {
            setFinish(true)
            navigate('/completed');
        } else {
            scroll.scrollMore(750, 'smooth');
        }

        // setIndex(ids.slice(1))
        // setIndex(list[0].id);
        
        // await healthyApi.post('/chat', { prompt })
        //     .then((res) => {
        //         setResponse(res.data);
                
        //         let customMessage = `
        //             Soy ${user.genero}, nací el ${user.fecha_nacimiento}. 
        //             Actualmente peso ${user.peso} kg y mido ${user.altura} cm.
        //             Que me recomiendas si tengo como objetivo ${list[0].obj}
        //         `

        //         setPrompt(customMessage);
        //     })
        //     .catch((error) => {
        //         console.log(error);
        //     });
    }

    // let customMessage = `
    //     Soy ${user.genero}, nací el ${user.fecha_nacimiento}. 
    //     Actualmente peso ${user.peso} kg y mido ${user.altura} cm.
    //     Que me recomiendas si tengo como objetivo
    // `

    // console.log(customMessage);
    // console.log(list)

    return (
        <div style={{marginTop: '150px', marginBottom: '200px'}}>

            <h1 className="font-bold text-center">Quiero ganar masa muscular</h1>
                
                <div 
                    className="flex flex-column justify-content-center w-4 mx-auto h-auto mb-3"
                    style={{
                            backgroundColor: '#ced6e0',
                            boxShadow: "0 3px 10px rgb(0 0 0 / 0.2)"
                    }} 
                >
                    <div className="flex flex-row justify-content-center">
                        {
                            !goal1.estado
                            ?
                                <button 
                                    value={goals.objetivo1} 
                                    onClick={
                                        () => {
                                            if (count < 1){
                                                let updateItem = {...goal1, estado: true}
                                                setGoal1(updateItem)
                                                setCount(count + 1)
                                                addElements(updateItem)
                                                setPrompt("Que es Youtube?")
                                                // setList([...list, updateItem])

                                            }
                                        }  
                                    } 
                                    className="button-29 text-2xl font-bold  h-auto mt-3 text-black-alpha-80" role="button"
                                >
                                    {goals.objetivo1}
                                </button>
                            :
                                <button 
                                        onClick={
                                            () => {
                                                let updateItem = {...goal1, estado: false}
                                                setGoal1(updateItem)
                                                setCount(count - 1)
                                                removeItem(updateItem.obj)
                                                // setList([...list, updateItem])
                                            }
                                        } 
                                        className="button-29 text-2xl font-bold  h-auto mt-3 text-black-alpha-80 border-black-alpha-80" 
                                        role="button"
                                    >
                                        {goals.objetivo1}
                                </button>

                        }
                    </div>

                    <div className="flex flex-row justify-content-center">
                        {
                            !goal2.estado
                            ?
                                <button 
                                    value={goal2} 
                                    onClick={
                                        () => {
                                            if (count < 1){
                                                let updateItem = {...goal2, estado: true}
                                                setGoal2(updateItem)
                                                setCount(count + 1)
                                                addElements(updateItem)
                                                // setList([...list, updateItem])
                                            }
                                        } 
                                    }
                                    className="button-29 text-2xl font-bold  h-auto mt-3 text-black-alpha-80" role="button"
                                >
                                    {goals.objetivo2}
                                </button>
                            :
                                <button 
                                        onClick={
                                            () => {
                                                let updateItem = {...goal2, estado: false}
                                                setGoal2(updateItem)
                                                setCount(count - 1)
                                                removeItem(updateItem.obj)
                                            }
                                        } 
                                        className="button-29 text-2xl font-bold  h-auto mt-3 text-black-alpha-80 border-black-alpha-80" 
                                        role="button"
                                    >
                                        {goals.objetivo2}
                                </button>
                        }
                    </div>

                    <div className="flex flex-row justify-content-center">
                        {
                            !goal3.estado
                            ?
                                <button 
                                    value={goal3} 
                                    onClick={
                                        () => {
                                            if (count < 1){
                                                let updateItem = {...goal3, estado: true}
                                                setGoal3(updateItem)
                                                setCount(count + 1)
                                                addElements(updateItem)
                                                // setList([...list, updateItem])
                                            }
                                        } 
                                    }
                                    className="button-29 text-2xl font-bold  h-auto mt-3 text-black-alpha-80" 
                                    role="button"
                                >
                                    {goals.objetivo3}
                                </button>
                            :
                                <button 
                                        onClick={
                                            () => {
                                                let updateItem = {...goal3, estado: false}
                                                setGoal3(updateItem)
                                                setCount(count - 1)
                                                removeItem(updateItem.obj)
                                            }
                                        } 
                                        className="button-29 text-2xl font-bold  h-auto mt-3 text-black-alpha-80 border-black-alpha-80" 
                                        role="button"
                                    >
                                        {goals.objetivo3}
                                </button>
                        }
                    </div>

                    <div onClick={handleSubmit} className="flex flex-row justify-content-center mt-3 mb-3">
                        {/* <Link to="/api"><button type="submit" className="button-28 text-2xl font-bold w-auto h-2rem" role="button">Siguiente</button></Link> */}  
                                <button type="submit" className="button-28 text-2xl font-bold w-auto h-2rem" role="button">Siguiente</button>                        
                    </div>
                    
                    {/* <div className="flex flex-row justify-content-center mb-3">
                        <p>{response ? response : "Ask me anything..."}</p>
                    </div> */}
        
                </div>
        </div>
    )
}
