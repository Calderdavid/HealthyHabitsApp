import React, {useState, useEffect} from 'react'
import { InputText } from "primereact/inputtext";
import { Button } from 'primereact/button';
import { MealItem } from './MealItem';





export const RecipeApi = () => {

    const [name, setName] = useState("")
    const [meal, setMeal] = useState()

    const searchMeal = (e) => {
        
        if (e.key === "Enter") {
            fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${name}`)
                .then(res => res.json())
                .then(data => {
                    // console.log(data)
                    setMeal(data.meals)
                })
        }

    }


    return (
        <div className="card flex flex-column flex-wrap justify-content-center gap-3">
            <div className="p-input-icon-left flex flex-row mx-auto">
                <i className="pi pi-search my-auto" />
                <InputText placeholder="Ingresa una receta" onKeyDown={searchMeal} value={name} onChange={(e) => setName(e.target.value)}/>
            </div>

            <div className="meals">
                {
                    (meal == null) 
                    ? 
                        <p>No se encontró la receta</p> 
                    :
                    meal.map((res) => {
                        return(
                            <MealItem data={res}/>
                        )
                    })
                }
            </div>
        </div>
    )
}
