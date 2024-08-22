import axios from 'axios';
import { useEffect, useState } from 'react'
import "./Clientes.css"
import { Link } from 'react-router-dom';
import { FaArrowLeftLong } from 'react-icons/fa6';
import { MdPersonAddAlt1 } from "react-icons/md";
import "./ConfirmDialog.css"
import "./FormularioAgregar.css"


const Clientes = () => {
    const baseURL = import.meta.env.VITE_URL_API;

    const [clientes, setClientes] = useState([]);
    
    const [showConfirmDialog, setShowConfirmDialog] = useState(false);
    const [selectedClientId, setSelectedClientId] = useState<string | null>(null);

    //Funcion obtener clientes
    function getClients() {
        axios.get(baseURL+"/clientes").then((response) => {
            setClientes(response.data);
            console.log(response);
            console.log("hola");
        }).catch(e => console.log(e));
    }

    useEffect(() => {  
        getClients();
          
    },[])


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
        setSelectedClientId(id);
        setShowConfirmDialog(true);
    };
   
    function deleteClient(id:any) {
        axios
          .delete(`${baseURL}/clientes/eliminar/`+id)
          .then(() => {
            alert(`Client ${id} deleted!`);

            getClients();
            console.log("Carga de Clientes")
          });
     
    }

    //Lista de clientes
    const clientList = clientes.map((client: any, id_cliente: any)=>
        <div className='card-client' key={client.id_cliente}>
            <p className='card-client-title'>Cliente N° {client.id_cliente}</p>

            <p>Nombre: {client.nombre}</p>
            <p>Apellido: {client.apellido}</p>
            <p>DNI: {client.dni}</p>
            <div className='card-client-btns'>
            
                <Link to={`/clientes/editar/${client.id_cliente}`} >
                    <button className='btn-editar'>
                        Editar
                    </button>
                </Link>


                <button className='btn-delete' onClick={()=>handleDelete(client.id_cliente)}>
                    Eliminar
                </button>
                
                {showConfirmDialog && (
                <ConfirmDialog
                    message={`¿Estás seguro de que deseas eliminar al cliente con id: ${selectedClientId}?`}
                    id = {selectedClientId}
                    onConfirm={()=>{
                        deleteClient(selectedClientId);
                        setShowConfirmDialog(false);
                    }}
                    onCancel={() => setShowConfirmDialog(false)}
                />
            )}
                
            </div>
        </div>
    )


  return (
    <div className='Clientes'>
        
        <h1>Clientes</h1>

        <div className='btn-Volver'>
            <Link to="/" >
                <button>
                    <FaArrowLeftLong />
                    Volver
                </button>
            </Link>
        </div>
        
        <Link to="/clientes/agregar">
                <button className='btn-agregar'>
                    <MdPersonAddAlt1 />
                    <p>Agregar cliente</p>
                    
                </button>
        </Link>
            
    

        <div className='cards-client-container'>
            {clientList}
            
        </div>



    </div>
  )
}

export default Clientes