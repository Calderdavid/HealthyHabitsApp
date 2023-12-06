import React, { useEffect, useState } from 'react'
import { Card } from 'primereact/card';
import { Button } from 'primereact/button';
import { Chart } from 'primereact/chart';
import healthyApi from '../api/healthyApi';



export const ExerciseCompleted = ({list, setList}) => {

    const newList = JSON.parse(localStorage.getItem('routineList')) //Lo convierte en objeto

    const filteredList = newList ? newList.filter(item => item.estado !== false) : [];

    const [chartData, setChartData] = useState({});
    const [chartOptions, setChartOptions] = useState({});
    const [response, setResponse] = useState();

    //Peso * n° repeticiones * n° series
    const [volumenTotal, setVolumenTotal] = useState();
    const [durationTotal, setDurationTotal] = useState();

    useEffect(() => {

        if (response) {
            console.log(response, volumenTotal, durationTotal);
            const documentStyle = getComputedStyle(document.documentElement);
            const textColor = documentStyle.getPropertyValue('--text-color');
            const surfaceBorder = documentStyle.getPropertyValue('--surface-border');
            const data = {
                datasets: [
                    {
                        data: [response, volumenTotal, durationTotal],
                        backgroundColor: [
                            documentStyle.getPropertyValue('--red-500'),
                            documentStyle.getPropertyValue('--green-500'),
                            documentStyle.getPropertyValue('--yellow-500'),
                            documentStyle.getPropertyValue('--bluegray-500'),
                            documentStyle.getPropertyValue('--blue-500')
                        ],
                        label: 'Mis datos'
                    }
                ],
                labels: ['Estim. Calorías', 'Volumen total', 'Duración']
            };
            const options = {
                plugins: {
                    legend: {
                        labels: {
                            color: textColor
                        }
                    }
                },
                scales: {
                    r: {
                        grid: {
                            color: surfaceBorder
                        }
                    }
                }
            };

            setChartData(data);
            setChartOptions(options);
        }

    }, [response, volumenTotal, durationTotal])

    const getData = (text) => {

        try {
            const jsonStart = text.indexOf('{');
            const jsonEnd = text.indexOf('}');
            const jsonString = text.substring(jsonStart, jsonEnd + 1);

            //Parsea el objeto JSON
            const caloriesValues = JSON.parse(jsonString);

            //Filtra las propiedades deseadas
            const {
                calorias_totales_quemadas
            } = caloriesValues;

            return {
                calorias_totales_quemadas
            }
        } catch (error) {
            console.error("Error al analizar el texto", error);
            return null;
        }
    }

    const AskToApi = async(item) => {

        const example = {
            "calorias_totales_quemadas": "200",
        }

        let exampleString = JSON.stringify(example)

        const message = "Devuelveme unicamente y siempre un objeto JSON de 1 atributo" +
        ` como este ${exampleString} calculando una aproximación de calorias_totales_quemadas`+
        ` en el siguiente ejercicio "${item.nombre} con ${item.peso} kilos` +
        ` en ${item.series} series y ${item.reps} repeticiones cada una`

        
        const prompt = [{
            "role": "user",
            "content": message,   //texto de la evaluacion completa
            // "content": "Define que es Youtube en 3 lineas",   //Texto de prueba
        }]

        console.log(message)
        
        await healthyApi.post('/chat', {prompt})
        .then((res) => {
            
            const volumen_total = parseInt(parseInt(item.peso) * parseInt(item.reps) * parseInt(item.series))
            setVolumenTotal(volumen_total)
            
            const time = item.time
            setDurationTotal(time)

            console.log(res.data)

            let {calorias_totales_quemadas} = res.data;
            setResponse(calorias_totales_quemadas)
            // const test = getData(res.data);
            // setResponse(test)
        })
        .catch((error) => {
            console.log(error);
        });
    }

    const handleSaveClick = (index, item) => {
        // AskToApi(item)
    }


    const header = (
        <img alt="Card" src="https://primefaces.org/cdn/primereact/images/usercard.png" />
    );

    const footer = (index, item) => (
        <div className="flex flex-wrap justify-content-end gap-2">
            {/* <Button
                label="Save"
                icon="pi pi-check"
                onClick={() => handleSaveClick(index, item)}
            /> */}
            {/* <Button
                label="Cancel"
                icon="pi pi-times"
                className="p-button-outlined p-button-secondary"
                onClick={() => handleCancelClick(index)}
            /> */}
        </div>
    );

    return (
        <div className="card flex flex-wrap gap-6 p-2">
            {
                !filteredList
                ?
                    <p>Vacío</p>
                :
                filteredList.map((item, index) => (
                    <Card
                        key={index} title={item.nombre}
                        footer={footer(index, item)} header={header} className="md:w-25rem"
                        // onClick={() => handleCancelClick(index)}
                    >
                        <h3>Cantidad de series y repeticiones</h3>
                        <span className="m-0">
                            {`${item.series} series / ${item.reps} repeticiones`}
                        </span>

                        <h3 className="mt-2">Peso</h3>
                        <span>
                            {`Peso por repetición: ${item.peso} Kg`}
                        </span>
                        {/* <div className="card flex justify-content-center">
                            <Chart type="polarArea" data={chartData} options={chartOptions} style={{ position: 'relative', width: '80%' }} />
                        </div> */}
                    </Card>
                ))
            }

        </div>
    )
}
