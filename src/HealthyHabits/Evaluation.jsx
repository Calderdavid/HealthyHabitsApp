import React, {useState, useEffect} from 'react'
import { Navbar } from '../components/Navbar'
import { Link } from 'react-router-dom'
import axios from 'axios';
import healthyApi from '../api/healthyApi';
import { useAuthStore } from '../hooks/useAuthStore';
import { useSelector } from 'react-redux';

const goals = {
    objetivo1: "Perder peso",
    objetivo2: "Mejorar mi forma física",
    objetivo3: "Ganar masa muscular",
    objetivo4: "Mejorar mi alimentación",
    objetivo5: "Ganar peso",
    objetivo6: "Ser más productivo"
}

export const Evaluation = () => {
    
    const [list, setList] = useState([])
    
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

    const [count, setCount] = useState(0);


    useEffect(() => {

        let filteredList = list.filter(item => item.estado === true );
        
        setList(filteredList)    
      
    }, [goal1, goal2, goal3, goal4, goal5, goal6])
    
    
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

    // console.log(list)

    //request openai api
    const [prompt, setPrompt] = useState("Que es Youtube en español");
    const [response, setResponse] = useState("");

    // const { user } = useAuthStore();
    const { user } = useSelector(state => state.auth)

    console.log(user)

    // const requestUser = async(_id) => {

    //     await healthyApi.get(`/usuarios?${_id}`, { id })
    //         .then((res) => {
    //             console.log(res.data)
    //         })
    //         .catch((err) => {
    //             console.log(err)
    //         })
    // }

    // requestUser(user.uid)

    const customMessage = `
        Soy ${user.genero}, nací el ${user.fecha_nacimiento}. 
        Actualmente peso ${user.peso} kg y mido ${user.altura} cm.
        Que me recomiendas si tengo como objetivo
    `

    console.log(customMessage)

    const handleSubmit = async(e) => {
        e.preventDefault();

        await healthyApi.post('/chat', { prompt })
            .then((res) => {
                setResponse(res.data);
            })
            .catch((error) => {
                console.log(error);
            });
    }




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
                                                setPrompt("Que es Youtube?")
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
                    
                    <div className="flex flex-row justify-content-center mb-3">
                        <p>{response ? response : "Ask me anything..."}</p>
                    </div>
        
                </div>


        </>
    )
}
