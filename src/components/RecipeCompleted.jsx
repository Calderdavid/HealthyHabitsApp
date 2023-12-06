import React, {useState, useEffect } from 'react'
import { Card } from 'primereact/card';
import { Button } from 'primereact/button';
import { useAuthStore } from '../hooks/useAuthStore';
import healthyApi from '../api/healthyApi';
import { Chart } from 'primereact/chart';



export const RecipeCompleted = () => {

    const [chartData, setChartData] = useState({});
    const [chartOptions, setChartOptions] = useState({});

    const [response, setResponse] = useState();

    const newList = JSON.parse(localStorage.getItem('recipeList')) //Lo convierte en objeto

    const filteredList = newList ? newList.filter(item => item.estado !== false) : [];

    const { user } = useAuthStore()

    const [grasas_totales, setGrasas_totales] = useState("");
    const [carbohidratos_totales, setCarbohidratos_totales] = useState("");
    const [proteinas, setProteinas] = useState("");

    

    // const {grasas_totales, carbohidratos_totales, proteinas, calorias_totales } = JSON.parse(localStorage.getItem('nutritionData'));

    useEffect(() => {

        if (response) {


            const documentStyle = getComputedStyle(document.documentElement);
    
            const {grasas_totales, carbohidratos_totales, proteinas, calorias_totales } = JSON.parse(localStorage.getItem('nutritionData'));
            const data = {
                labels: ['Grasas totales (g)','Carbohidratos totales (g)','Proteínas (g)'],
                datasets: [
                    {
                        //[grasas_totales, carbohidratos_totales, proteinas, calorias_totales]
                        // data: [response.grasas_totales, response.carbohidratos_totales, response.proteinas],
                        data: [grasas_totales, carbohidratos_totales, proteinas],
                        backgroundColor: [
                            documentStyle.getPropertyValue('--blue-500'), 
                            documentStyle.getPropertyValue('--yellow-500'), 
                            documentStyle.getPropertyValue('--green-500')
                        ],
                        hoverBackgroundColor: [
                            documentStyle.getPropertyValue('--blue-400'), 
                            documentStyle.getPropertyValue('--yellow-400'), 
                            documentStyle.getPropertyValue('--green-400')
                        ]
                    }
                ]
            }
            const options = {
                plugins: {
                    legend: {
                        labels: {
                            usePointStyle: true
                        }
                    }
                }
            };
    
            setChartData(data);
            setChartOptions(options);
        }
    }, [response])

    const messageToPrompt = `Soy ${user.genero}, nací el ${user.fecha_nacimiento}. 
    Actualmente peso ${user.peso} kg y mido ${user.altura} cm.`



    const getData = (text) => {

        try {
            const jsonStart = text.indexOf('{');
            const jsonEnd = text.indexOf('}');
            const jsonString = text.substring(jsonStart, jsonEnd + 1);

            //Parsea el objeto JSON
            const nutritionValues = JSON.parse(jsonString);

            //Filtra las propiedades deseadas
            const {
                grasas_totales,
                carbohidratos_totales,
                proteinas,
                calorias_totales
            } = nutritionValues;

            return {
                grasas_totales,
                carbohidratos_totales,
                proteinas,
                calorias_totales
            }
        } catch (error) {
            console.error("Error al analizar el texto", error);
            return null;
        }
    }

    const AskToApi = async(item) => {

        const listIngredients = JSON.stringify(item.ingredientes)

        const example = {
            "grasas_totales": "200",
            "carbohidratos_totales": "200",
            "proteinas": "200"
        }

        let exampleString = JSON.stringify(example)

        const message = `Devuelveme unicamente y siempre un objeto JSON de 4 atributos como este ${exampleString}` +
        "calculando la cantidad de grasas_totales, carbohidratos_totales, proteinas" +
        "y el total de calorias de la siguiente receta" +
        `${item.raciones} racion de los siguientes ingredientes` +
        `${listIngredients} de la receta que tiene el siguiente nombre "${item.nombre}"`
    
        const prompt = [{
            "role": "user",
            "content": message,   //texto de la evaluacion completa
            // "content": "Define que es Youtube en 3 lineas",   //Texto de prueba
        }]

        await healthyApi.post('/chat', {prompt})
        .then((res) => {
            // console.log(res.data)
            const test = getData(res.data);
            // console.log(test)
            setResponse(test)
            console.log(test)
            localStorage.setItem('nutritionData', JSON.stringify(test));
        })
        .catch((error) => {
            console.log(error);
        });

    }

    const handleSaveClick = (index, item) => {
        // const updateItems = [...items];

        // updateItems[index].estado = true;
        // setItems(updateItems)
        // updateLocalStorage(updateItems);

        AskToApi(item)
    }

    // const handleCancelClick = (index) => {

    //     const updateItems = [...items];
    //     updateItems.splice(index, 1);
    //     setItems(updateItems);

    //     updateLocalStorage(updateItems);


    // };

    const header = (
        <img alt="Card" src="https://primefaces.org/cdn/primereact/images/usercard.png" />
    );

    const footer = (index, item) => (
        <div className="flex flex-wrap justify-content-end gap-2">
            <Button 
                label="Calcular datos nutricionales" 
                icon="pi pi-check" 
                onClick={() => handleSaveClick(index, item)}
            />
            {/* <Button 
                label="Cancel" 
                icon="pi pi-times" 
                className="p-button-outlined p-button-secondary" 
                onClick={() => handleCancelClick(index)}
            /> */}
        </div>
    );


    return (
        <div className="card flex flex-wrap gap-6 p-2 my-auto">
            {
                !filteredList 
                ?
                    <p>Vacío</p>
                :
                filteredList.map((item, index) => (
                    <Card 
                        key={index} title={item.nombre} 
                        footer={footer(index, item)} header={header} className="gap-2 md:w-25rem"
                        // onClick={() => handleCancelClick(index)}
                    >
                        <span className="m-0">
                            {`Cantidad de raciones: ${item.raciones}`}
                        </span>

                        <h3 className="mt-2">Ingredientes</h3>
                        <ul>
                            {
                                item.ingredientes.map(( i, index) => (
                                    <li key={index}>- {i.quantity} de {i.ingredient}</li>
                                ))
                            }
                        </ul>
                        <h3 className="mt-2">Valores nutricionales de tu receta</h3>
                        <p>
                            {/* {
                                response ? (
                                    `Calorías totales: ${response.calorias_totales}`
                                )
                                :
                                '...'
                            } */}

                        </p>
                    </Card>
                ))
            }
            <div className="card flex flex-column mt-2">
                <p className="mx-auto">
                    {/* {
                        `Calorías totales: ${calorias_totales}`
                    } */}
                </p>
                <Chart type="pie" data={chartData} options={chartOptions} className=" md:w-30rem" />
            </div>
            
        </div>
    )
}