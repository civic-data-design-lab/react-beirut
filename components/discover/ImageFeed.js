import ImageCard from './ImageCard';

const ImageFeed = ({ workshops, selectedCard, onCloseCard, onExpandCard }) => {
  //TODO: Adjust css to fit the width of the page
  return (
    <div className="container">
      <div className="image-feed">
        {workshops.slice(0, 10).map((workshop) => (
          <ImageCard
            key={workshop.ID}
            workshop={workshop}
            isExpanded={workshop.ID === selectedCard}
            onClose={onCloseCard}
            onExpand={onExpandCard}
          />
        ))}
        {/* {workshops.map((workshop) => (
          <ImageCard key={workshop.ID} workshop={workshop} />
        ))} */}
      </div>
    </div>
  );
};

export default ImageFeed;
