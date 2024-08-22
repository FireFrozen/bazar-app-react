import { useState } from 'react'
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route, useParams } from "react-router-dom";
import './App.css'
import { Home } from './Routes/Home';
import Clientes from './Routes/Clientes';
import NotFoundPage from './Routes/NotFoundPage';
import Productos from './Routes/Productos';
import Ventas from './Routes/Ventas';
import ProductosAgregar from './Routes/ProductosAgregar';
import ClientesAgregar from './Routes/ClientesAgregar';
import ClientesEditar from './Routes/ClientesEditar';
import ProductosEditar from './Routes/ProductosEditar';
import VentasAgregar from './Routes/VentasAgregar';
import VentasEditar from './Routes/VentasEditar';


function App() {
  
  const params = useParams();

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />}/>
          
        <Route path="/clientes" element={<Clientes />} />
        <Route path="/clientes/agregar" element={<ClientesAgregar />} />
        <Route path="/clientes/editar/:id" element={<ClientesEditar />} />
        <Route path="/productos" element={<Productos />} />
        <Route path="/productos/agregar" element={<ProductosAgregar />} />
        <Route path="/productos/editar/:id" element={<ProductosEditar />} />
        <Route path="/ventas" element={<Ventas />} />
        <Route path="/ventas/agregar" element={<VentasAgregar />} />
        <Route path="/ventas/editar/:id" element={<VentasEditar />} />
        <Route path="*" element={<NotFoundPage />} />

      </Routes>
      
    </BrowserRouter>
  )
}

export default App
