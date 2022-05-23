import ImageCard from './ImageCard'

const ImageFeed = (workshops) => {
  console.log(workshops)
  return (
    <div className='image-feed'>
      {workshops.map((workshop) => (
        <ImageCard workshop={workshop} />
      ))}
    </div>
  )
}

export default ImageFeed
