import React, {useState} from 'react'
import { InputText } from "primereact/inputtext";
import Swal from 'sweetalert2/dist/sweetalert2.js'

export const FormRoutine = ({list, setList}) => {

    const [name, setName] = useState('');
    const [series, setSeries] = useState();
    const [reps, setReps] = useState();
    const [cal, setCal] = useState();
    const [time, setTime] = useState('');
    const [peso, setPeso] = useState();
    

    const RoutineSubmit = (e) => {
        e.preventDefault();

        Swal.fire(
            'Excelente!',
            'Ya hemos añadido tu rutina a la lista!',
            'success'
          )

        let routine = {
            "nombre": name,
            "series": series,
            "reps": reps,
            "peso": peso,
            "time": time,
            "estado": false
        }
        let newList = [ ...list, routine ];
        
        setList([ ...list, routine ]);
        localStorage.setItem('routineList', JSON.stringify(newList));

        setName("")
        setSeries("")
        setReps("")
        setTime("")
        setPeso("")
    }

    return (
        <>
            <form onSubmit={RoutineSubmit} className="flex flex-column justify-content-start gap-3 mx-2 my-2">
                <div className="flex flex-column gap-2">
                    <label htmlFor="nombre del ejercicio">Nombre del ejercicio</label>
                    <InputText placeholder="Ingresa el nombre del ejercicio" className=" p-3 w-5" value={name} onChange={(e) => setName(e.target.value)} />
                </div>

                <div className="flex flex-column gap-2">
                    <label htmlFor="peso">Peso</label>
                    <InputText placeholder="0 Kg" className=" p-3 w-1" value={peso} onChange={(e) => setPeso(e.target.value)} keyfilter="int"/>
                </div>

                <div className="flex flex-column gap-2">
                    <label htmlFor="cantidad de series">Cantidad de series</label>
                    <InputText placeholder="0 series" className=" p-3 w-1" value={series} onChange={(e) => setSeries(e.target.value)} keyfilter="int"/>
                </div>

                <div className="flex flex-column gap-2">
                    <label htmlFor="cantidad de repeticiones">Cantidad de repeticiones</label>
                    <InputText placeholder="0 reps" className=" p-3 w-1" value={reps} onChange={(e) => setReps(e.target.value)} keyfilter="int"/>
                </div>

                {/* <div className="flex flex-column gap-2">
                    <label htmlFor="estimación de calorías quemadas">Estimación de calorías quemadas</label>
                    <InputText className=" p-3 w-1" value={cal} onChange={(e) => setCal(e.target.value)} keyfilter="int"/>
                </div> */}

                <div className="flex flex-column gap-2">
                    <label htmlFor="duración total">Duración total</label>
                    <InputText placeholder="0 minutos" className=" p-3 w-1" value={time} onChange={(e) => setTime(e.target.value)} />
                </div>

                <button type="submit" className="button-28 text-3xl mx-auto font-bold mt-3" role="button">Añadir ejercicio</button>
            </form>
        </>
    )
}