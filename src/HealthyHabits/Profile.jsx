import React, {useState, useEffect} from 'react'
import { useAuthStore } from '../hooks/useAuthStore';
import { Navbar } from '../components/Navbar';
import { Header } from '../components/Header';
import { InputText } from 'primereact/inputtext';
import { Chart } from 'primereact/chart';


export const Profile = () => {

    const { user } = useAuthStore();

    console.log(user)

    const getEdad = (dateString) => {
        let hoy = new Date()
        let fechaNacimiento = new Date(dateString)
        let edad = hoy.getFullYear() - fechaNacimiento.getFullYear()
        let diferenciaMeses = hoy.getMonth() - fechaNacimiento.getMonth()
        if (
          diferenciaMeses < 0 ||
          (diferenciaMeses === 0 && hoy.getDate() < fechaNacimiento.getDate())
        ) {
          edad--
        }
        return edad
    }

    const edad = parseInt(getEdad(user.fecha_nacimiento))

    const [chartData, setChartData] = useState({});
    const [chartOptions, setChartOptions] = useState({});

    const [grass, setGrass] = useState(0);
    const [muscle, setMuscle] = useState(0);

    const stats = () => {
        const documentStyle = getComputedStyle(document.documentElement);
        const data = {
            labels: ['Peso', '% Grasa', '% masa muscular'],
            datasets: [
                {
                    data: [parseInt(user.peso), grass , muscle],
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
        };
        const options = {
            cutout: '60%'
        };

        setChartData(data);
        setChartOptions(options);
    }

    useEffect(() => {
        stats()
    }, [grass, muscle]);


    return (
        <>
            <Header />
            <h1 className="font-bold text-start ml-6">Información personal</h1>

            <div 
                className="flex flex-row mx-auto w-11 h-auto py-6 px-8 mb-3 justify-content-between"
            
                style={{
                        backgroundColor: '#ced6e0',
                        boxShadow: "0 3px 10px rgb(0 0 0 / 0.2)"
                }} 
            >
                <div className="flex flex-column">
                    <label htmlFor="username">Nombre completo</label>
                    <InputText id="username" aria-describedby="username-help" value={user.nombre + user.apellido}/>

                    <label htmlFor="email">Correo electrónico</label>
                    <InputText id="email" aria-describedby="username-help" value={user.correo}/>

                    <label htmlFor="age">Edad</label>
                    <InputText id="age" aria-describedby="username-help" value={user.fecha_nacimiento[0] + user.fecha_nacimiento[1] + " años"}/>

                    <label htmlFor="gender">Género</label>
                    <InputText id="gender" aria-describedby="username-help" value={user.genero}/>

                    <label htmlFor="high">Altura</label>
                    <InputText id="high" aria-describedby="username-help" value={user.altura + " cm"}/>

                    <label htmlFor="weight">Peso</label>
                    <InputText id="weight" aria-describedby="username-help" value={user.peso + " kg"}/>
                    
                    <label htmlFor="grass">% Grasa</label>
                    <InputText id="grass" aria-describedby="username-help" onChange={(e) => setGrass(e.target.value)}/>

                    <label htmlFor="muscle">% masa muscular</label>
                    <InputText id="muslce" aria-describedby="username-help" onChange={(e) => setMuscle(e.target.value)}/>
                </div>

                <div className="card flex-column">
                    <h2 className="text-center">Estadísticas</h2>
                    <Chart type="doughnut" data={chartData} options={chartOptions} className="md:w-30rem" />
                </div>

            </div>


        
        </>
    )
}
