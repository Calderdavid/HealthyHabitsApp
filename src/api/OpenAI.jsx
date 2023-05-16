import React, { useState } from "react";
import { Navbar } from "../components/Navbar";

export const OpenAI = () => {
  return (
    <>
      <Navbar />

      <h1 className="font-bold text-center">
        Basado en tus objetivos seleccionados:
      </h1>

      <div
        className="flex flex-column justify-content-center w-4 mx-auto h-auto mb-3"
        style={{
          backgroundColor: "#ced6e0",
          boxShadow: "0 3px 10px rgb(0 0 0 / 0.2)",
        }}
      ></div>
    </>
  );
};
