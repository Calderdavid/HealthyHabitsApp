import React from 'react'
import img66 from '../assets/img66.jpg'
import { Navbar } from '../components/Navbar'

export const Results = ({data}) => {
  return (
    <>
        <h1 className="font-bold text-center">Resultados de tu evaluación</h1>
        <p>Usuario: *user*</p>
        <img src="img66"></img>
        <p>{data ? data : "..."}</p>
    </>
  )
}
