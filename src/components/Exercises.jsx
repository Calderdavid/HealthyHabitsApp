import React, {useState, useEffect} from 'react'
import { Card } from 'primereact/card';
import { Button } from 'primereact/button';

export const Exercises = ({list, setList}) => {

    const [ items, setItems ] = useState(list)
    
    
    const newList = JSON.parse(localStorage.getItem('routineList')) //Lo convierte en objeto

    useEffect(() => {
        const storedItems = JSON.parse(localStorage.getItem('routineList'));
        if (storedItems) {
            setItems(storedItems);
            setList(storedItems);
        }
    }, []);

    const updateLocalStorage = (updatedItems) => {
        setList(updatedItems);
        localStorage.setItem('routineList', JSON.stringify(updatedItems));
    }

    const handleSaveClick = (index) => {
        const updateItems = [...items];

        updateItems[index].estado = true;
        setItems(updateItems)
        updateLocalStorage(updateItems);
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

    
    console.log(newList)
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
                            {`${item.series} series / ${item.reps} repeticiones`}
                        </span>
                    </Card>
                ))
            }

        </div>
    )
}

