const ImageCard = ({ workshop }) => {
  console.log(workshop)
  return (
    <>
      <div className='img-preview'>
        {workshop.shop_name ? workshop.shop_name.content_orig : 'unknown'}
      </div>
    </>
  )
}

export default ImageCard
