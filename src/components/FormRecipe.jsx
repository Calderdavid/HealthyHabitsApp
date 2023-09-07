import React, { useState, useEffect } from 'react'
import { InputText } from "primereact/inputtext";
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Button } from 'primereact/button';


export const FormRecipe = ({list, setList}) => {

  const [name, setName] = useState('');
  const [porcion, setPorcion] = useState(0);

  const [ingredient, setIngredient] = useState("");
  const [listIngredients, setListIngredients] = useState([]); 
  

  const RecipeSubmit = (e) => {

    // console.log('AAA')
      e.preventDefault();

      let recipe = {
          "nombre": name,
          "raciones": porcion,
          "ingredientes": listIngredients,
          "estado": false
      }
      let newList = [ ...list, recipe ];
      
      setList([ ...list, recipe ]);
      localStorage.setItem('recipeList', JSON.stringify(newList));

  }

  const handleKeyDown = (e) => {
    let  newIngredient = {
      ingredient: e.target.value
    };
    if (e.key === 'Enter'){
      setListIngredients([...listIngredients, newIngredient])      
    }
  }

  const handleChange = (newIngredient) => {
    setIngredient(newIngredient);
  }

  const clearTable = () => {
    setListIngredients([]);
  }

  const header = (
    <div className="flex align-items-center justify-content-end gap-2">
        <Button onClick={clearTable} className="gap-2" type="button" icon="pi pi-trash">Limpiar tabla</Button>
    </div>
);


  return (
    <>
      <form onSubmit={RecipeSubmit} className="flex flex-column justify-content-start gap-3 mx-2 my-2">
          <div className="flex flex-column gap-2">
              <label htmlFor="nombre del ejercicio">Nombre de la receta</label>
              <InputText className=" p-3 w-5" value={name} onChange={(e) => setName(e.target.value)} />
          </div>

          <div className="flex flex-column gap-2">
              <label htmlFor="peso">Raciones</label>
              <InputText className=" p-3 w-1" value={porcion} onChange={(e) => setPorcion(e.target.value)} />
          </div>

          <div className="flex flex-column gap-2">
              <label htmlFor="nombre del ejercicio">Ingredientes</label>
              <InputText className=" p-3 w-5" value={ingredient} onKeyDown={handleKeyDown} onChange={(e) => handleChange(e.target.value)} />
          </div>

          {
            !listIngredients 
            ? 
              <span className="text-xs">No has añadido ningún ingrediente todavía</span>
            :
              <DataTable className="w-6" value={listIngredients} header={header} tableStyle={{ minWidth: '50rem' }}>
                <Column field="ingredient" header="Ingredientes"></Column>
              </DataTable>
          }    
              
          <button onClick={RecipeSubmit} type="button" className="button-28 text-3xl mx-auto font-bold mt-3" role="button">Añadir receta</button>
      </form>
    </>
  )
}