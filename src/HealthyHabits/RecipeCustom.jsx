import React, { useEffect, useState } from 'react'
import { Header } from '../components/Header';
// import { FormRoutine } from '../components/FormRoutine';
// import { Exercises } from '../components/Exercises';
// import { ExerciseCompleted } from '../components/ExerciseCompleted';



export const RecipeCustom = () => {

  const [list, setList] = useState([]);

//   const [url, setUrl] = useState("https:/www.themealdb.com/api/json/v1/1/search.php?s=Arrabiata")

//   useEffect(() => {
//     fetch(url).then(res => res.json()).then(data => {
//         console.log(data.meal)
//     })
  

//   }, [url])
  

  const [activeIndex, setActiveIndex] = useState(1);
  const items = [
      {label: 'Crea tu receta', icon: 'pi pi-fw pi-plus'},
      {label: 'Lista de recetas', icon: 'pi pi-fw pi-list'},
      {label: 'Recetas completadas', icon: 'pi pi-fw pi-check'},
  ];


  useEffect(() => {


  }, [list])
  


  return (
    <>
      <Header/>
      <h1 className="font-bold text-center">Crea tu plan de alimentación</h1>
      <div 
        className="flex flex-column justify-content-center w-7 mx-auto h-auto mb-3"
        style={{
          backgroundColor: '#ced6e0',
          boxShadow: "0 3px 10px rgb(0 0 0 / 0.2)"
        }} 
      >
        <p className=" p-3 text-base ">Agrega cada receta a tu plan de alimentación.</p>

        




      </div>
    </>
  )
}


