import ImageCard from './ImageCard'

const ImageFeed = ({ workshops }) => {
  //TODO: Adjust css to fit the width of the page
  return (
    <div className='image-feed'>
      {workshops.map((workshop) => (
        <ImageCard key={workshop.ID} workshop={workshop} />
      ))}
    </div>
  )
}

export default ImageFeed
