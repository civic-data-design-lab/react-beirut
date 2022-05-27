import ImagePreview from './ImagePreview';

const ImageFeed = ({ workshops }) => {
  //TODO: Adjust css to fit the width of the page
  return (
    <div className="container">
      <div className="image-feed">
        {workshops.map(
          (workshop) =>
            workshop.thumb_img_id && (
              <div className="image-container" key={workshop.ID}>
                <ImagePreview workshop={workshop}></ImagePreview>
              </div>
            )
        )}
      </div>
    </div>
  );
};

export default ImageFeed;
