import { useState } from 'react';

const ImageUploadForm = ({ onUpdate, formData }) => {
  const [image, setImage] = useState(formData.imageData);

  const handleUploadImage = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.onload = (e) => {
      const imageBuffer = e.target.result;
      setImage(imageBuffer);
      onUpdate({ imageData: imageBuffer });
    };
    reader.readAsDataURL(file);
  };

  return (
    <form action="">
      <h3>Image Upload</h3>
      <input
        type="file"
        name="image-upload"
        id="image-upload"
        accept="image/*"
        onChange={handleUploadImage}
      />
      {(image || formData.imageData) && <img src={image || formData.imageData} alt="Uploaded image" />}

      <label htmlFor="">
        Enter a caption or a story associated with this image.
      </label>
      <textarea
        name="caption"
        id="caption"
        value={formData.caption || ''}
        onChange={(e) => onUpdate({ caption: e.target.value })}
      />
    </form>
  );
};

export default ImageUploadForm;
