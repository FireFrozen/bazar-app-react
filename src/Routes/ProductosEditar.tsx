import axios from 'axios';
import { useEffect, useState } from 'react'
import { FaArrowLeftLong } from 'react-icons/fa6'
import { Link, useNavigate, useParams } from 'react-router-dom'

const ProductosEditar = () => {
    const baseURL = import.meta.env.VITE_URL_API;

    const {id} = useParams<{ id: string }>();


    const [name, setName] = useState("");
    const [marca, setMarca] = useState("");
    const [costo, setCosto] = useState("");
    const [cantDispon, setCantDispon] = useState("");

    useEffect(() => {
        axios.get(`${baseURL}/productos/${id}`).then((response) => {
            
            setName(response.data.nombre);
            setMarca(response.data.marca);
            setCosto(response.data.costo);
            setCantDispon(response.data.cantidad_disponible);
        });
    }, [id]);



    let navigate = useNavigate();

    function EditProduct(e:any) {
        e.preventDefault();
        axios
          .put(`${baseURL}/productos/editar/${id}`, {
            //codigo_producto: id,
            nombre: name,
            marca: marca,
            costo: costo,
            cantidad_disponible: cantDispon
          })
          .then((response) => {
            console.log(response.data)
            alert("Producto editado correctamente");

            navigate("/productos");
            
          })
          .catch((error) => {
            console.error("Hubo un error al producto: ", error);
            alert("Hubo un error al editar el producto.");
          });     
        
    }


  return (
    <div>
        <h1>Agregar Producto</h1>

        <div className='btn-Volver'>
            <Link to="/productos" >               
                <button>
                    <FaArrowLeftLong />
                    Volver
                </button>
            </Link>
        </div>

        <form className='form-agregar' onSubmit={EditProduct}>
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

export default ProductosEditar