import React, {useState, useEffect} from 'react'
import { Card } from 'primereact/card';
import { Button } from 'primereact/button';

export const MealItem = ({data}) => {

    const header = (
        <img alt="Card" src={data.strMealThumb} />
    );

    return (
        <div className="card flex flex-wrap gap-6 p-2 justify-content-center">
            <Card 
                title={data.strMeal} subTitle={data.strArea} 
                header={header} className="md:w-25rem"
                // onClick={() => handleCancelClick(index)}
            >
                <span className="m-0">
                    <h3>Ingredientes</h3>
                    <ul>
                        <li>- {data.strIngredient1}</li>
                        <li>- {data.strIngredient2}</li>
                        <li>- {data.strIngredient3}</li>
                        <li>- {data.strIngredient4}</li>
                        <li>- {data.strIngredient5}</li>
                        <li>- {data.strIngredient6}</li>
                        <li>- {data.strIngredient7}</li>
                        <li>- {data.strIngredient8}</li>
                        <li>- {data.strIngredient9}</li>
                        <li>- {data.strIngredient10}</li>
                        <li>- {data.strIngredient11}</li>
                    </ul>
                </span>

                <span className="m-0">
                    <h3>Fuente</h3>
                    <p>Link {data.strSource}</p>
                </span>

                <span className="m-0">
                    <h3>Video de Youtube</h3>
                    <p>Link {data.strYoutube}</p>
                </span>
                    
            </Card>
        </div>
    )
}