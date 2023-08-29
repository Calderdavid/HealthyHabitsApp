import React, {useState} from 'react'
import { InputText } from "primereact/inputtext";

export const FormRoutine = ({list, setList}) => {

    const [name, setName] = useState('');
    const [series, setSeries] = useState(0);
    const [reps, setReps] = useState(0);
    const [cal, setCal] = useState(0);
    const [time, setTime] = useState('');
    const [peso, setPeso] = useState(0);
    

    const RoutineSubmit = (e) => {
        e.preventDefault();
        let routine = {
            "nombre": name,
            "series": series,
            "reps": reps,
            "calorias": cal,
            "peso": peso,
            "time": time,
            "estado": false
        }
        let newList = [ ...list, routine ];
        
        setList([ ...list, routine ]);
        localStorage.setItem('routineList', JSON.stringify(newList));


    }

    return (
        <>
            <form onSubmit={RoutineSubmit} className="flex flex-column justify-content-start gap-3 mx-2 my-2">
                <div className="flex flex-column gap-2">
                    <label htmlFor="nombre del ejercicio">Nombre del ejercicio</label>
                    <InputText className=" p-3 w-5" value={name} onChange={(e) => setName(e.target.value)} />
                </div>

                <div className="flex flex-column gap-2">
                    <label htmlFor="peso">Peso</label>
                    <InputText className=" p-3 w-1" value={peso} onChange={(e) => setPeso(e.target.value)} />
                </div>

                <div className="flex flex-column gap-2">
                    <label htmlFor="cantidad de series">Cantidad de series</label>
                    <InputText className=" p-3 w-1" value={series} onChange={(e) => setSeries(e.target.value)} keyfilter="int"/>
                </div>

                <div className="flex flex-column gap-2">
                    <label htmlFor="cantidad de repeticiones">Cantidad de repeticiones</label>
                    <InputText className=" p-3 w-1" value={reps} onChange={(e) => setReps(e.target.value)} keyfilter="int"/>
                </div>

                <div className="flex flex-column gap-2">
                    <label htmlFor="estimación de calorías quemadas">Estimación de calorías quemadas</label>
                    <InputText className=" p-3 w-1" value={cal} onChange={(e) => setCal(e.target.value)} keyfilter="int"/>
                </div>

                <div className="flex flex-column gap-2">
                    <label htmlFor="duración total">Duración total</label>
                    <InputText className=" p-3 w-1" value={time} onChange={(e) => setTime(e.target.value)} />
                </div>

                <button type="submit" className="button-28 text-3xl mx-auto font-bold mt-3" role="button">Añadir ejercicio</button>
            </form>
        </>
    )
}