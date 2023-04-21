import React from 'react'

export const Navbar = () => {
  return (
    <>
        
        <div 
            className="container flex justify-content-between"
            style={{
            backgroundColor: '#FFFFFF',
            boxShadow: "0 10px 6px -6px #777"
            }}
        >

            <h4 
            className="ml-6 font-bold text-6xl cursor-pointer" 
            style={{
                color:'#2ECC71',
            }}
            >
                Healthy Habits 🧠
            </h4>
        </div>        
    
    </>
  )
}
