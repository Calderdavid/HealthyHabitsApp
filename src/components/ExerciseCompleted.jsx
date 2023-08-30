import React, { useEffect } from 'react'
import { Card } from 'primereact/card';
import { Button } from 'primereact/button';


export const ExerciseCompleted = ({list, setList}) => {
    
    const newList = JSON.parse(localStorage.getItem('routineList')) //Lo convierte en objeto

    const filteredList = newList.filter(item => item.estado !== false)

    useEffect(() => {
      
    }, [filteredList])

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
                !filteredList 
                ?
                    <p>Vacío</p>
                :
                filteredList.map((item, index) => (
                    <Card 
                        key={index} title={item.nombre} subTitle="Subtitle" 
                        footer={footer(index)} header={header} className="md:w-25rem"
                        // onClick={() => handleCancelClick(index)}
                    >
                        <span className="m-0">
                            {`${item.series} series / ${item.reps} repeticiones`}
                        </span>
                    </Card>
                ))
            }

        </div>
    )
}
