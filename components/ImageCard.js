import { useState } from 'react'

const ImageCard = ({ workshop }) => {
  /* 
    TODO: 1) add image card expand; 
    TODO: 2) differentiate shops against image archives; 
    TODO: 3) catch missing data 
  */
  const [isExpand, setIsExpand] = useState(false)

  const handleClick = () => {
    setIsExpand(true)
  }

  return (
    <>
      <div className='img-preview' onClick={handleClick}>
        <img src={`/api/images/${workshop.thumb_img_id}.jpg`} alt='' />
        {/* {workshop.shop_name ? workshop.shop_name.content_orig : 'unknown'} */}
      </div>
      {isExpand && (
        <div className='card'>
          <div className='card__cover'>
            <div className='card__wrapper'>
              <div className='card__content'></div>
            </div>
          </div>
        </div>
      )}
    </>
  )
}

export default ImageCard
