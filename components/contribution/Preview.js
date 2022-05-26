import ImageCard from '../discover/ImageCard';

const Preview = ({ formData }) => {
  return (
    <div>
      <h2>Preview</h2>
      {/* <ImageCard
        workshop={{
          ID: 'temporary',
        }}
        thumbnailSrc={formData.imageData}
      ></ImageCard> */}
      <pre id="json">
        <code>
          {JSON.stringify(
            { ...formData, imageData: formData.imageData ? 'uploaded' : null },
            null,
            4
          )}
        </code>
      </pre>
    </div>
  );
};

export default Preview;
