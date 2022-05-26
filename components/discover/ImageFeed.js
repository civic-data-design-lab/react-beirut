import ImageCard from './ImageCard';

const ImageFeed = ({ workshops }) => {
  //TODO: Adjust css to fit the width of the page
  return (
    <div className="container">
      <div className="image-feed">
        {workshops.map((workshop) => (
          <div className="image-container" key={workshop.ID}>
            <ImageCard workshop={workshop} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default ImageFeed;
