import React, {useState, useEffect} from 'react'
import { Navbar } from '../components/Navbar'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios';
import healthyApi from '../api/healthyApi';
import { useAuthStore } from '../hooks/useAuthStore';
import { useDispatch, useSelector } from 'react-redux';
import { animateScroll as scroll} from 'react-scroll';
import { fillList } from '../store/ui/uiSlice';

const goals = {
    objetivo1: "Reducir la ingesta de carbohidratos refinados",
    objetivo2: "Aumentar la ingesta de vegetales y ensaladas",
    objetivo3: "Controlar las porciones y reducir el tamaño de los platos",
}

export const EvaluationObj4 = ({list, setList, finish, setFinish}) => {
    
    //almacena la lista de objetivos seleccionados
    // const [list, setList] = useState([])
    const dispatch = useDispatch();
    
    //configura el prompt para hacer la petición a la api de openai
    const [prompt, setPrompt] = useState("");
    const [response, setResponse] = useState("");
    
    //Informacion del usuario autenticado
    const { user } = useAuthStore();

    const navigate = useNavigate();

    
    const [goal1, setGoal1] = useState({
        id: 1,
        obj: "Reducir la ingesta de carbohidratos refinados",
        estado: false
    });
    const [goal2, setGoal2] = useState({
        id: 2,
        obj: "Aumentar la ingesta de vegetales y ensaladas",
        estado: false
    });
    const [goal3, setGoal3] = useState({
        id: 3,
        obj: "Controlar las porciones y reducir el tamaño de los platos",
        estado: false
    });

    //Controla la cantidad de elementos seleccionados (3)
    const [count, setCount] = useState(0);


    useEffect(() => {

        let filteredList = list.filter(item => item.estado === true );
        
        setList(filteredList)    
        dispatch(fillList(filteredList));
      
    }, [goal1, goal2, goal3])
    
    
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
    // const scrollDown = (value) => {
    //     window.scrollTo({
    //     top: value,
    //     behavior: 'smooth'
    // })};
    
                
    const handleSubmit = async(e) => {
        e.preventDefault();

        // setIndex(next)

        // scroll.scrollTo(800, 'smooth');

        if (list.length === 6) {
            setFinish(true)
            navigate('/completed');
        } else {
            scroll.scrollMore(750, 'smooth');
        }

        


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

            <h1 className="font-bold text-center">Quiero perder peso</h1>
                
                <div 
                    className="flex flex-column justify-content-center w-4 mx-auto h-auto mb-3"
                    style={{
                            backgroundColor: '#ced6e0',
                            boxShadow: "0 3px 10px rgb(0 0 0 / 0.2)",
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
