import { useState } from 'react'
import "./Clientes.css"
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import BtnVolver from '../Components/BtnVolver';

const ClientesAgregar = () => {
    const baseURL = import.meta.env.VITE_URL_API || "http://localhost:8080";

    const [name, setName] = useState("");
    const [apellido, setApellido] = useState("");
    const [DNI, setDNI] = useState("");

    let navigate = useNavigate();

    function createClient(e:any) {
        e.preventDefault();
        axios
          .post(baseURL+"/clientes/crear", {
            id_client:"0",
            nombre: name,
            apellido: apellido,
            dni:DNI,
          })
          .then((response) => {
            console.log(response.data)
            alert("Cliente creado correctamente");

            navigate("/clientes");
          });
        
          
    }

  return (
    <div>
        <h1>Agregar Cliente</h1>

        <BtnVolver ruta = "/clientes"/>

        <form className='form-agregar-client' onSubmit={createClient}>
            <div className='form-agregar-field'>
                <label htmlFor="">Nombre: </label>
                <input type="text" value={name} 
                onChange={(e) => setName(e.target.value)}
                />
            </div>
            <div className='form-agregar-field'>
                <label htmlFor="">Apellido: </label>
                <input type="text" value={apellido} 
                onChange={(e) => setApellido(e.target.value)}
                />
            </div>
            <div className='form-agregar-field'>
                <label htmlFor="">DNI: </label>
                <input type="text" value={DNI} 
                onChange={(e) => setDNI(e.target.value)}
                />
            </div>

            <input type="submit" className="form-btn" value="Submit" />


        </form>

    </div>
  )
}

export default ClientesAgregar