
import { Link } from 'react-router-dom'

const BtnVolver = (ruta : any) => {
  return (
    <div>
        <Link to={ruta} >
            <button>
                Volver
            </button>
        </Link>
    </div>
  )
}

export default BtnVolver