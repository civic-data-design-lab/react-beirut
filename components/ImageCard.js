const ImageCard = ({ workshop }) => {
  console.log(workshop)
  // TODO: 1) add image card expand; 2) differentiate shops against image archives
  return (
    <>
      <div className='img-preview'>
        {workshop.shop_name ? workshop.shop_name.content_orig : 'unknown'}
      </div>
    </>
  )
}

export default ImageCard
