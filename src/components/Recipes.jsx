import React, {useState, useEffect} from 'react'
import { Card } from 'primereact/card';
import { Button } from 'primereact/button';
import { useAuthStore } from '../hooks/useAuthStore';


export const Recipes = ({list, setList}) => {

    const [ items, setItems ] = useState(list)

    const { user } = useAuthStore()

    const newList = JSON.parse(localStorage.getItem('recipeList'))

    useEffect(() => {
        const storedItems = JSON.parse(localStorage.getItem('recipeList'));
        if (storedItems) {
            setItems(storedItems);
            setList(storedItems);
        }
    }, []);

    const messageToPrompt = `Soy ${user.genero}, nací el ${user.fecha_nacimiento}. 
    Actualmente peso ${user.peso} kg y mido ${user.altura} cm.`

    const message = `Devuelveme unicamente un objeto JSON con valores apriximados
    calculando la cantidad de  calorias, grasas totales, carbohidratos totales y proteinas 
    de la siguiente receta "2 raciones de pasta con carne"`

    const prompt = [{
        "role": "user",
        "content": message,   //texto de la evaluacion completa
        // "content": "Define que es Youtube en 3 lineas",   //Texto de prueba
    }]

    const updateLocalStorage = (updatedItems) => {
        localStorage.setItem('recipeList', JSON.stringify(updatedItems));
    }

    const AskToApi = async() => {

        await healthyApi.post('/chat', {prompt})
        .then((res) => {
            // let newText = res.data.replace(/-/g, '\n\n');
            // setResponse(newText);
            // setGeneratePDF(true);
            // console.log(newText)
            console.log(res.data)
        })
        .catch((error) => {
            console.log(error);
        });

    }

    const handleSaveClick = (index) => {
        const updateItems = [...items];

        updateItems[index].estado = true;
        setItems(updateItems)
        updateLocalStorage(updateItems);

        AskToApi()
    }

    const handleCancelClick = (index) => {

        const updateItems = [...items];
        updateItems.splice(index, 1);
        setItems(updateItems);

        updateLocalStorage(updateItems);


    };

    const header = (
        <img alt="Card" src="https://primefaces.org/cdn/primereact/images/usercard.png" />
    );

    const footer = (index) => (
        <div className="flex flex-wrap justify-content-end gap-2">
            <Button 
                label="Save" 
                icon="pi pi-check" 
                onClick={() => handleSaveClick(index)}
            />
            <Button 
                label="Cancel" 
                icon="pi pi-times" 
                className="p-button-outlined p-button-secondary" 
                onClick={() => handleCancelClick(index)}
            />
        </div>
    );

    return (
        <div className="card flex flex-wrap gap-6 p-2">
        {
            !newList 
            ?
                <p>Vacío</p>
            :
            newList.map((item, index) => (
                <Card 
                    key={index} title={item.nombre} 
                    footer={footer(index)} header={header} className="md:w-25rem"
                    // onClick={() => handleCancelClick(index)}
                >
                    <span className="m-0">
                        {`${item.raciones} raciones o porciones`}
                    </span>

                    <h3 className="mt-2">Ingredientes</h3>
                    <ul>
                        {
                            item.ingredientes.map(( i, index) => (
                                <li key={index}>- {i.ingredient}</li>
                            ))
                        }
                    </ul>
                </Card>
            ))
        }

        </div>
    )
}

