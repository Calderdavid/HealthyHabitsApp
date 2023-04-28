import React, {useState} from 'react'
import { Navbar } from '../components/Navbar'


const goals = {
    objetivo1: "Perder peso",
    objetivo2: "Mejorar mi forma física",
    objetivo3: "Ganar masa muscular",
    objetivo4: "Mejorar mi alimentación",
    objetivo5: "Ganar peso",
    objetivo6: "Ser más productivo"
}

export const Evaluation = () => {

    const [goal1, setGoal1] = useState(false);
    const [goal2, setGoal2] = useState(false);
    const [goal3, setGoal3] = useState(false);
    const [goal4, setGoal4] = useState(false);
    const [goal5, setGoal5] = useState(false);
    const [goal6, setGoal6] = useState(false);

    const [count, setCount] = useState(0);



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
                            !goal1
                            ?
                                <button 
                                    value={goal1} 
                                    onClick={
                                        () => {
                                            if (count < 3){
                                                setGoal1(true)
                                                setCount(count + 1)
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
                                                setGoal1(false)
                                                setCount(count - 1)
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
                            !goal2
                            ?
                                <button 
                                    value={goal2} 
                                    onClick={
                                        () => {
                                            if (count < 3){
                                                setGoal2(true)
                                                setCount(count + 1)
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
                                                setGoal2(false)
                                                setCount(count - 1)
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
                            !goal3
                            ?
                                <button 
                                    value={goal3} 
                                    onClick={
                                        () => {
                                            if (count < 3){
                                                setGoal3(true)
                                                setCount(count + 1)
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
                                                setGoal3(false)
                                                setCount(count - 1)
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
                            !goal4
                            ?
                                <button 
                                    value={goal4} 
                                    onClick={
                                        () => {
                                            if (count < 3){
                                                setGoal4(true)
                                                setCount(count + 1)
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
                                                setGoal4(false)
                                                setCount(count - 1)
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
                            !goal5
                            ?
                                <button 
                                    value={goal5} 
                                    onClick={
                                        () => {
                                            if (count < 3){
                                                setGoal5(true)
                                                setCount(count + 1)
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
                                            setGoal5(false)
                                            setCount(count - 1)
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
                            !goal6
                            ?
                                <button 
                                    value={goal6} 
                                    onClick={
                                        () => {
                                            if (count <= 3){
                                                setGoal6(true)
                                                setCount(count + 1)
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
                                                setGoal6(false)
                                                setCount(count - 1)
                                            } 
                                        }
                                        className="button-29 text-2xl font-bold h-2rem mt-3 text-black-alpha-80 border-black-alpha-80" 
                                        role="button"
                                    >
                                        {goals.objetivo6}
                                </button>
                        }
                    </div>

                    <div className="flex flex-row justify-content-center mb-3">
                        <button className="button-28 text-2xl font-bold  h-2rem" role="button">Siguiente</button>
                    </div>
        
        
                </div>


        </>
    )
}
