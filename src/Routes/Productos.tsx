import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { FaArrowLeftLong } from 'react-icons/fa6';
import { IoBagAdd } from "react-icons/io5";
import { Link } from 'react-router-dom';
import "./Productos.css"

const Productos = () => {

  const baseURL = import.meta.env.VITE_URL_API;

  const [productos, setProductos] = useState([]);
  
  const [showConfirmDialog, setShowConfirmDialog] = useState(false);
  const [selectedProductId, setSelectedProductId] = useState<string | null>(null);

  //Funcion obtener productos
  function getProducts() {
    
      let peticion =  axios.get(baseURL+"/productos").then((response) => {
          setProductos(response.data);
          console.log(response);
          //console.log("hola");
      }).catch(e => console.log(e));
  }

  useEffect(() => {  
    getProducts();
        
  },[])  

  function getProductsSinStock() {
    
    let peticion =  axios.get(baseURL+"/productos/falta_stock").then((response) => {
        setProductos(response.data);
        console.log(response);
        //console.log("hola");
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
    setSelectedProductId(id);
    setShowConfirmDialog(true);
  };

  function DeleteProduct(id:any) {
    axios
      .delete(`${baseURL}/productos/eliminar/`+id)
      .then(() => {
        alert(`Producto ${id} deleted!`);

        getProducts();
        console.log("Carga de productos")
      });
 
  } 

    //Lista de Productos
    const productList = productos.map((product: any, codigo_producto:any)=>
      <div className='card-product' key={product.codigo_producto}>
          <p className='card-product-title'>Producto N° {product.codigo_producto}</p>

          <p>Nombre: {product.nombre}</p>
          <p>Marca: {product.marca}</p>
          <p>Costo: S/. {product.costo}</p>
          <p>Cant. disp. : {product.cantidad_disponible}</p>
          
          <div className='card-product-btns'>
          
              <Link to={`/productos/editar/${product.codigo_producto}`} >
                  <button className='btn-editar'>
                      Editar
                  </button>
              </Link>


              <button className='btn-delete' onClick={()=>handleDelete(product.codigo_producto)}>
                  Eliminar
              </button> 
              
              {showConfirmDialog && (
              <ConfirmDialog
                  message={`¿Estás seguro de que deseas eliminar al producto con id: ${selectedProductId}?`}
                  id = {selectedProductId}
                  onConfirm={()=>{
                      DeleteProduct(selectedProductId);
                      setShowConfirmDialog(false);
                  }}
                  onCancel={() => setShowConfirmDialog(false)}
              />
          )}
              
          </div>
      </div>
  )


  return (
    <div className='Productos'>
        
        <h1>Productos</h1>

        <div className='btn-Volver'>
            <Link to="/" >
                <button>
                    <FaArrowLeftLong />
                    Volver
                </button>
            </Link>
        </div>

        <div className='btn-lista-productos-container'>
          {/* Mostrara productos con stock <= a 5 */}
          <button onClick={getProductsSinStock}>
            Ver lista de Productos sin Stock
          </button>

          <button onClick={getProducts}>
            Ver lista de Productos completa
          </button>
        </div> 

        <Link to="/productos/agregar">
            <button className='btn-agregar-producto'>
              <IoBagAdd
                size={40}
              />
              <p>Agregar producto</p>
                    
            </button>
        </Link>

        <div className='cards-product-container'>
            {productList}

            
        </div>

    </div>
  )
}

export default Productos