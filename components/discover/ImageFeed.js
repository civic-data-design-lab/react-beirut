import ImagePreview from './ImagePreview';

const ImageFeed = ({ objects }) => {
  //TODO: Adjust css to fit the width of the page
  return (
    <div className="container">
      <div className="image-feed">
        {objects?.map(
          (object) =>
            object.thumb_img_id && (
              <div className="image-container" key={object.ID}>
                <ImagePreview workshop={object}></ImagePreview>
              </div>
            )
        )}
      </div>
    </div>
  );
};

export default ImageFeed;
