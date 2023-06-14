import React, {useState, useEffect} from 'react'
import { Navbar } from '../components/Navbar'
import { Link } from 'react-router-dom'
import axios from 'axios';
import healthyApi from '../api/healthyApi';
import { useAuthStore } from '../hooks/useAuthStore';
import { EvaluationObj1 } from './EvaluationObj1';
import { EvaluationObj2 } from './EvaluationObj2';
import { EvaluationObj3 } from './EvaluationObj3';
import { EvaluationObj4 } from './EvaluationObj4';
import { EvaluationObj5 } from './EvaluationObj5';
import { EvaluationObj6 } from './EvaluationObj6';
import { useDispatch, useSelector } from "react-redux"
import { onIds, fillList } from '../store/ui/uiSlice';
import { animateScroll as scroll} from 'react-scroll';
import { Completed } from './Completed';

const goals = {
    objetivo1: "Perder peso",
    objetivo2: "Mejorar mi forma física",
    objetivo3: "Ganar masa muscular",
    objetivo4: "Mejorar mi alimentación",
    objetivo5: "Ganar peso",
    objetivo6: "Ser más productivo"
}

export const Evaluation = () => {

    // const dispatch = useDispatch();
    
    //almacena la lista de objetivos seleccionados
    const [list, setList] = useState([])

    const [finish, setFinish] = useState(false)

    const [ids, setIds] = useState([])

    const [next, setNext] = useState(0)

    const [index1, setIndex1] = useState(false)
    const [index2, setIndex2] = useState(false)
    const [index3, setIndex3] = useState(false)
    const [index4, setIndex4] = useState(false)
    const [index5, setIndex5] = useState(false)
    const [index6, setIndex6] = useState(false)
    
    //configura el prompt para hacer la petición a la api de openai
    const [prompt, setPrompt] = useState("");
    const [response, setResponse] = useState("");
    
    //Informacion del usuario autenticado
    const { user } = useAuthStore();

    
    const [goal1, setGoal1] = useState({
        id: 1,
        obj: "Perder peso",
        estado: false
    });
    const [goal2, setGoal2] = useState({
        id: 2,
        obj: "Mejorar mi forma física",
        estado: false
    });
    const [goal3, setGoal3] = useState({
        id: 3,
        obj: "Ganar masa muscular",
        estado: false
    });
    const [goal4, setGoal4] = useState({
        id: 4,
        obj: "Mejorar mi alimentación",
        estado: false
    });
    const [goal5, setGoal5] = useState({
        id: 5,
        obj: "Ganar peso",
        estado: false
    });
    const [goal6, setGoal6] = useState({
        id: 6,
        obj: "Ser más productivo",
        estado: false
    });

    //Controla la cantidad de elementos seleccionados (3)
    const [count, setCount] = useState(0);


    useEffect(() => {

        let filteredList = list.filter(item => item.estado === true );
        
        setList(filteredList)

        // dispatch(fillList(filteredList));



      
    }, [goal1, goal2, goal3, goal4, goal5, goal6, index1, index2, index3, index4, index5, index6, finish])
    
    
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
    // console.log(list)

    // const scrollDown = (value) => {
    //     window.scrollTo({
    //     top: value,
    //     behavior: 'smooth'
    // })};
                
    const handleSubmit = async(e) => {
        e.preventDefault();

        scroll.scrollTo(800, 'smooth');

        // dispatch(onIds(filteredId))
        
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

    const handleInputChange = (e) => {
        // setData({
        //     ...data,
        //     [e.target.name]: e.target.value;
        // })

    }

    // console.log(list)
    // console.log(finish)


    return (
        <>
            <Navbar />
            <h1 className="font-bold text-center">Mi objetivo es:</h1>
                
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
                                            if (count < 3){
                                                let updateItem = {...goal1, estado: true}
                                                setGoal1(updateItem)
                                                setCount(count + 1)
                                                addElements(updateItem)
                                                setIndex1(true)
                                                // setList([...list, updateItem])

                                            }
                                        }  
                                    } 
                                    className="button-29 text-2xl font-bold  h-2rem mt-3 text-black-alpha-80" role="button"
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
                                                setIndex1(false)
                                                // setList([...list, updateItem])
                                            }
                                        } 
                                        className="button-29 text-2xl font-bold  h-2rem mt-3 text-black-alpha-80 border-black-alpha-80" 
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
                                            if (count < 3){
                                                let updateItem = {...goal2, estado: true}
                                                setGoal2(updateItem)
                                                setCount(count + 1)
                                                addElements(updateItem)
                                                setIndex2(true)
                                                // setList([...list, updateItem])
                                            }
                                        } 
                                    }
                                    className="button-29 text-2xl font-bold  h-2rem mt-3 text-black-alpha-80" role="button"
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
                                                setIndex2(false)
                                            }
                                        } 
                                        className="button-29 text-2xl font-bold  h-2rem mt-3 text-black-alpha-80 border-black-alpha-80" 
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
                                            if (count < 3){
                                                let updateItem = {...goal3, estado: true}
                                                setGoal3(updateItem)
                                                setCount(count + 1)
                                                addElements(updateItem)
                                                setIndex3(true)
                                                // setList([...list, updateItem])
                                            }
                                        } 
                                    }
                                    className="button-29 text-2xl font-bold  h-2rem mt-3 text-black-alpha-80" 
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
                                                setIndex3(false)
                                            }
                                        } 
                                        className="button-29 text-2xl font-bold  h-2rem mt-3 text-black-alpha-80 border-black-alpha-80" 
                                        role="button"
                                    >
                                        {goals.objetivo3}
                                </button>
                        }
                    </div>

                    <div className="flex flex-row justify-content-center">
                        {
                            !goal4.estado
                            ?
                                <button 
                                    value={goal4} 
                                    onClick={
                                        () => {
                                            if (count < 3){
                                                let updateItem = {...goal4, estado: true}
                                                setGoal4(updateItem)
                                                setCount(count + 1)
                                                addElements(updateItem)
                                                setIndex4(true)
                                                // setList([...list, updateItem])
                                            }
                                        } 
                                    }
                                    className="button-29 text-2xl font-bold  h-2rem mt-3 text-black-alpha-80" 
                                    role="button"
                                >
                                    {goals.objetivo4}
                                </button>
                            :
                                <button 
                                        onClick={
                                            () => {
                                                let updateItem = {...goal4, estado: false}
                                                setGoal4(updateItem)
                                                setCount(count - 1)
                                                removeItem(updateItem.obj)
                                                setIndex4(false)
                                            }
                                        } 
                                        className="button-29 text-2xl font-bold  h-2rem mt-3 text-black-alpha-80 border-black-alpha-80" 
                                        role="button"
                                    >
                                        {goals.objetivo4}
                                </button>

                        }
                    </div>

                    <div className="flex flex-row justify-content-center">
                        {
                            !goal5.estado
                            ?
                                <button 
                                    value={goal5} 
                                    onClick={
                                        () => {
                                            if (count < 3){
                                                let updateItem = {...goal5, estado: true}
                                                setGoal5(updateItem)
                                                setCount(count + 1)
                                                addElements(updateItem)
                                                setIndex5(true)
                                                // setList([...list, updateItem])
                                            }
                                        } 
                                    }
                                    className="button-29 text-2xl font-bold  h-2rem mt-3 text-black-alpha-80" 
                                    role="button"
                                >
                                    {goals.objetivo5}
                                </button>
                            :
                                <button 
                                    onClick={
                                        () => {
                                            let updateItem = {...goal5, estado: false}
                                            setGoal5(updateItem)
                                            setCount(count - 1)
                                            removeItem(updateItem.obj)
                                            setIndex5(false)
                                        }
                                    } 
                                    className="button-29 text-2xl font-bold  h-2rem mt-3 text-black-alpha-80 border-black-alpha-80" 
                                    role="button"
                                >
                                    {goals.objetivo5}
                                </button>

                        }
                    </div>

                    <div className="flex flex-row justify-content-center mb-3">
                        {
                            !goal6.estado
                            ?
                                <button 
                                    value={goal6} 
                                    onClick={
                                        () => {
                                            if (count < 3){
                                                let updateItem = {...goal6, estado: true}
                                                setGoal6(updateItem)
                                                setCount(count + 1)
                                                addElements(updateItem)
                                                setIndex6(true)
                                                // setList([...list, updateItem])
                                            }
                                        } 
                                    }
                                    className="button-29 text-2xl font-bold  h-2rem mt-3 text-black-alpha-80" 
                                    role="button">
                                        {goals.objetivo6}
                                </button>
                            :
                                <button 
                                        onClick={
                                            () => {
                                                let updateItem = {...goal6, estado: false}
                                                setGoal6(updateItem)
                                                setCount(count - 1)
                                                removeItem(updateItem.obj)
                                                setIndex6(false)
                                            } 
                                        }
                                        className="button-29 text-2xl font-bold h-2rem mt-3 text-black-alpha-80 border-black-alpha-80" 
                                        role="button"
                                    >
                                        {goals.objetivo6}
                                </button>
                        }
                    </div>

                    <div onClick={handleSubmit} className="flex flex-row justify-content-center mb-3">
                        {/* <Link to="/api"><button type="submit" className="button-28 text-2xl font-bold w-auto h-2rem" role="button">Siguiente</button></Link> */}
                        <button type="submit" className="button-28 text-2xl font-bold w-auto h-2rem" role="button">Siguiente</button>
                    </div>
                    
                    {/* <div className="flex flex-row justify-content-center mb-3">
                        <p>{response ? response : "Ask me anything..."}</p>
                    </div> */}
        
                </div>

                

                {index1 === true && <EvaluationObj4 list={list} setList={setList} finish={finish} setFinish={setFinish}/>}
                {index2 === true && <EvaluationObj5 list={list} setList={setList} finish={finish} setFinish={setFinish}/>}
                {index4 === true && <EvaluationObj3 list={list} setList={setList} finish={finish} setFinish={setFinish}/>}
                {index3 === true && <EvaluationObj1 list={list} setList={setList} finish={finish} setFinish={setFinish}/>}
                {index5 === true && <EvaluationObj6 list={list} setList={setList} finish={finish} setFinish={setFinish}/>}
                {index6 === true && <EvaluationObj2 list={list} setList={setList} finish={finish} setFinish={setFinish}/>}


                {/* {finish === true && <Link to="/completed"><Completed /></Link>} */}


        </>
    )
}
