import ImageCard from './ImageCard';
import ImagePreview from './ImagePreview';

const ImageFeed = ({ workshops }) => {
  //TODO: Adjust css to fit the width of the page
  return (
    <div className="container">
      <div className="image-feed">
        {workshops.slice(0, 10).map((workshop) => (
          <ImagePreview key={workshop.ID} workshop={workshop}></ImagePreview>
          // <ImageCard
          //   key={workshop.ID}
          //   workshop={workshop}
          //   isExpanded={workshop.ID === selectedCard}
          //   onClose={onCloseCard}
          //   onExpand={onExpandCard}
          // />
        ))}
      </div>
    </div>
  );
};

export default ImageFeed;
