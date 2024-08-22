import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { FaArrowLeftLong } from 'react-icons/fa6'
import { IoBagAdd } from 'react-icons/io5'
import { Link } from 'react-router-dom'

const Ventas = () => {

  const baseURL = import.meta.env.VITE_URL_API;

  const [ventas, setVentas] = useState([]);

  const [diaBuscar, setDiaBuscar] = useState("");
  
  const [showConfirmDialog, setShowConfirmDialog] = useState(false);
  const [selectedVentaId, setSelectedVentaId] = useState<string | null>(null);

  //Funcion obtener ventas
  function getVentas() {
    
      let peticion =  axios.get(baseURL+"/ventas").then((response) => {
        setVentas(response.data);
          console.log(response);
          //console.log("hola");
      }).catch(e => console.log(e));
  }
  useEffect(() => {  
    getVentas();
        
  },[])  

  //Obtener resumen de las ventas del día
  function getResumenVentasDelDia(dia:String) {
    
    let peticion =  axios.get(baseURL+"/ventas/dia/"+dia).then((response) => {
        alert(response.data);
        console.log(response);
    }).catch(e => console.log(e));
  }


  //Logica de la ventana de confirmacio del Delete
  interface ConfirmDialogProps {
    message: string;
    id: any;
    onConfirm: () => void;
    onCancel: () => void;
  }

  const ConfirmDialog: React.FC<ConfirmDialogProps> = ({ message, onConfirm, onCancel }) => {
    return (
        <div className="confirm-dialog-backdrop">
            <div className="confirm-dialog">
                <p>{message}</p>
                <div className="confirm-dialog-buttons">
                    <button className='btn-delete btn-ConfirmDialog' onClick={onConfirm}>Aceptar</button>
                    <button className='btn-editar btn-ConfirmDialog' onClick={onCancel}>Cancelar</button>
                </div>
            </div>
        </div>
    );
  };

  const handleDelete = (id: any) => {
    setSelectedVentaId(id);
    setShowConfirmDialog(true);
  };

  function DeleteVenta(id:any) {
    axios
      .delete(`${baseURL}/ventas/eliminar/`+id)
      .then(() => {
        alert(`Venta ${id} deleted!`);

        getVentas();
        console.log("Carga de ventas")
      });
 
  } 
  
  
      //Lista de Productos
      const ventasList = ventas.map((venta: any, codigo_venta:any)=>
        <div className='card-product' key={venta.codigo_producto}>
            <p className='card-product-title'>Venta N° {venta.codigo_venta}</p>
  
            <p>Fecha: {venta.fecha_venta}</p>
            <p>Total: S/. {venta.total}</p>
            <p>Cliente: {venta.unCliente.nombre +" " + venta.unCliente.apellido}</p>
            <p>Dni del cliente : {venta.unCliente.dni}</p>
            
            <div className='card-product-btns'>
            
                {/* <Link to={`/ventas/editar/${venta.codigo_venta}`} >
                    <button className='btn-editar'>
                        Editar
                    </button>
                </Link> */}
  
  
                <button className='btn-delete' onClick={()=>handleDelete(venta.codigo_venta)}>
                    Eliminar
                </button> 
                
                {showConfirmDialog && (
                <ConfirmDialog
                    message={`¿Estás seguro de que deseas eliminar la venta con id: ${selectedVentaId}?`}
                    id = {selectedVentaId}
                    onConfirm={()=>{
                        DeleteVenta(selectedVentaId);
                        setShowConfirmDialog(false);
                    }}
                    onCancel={() => setShowConfirmDialog(false)}
                />
            )}
                
            </div>
        </div>
      )

return(
    <div className='Productos'>
        
        <h1>Ventas</h1>

        <div className='btn-Volver'>
            <Link to="/" >
                <button>
                    <FaArrowLeftLong />
                    Volver
                </button>
            </Link>
        </div>

        <div>
          <label htmlFor="">Buscar por día: </label>
          <input type="text" onChange={(e) => setDiaBuscar(e.target.value)} />
          <button onClick={()=>{getResumenVentasDelDia(diaBuscar)}}>
            Obtener Resumen
          </button>
        </div>

        <div className='btn-lista-productos-container'>

          <button onClick={getVentas}>
            Ver lista de Productos completa
          </button>
        </div>

        <Link to="/ventas/agregar">
            <button className='btn-agregar-producto'>
                <IoBagAdd
                   size={40}
                />
                <p>Agregar venta</p>
                    
            </button>
        </Link>
        
        <div className='cards-product-container'>
            {ventasList}

        </div>

    </div>
  )
}

export default Ventas