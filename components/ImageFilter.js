import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChevronDown } from '@fortawesome/free-solid-svg-icons'

const ImageFilter = () => {
  //TODO: filter expand
  return (
    <>
      <div>
        Filter By <FontAwesomeIcon icon={faChevronDown} className='fa-x' />
      </div>
    </>
  )
}

export default ImageFilter
