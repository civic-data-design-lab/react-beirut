import ImageCard from '../discover/ImageCard';

const Preview = ({ formData }) => {
  return (
    <div>
      <ImageCard
        workshop={{
          ID: 'temporary',
        }}
        thumbnailSrc={formData.imageData}
      ></ImageCard>
    </div>
  );
};

export default Preview;
