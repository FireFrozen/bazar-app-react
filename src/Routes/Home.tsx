
import "./Home.css"
import { Link } from 'react-router-dom'

export const Home = () => {
  return (
    <div className='home-container'>
        <h1>Sistema de ventas del bazar</h1>
        <div className='btn-panel'>

            <Link to="/clientes">
                <button className='btn-home'> 
                    Gestionar Clientes
                </button>
            </Link>

            <Link to="/productos">
                <button className='btn-home'> 
                    Gestionar Productos
                </button>
            </Link>

            <Link to="/ventas">
                <button className='btn-home'> 
                    Gestionar Ventas
                </button>
            </Link>

        </div>
        
    </div>
  )
}
