import axios from 'axios';
import { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import "./FormularioAgregar.css"
import BtnVolver from '../Components/BtnVolver';

const ProductosAgregar = () => {

  const baseURL = import.meta.env.VITE_URL_API || "http://localhost:8080";

  const [name, setName] = useState("");
  const [marca, setMarca] = useState("");
  const [costo, setCosto] = useState("");
  const [cantDispon, setCantDispon] = useState("");

  let navigate = useNavigate();

  function createClient(e:any) {
      e.preventDefault();
      axios
        .post(baseURL+"/productos/crear", {
          codigo_producto:"0",
          nombre: name,
          marca: marca,
          costo: costo,
          cantidad_disponible:cantDispon
        })
        .then((response) => {
          console.log(response.data)
          alert("Producto creado correctamente");

          navigate("/productos");
        });
      
        
  }  




  return (
    <div>
        <h1>Agregar Producto</h1>

        <BtnVolver ruta = "/productos"/>

        <form className='form-agregar' onSubmit={createClient}>
            <div className='form-agregar-field'>
                <label htmlFor="">Nombre: </label>
                <input type="text" value={name} 
                onChange={(e) => setName(e.target.value)}
                />
            </div>
            <div className='form-agregar-field'>
                <label htmlFor="">Marca: </label>
                <input type="text" value={marca} 
                onChange={(e) => setMarca(e.target.value)}
                />
            </div>
            <div className='form-agregar-field'>
                <label htmlFor="">Costo: </label>
                <input type="number" value={costo} 
                onChange={(e) => setCosto(e.target.value)}
                />
            </div>
            <div className='form-agregar-field'>
                <label htmlFor="">Cant. Disponible: </label>
                <input type="number" value={cantDispon} 
                onChange={(e) => setCantDispon(e.target.value)}
                />
            </div>

            <input type="submit" className="form-btn" value="Submit" />


        </form>

    </div>
  )
}

export default ProductosAgregar

