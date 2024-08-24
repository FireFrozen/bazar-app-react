
import { FaArrowLeftLong } from 'react-icons/fa6'
import { Link } from 'react-router-dom'

const BtnVolver = (props : any) => {
  return (
    <div className='btn-Volver'>
        <Link to={props.ruta} >
            <button>
                <FaArrowLeftLong />
                Volver
            </button>
        </Link>
    </div>
  )
}

export default BtnVolver