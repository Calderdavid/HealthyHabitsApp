import React, { useState } from 'react'
import img3 from '../assets/img88.jpg'
import { Link } from 'react-router-dom'
        


export const Section = () => {

  return (
    <>
        <div 
            className="container flex flex-row justify-content-around align-items-center gap-2"
            style={{
                boxShadow: "0 3px 10px rgb(0 0 0 / 0.2)"
            }}
        
        >

            <div className="slogan text-2xl mx-6 my-4">
                <h1>
                    Con Healthy Habits,
                    logra tus objetivos de salud y nutrición
                    de manera fácil y personalizada.

                </h1>
                
                <Link to="/evaluation"><button className="button-28 text-3xl font-bold mt-3" role="button">Empezar</button></Link>
                <span className="account flex mt-2 font-light text-base"><a href="#" style={{color:"black"}}>¿Ya conoces <b>Healthy Habits</b>?</a></span>
            </div>

            <div className="img mx-6 my-4">
                <img 
                    src={img3} 
                    style={{
                        width: "55vw", 
                        height: '80vh',
                        borderRadius: "10px",
                        boxShadow: "0 0 50px #7bed9f"
                        }}
                    ></img>
            </div>

        </div>
    
    
    </>
  )
}
