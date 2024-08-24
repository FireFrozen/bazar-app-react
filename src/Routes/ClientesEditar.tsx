import axios from 'axios';
import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import "./Clientes.css"
import BtnVolver from '../Components/BtnVolver';

const ClientesEditar = () => {
    const baseURL = import.meta.env.VITE_URL_API || "http://localhost:8080";

    const {id} = useParams<{ id: string }>();



    const [name, setName] = useState("");
    const [apellido, setApellido] = useState("");
    const [DNI, setDNI] = useState("");

    useEffect(() => {
        axios.get(`${baseURL}/clientes/${id}`).then((response) => {
 
            setName(response.data.nombre);
            setApellido(response.data.apellido);
            setDNI(response.data.dni);
        });
    }, [id]);



    let navigate = useNavigate();

    function editClient(e:any) {
        e.preventDefault();
        axios
          .put(`${baseURL}/clientes/editar/${id}`, {
            //id_client: Number(id),
            nombre: name,
            apellido: apellido,
            dni:DNI,
          })
          .then((response) => {
            console.log(response.data)
            alert("Cliente editado correctamente");

            navigate("/clientes");
            
          })
          .catch((error) => {
            console.error("Hubo un error al editar el cliente:", error);
            alert("Hubo un error al editar el cliente.");
          });
        
        
        
    }

  return (
    <div>
        <h1>Editar Cliente</h1>

        <BtnVolver ruta = "/clientes"/>

        <form className='form-agregar-client' onSubmit={editClient}>
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

export default ClientesEditar