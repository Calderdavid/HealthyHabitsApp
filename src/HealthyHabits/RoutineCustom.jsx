import React, { useEffect, useState, useSyncExternalStore } from 'react'
import { Header } from '../components/Header';
import { InputText } from "primereact/inputtext";
import { TabMenu } from 'primereact/tabmenu';
import { Button } from 'primereact/button';
import { FormRoutine } from '../components/FormRoutine';
import { Exercises } from '../components/Exercises';
import { ExerciseCompleted } from '../components/ExerciseCompleted';



export const RoutineCustom = () => {

  const [list, setList] = useState([]);

  const [value, setValue] = useState('');

  const [activeIndex, setActiveIndex] = useState(1);
  const items = [
      {label: 'Crea tu rutina', icon: 'pi pi-fw pi-plus'},
      {label: 'Lista de ejercicios', icon: 'pi pi-fw pi-list'},
      {label: 'Ejercicios completados', icon: 'pi pi-fw pi-check'},
  ];


  useEffect(() => {


  }, [list])
  


  return (
    <>
      <Header/>
      <h1 className="font-bold text-center">Crea tu plan de entrenamiento</h1>
      <div 
        className="flex flex-column justify-content-center w-7 mx-auto h-auto mb-3"
        style={{
          backgroundColor: '#ced6e0',
          boxShadow: "0 3px 10px rgb(0 0 0 / 0.2)"
        }} 
      >
        <p className=" p-3 text-base ">Agrega cada ejercicio del plan de entrenamiento.</p>

        <div className="card p-2">
            <TabMenu model={items} activeIndex={activeIndex} onTabChange={(e) => setActiveIndex(e.index)} />
        </div>

        {activeIndex === 0 && <FormRoutine list={list} setList={setList}/>}
        {activeIndex === 1 && <Exercises list={list} setList={setList}/>}
        {activeIndex === 2 && <ExerciseCompleted list={list} setList={setList}/>}




      </div>
    </>
  )
}
