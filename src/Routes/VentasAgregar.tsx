import axios from 'axios';
import { useState } from 'react'
import { IoBagAdd } from 'react-icons/io5';
import { useNavigate } from 'react-router-dom'

import "./TablaProductos.css"
import BtnVolver from '../Components/BtnVolver';

const VentasAgregar = () => {

  const baseURL = import.meta.env.VITE_URL_API || "http://localhost:8080";

  const [fecha, setFecha] = useState("");
  const [cliente, setCliente] = useState({id_cliente:"0"});

  const [producto, setProducto] = useState({codigo_producto:"0"});


  let navigate = useNavigate();

  function createVenta(e:any) {
      e.preventDefault();
      axios
        .post(baseURL+"/ventas/crear", {
          codigo_venta:"0",
          fecha_venta: fecha,
          total: "0",
          unCliente: cliente,
          listaProductos: data
        })
        .then((response) => {
          console.log(response.data)
          alert(response.data);

          if(!response.data.equals("La venta no se pudo crear debido a Stock insuficiente")){
            navigate("/ventas");
          }
          
        }).catch(e => {
          console.log(e);

          if(!e.message.equals("response.data.equals is not a function")){
            alert(e.message);
          }
          
        });
      
        
  }  


  type Producto = {
    codigo_producto: String;
    nombre: String;
    marca: String;
    costo: number;
    cantidad_disponible: number;
  }

  //Lista de Productos
  const [data, setData] = useState<Producto[]>([]);


  const [montoTotal, setMontoTotal] = useState(0);
   
  function addProduct(codigoProducto :any){
    
    axios
        .get(baseURL+"/productos/"+codigoProducto)
        .then((response) => {
          console.log(response.data);

          let prod = response.data;

          if (response.data){

            setMontoTotal(montoTotal + response.data.costo);
            setData([...data, prod]);
          }         

          //alert("Producto encontrado correctamente");
        }).catch(e => {
          console.log(e);
          alert(e.message);
        });
  }

  function handleDelete(index: any, costo:any){
    let dataCopy = data;
    dataCopy.splice(index,1);
    setData(dataCopy);

    setMontoTotal(montoTotal - costo);
    console.log("Borrando")
  }

  return (
    <div>
        <h1>Agregar Venta</h1>

        <BtnVolver ruta = "/ventas"/>

        <form className='form-agregar-client' onSubmit={createVenta}>
            <div className='form-agregar-field'>
                <label htmlFor="">Fecha: </label>
                <input type="text" value={fecha} placeholder='Ejm: 2024-03-15' 
                onChange={(e) => setFecha(e.target.value)}
                />
            </div>
            <div className='form-agregar-field'>
                <label htmlFor="">Id Cliente: </label>
                <input type="number" value={cliente.id_cliente} 
                onChange={(e) => setCliente({id_cliente: e.target.value})}
                />
            </div>

            <input type="submit" className="form-btn" value="Submit" />

        </form>

            <div>
                <label htmlFor="">Código de producto: </label>
                <input type="text" value={producto.codigo_producto} placeholder='' 
                onChange={(e) => setProducto({codigo_producto: e.target.value})}
                />
            </div>
            <button className='btn-agregar-producto' onClick={()=>addProduct(producto.codigo_producto)}>
                <IoBagAdd
                      size={40}
                     />
                <p>Agregar Producto</p>
                    
            </button>

            {/*Tabla de la lista de Productos de la venta*/}
            <table className="table-productos-venta" >
              <thead>

                <tr >
                  <th>Código</th>
                  <th>Nombre	</th>
                  <th>Marca	</th>
                  <th>Costo	</th>
                  <th>Borrar	</th>

                </tr>

              </thead>

              <tbody >

                {
                  (data.length!=0)?(
                  data.map((current, index)=>(

                    <tr key={index}>
                      <td>{current.codigo_producto}</td>
                      <td>{current.nombre}</td>
                      <td>{current.marca}</td>
                      <td>{current.costo}</td>
                      <td> 
                        <button className='btn-delete-row' onClick={()=>handleDelete(index,current.costo)}>
                          Eliminar
                        </button>
                        
                      </td>
                    </tr>
                    
                  ))
                ) : (null)
                }
                
                
                <tr className='row-total'>
                  <td> </td>
                  <td> </td>
                  <td>TOTAL</td>
                  <td>{montoTotal}</td>
                  <td> </td>
                </tr>
              </tbody>

            </table>
    </div>
  )
}

export default VentasAgregar

