import SingleImageUpload from '../components/contribution/general/imageUpload/SingleImageUpload';
import { useState } from 'react';
// import imagemin from 'imagemin';
// const imagemin = require('imagemin');
// const sharp = require('sharp');

const test = () => {
  const [image, setImage] = useState(null);

  return (
    <>
      <div className="container">
        <div className="container__landing">
          <div className="container__title">
            <div className="title">
              Intangible <br /> Heritage Atlas - Crafts
            </div>
            <div>The craft heritage of Beirut.</div>
          </div>
        </div>
        <div className="container-text">
          <div style={{ height: '200px', width: '200px' }}>
            <SingleImageUpload
              handleUpdateImage={(imageBuffer, extension) => {
                setImage(imageBuffer);
                // debugger
              }}
              currentImage={image}
            />
          </div>
          {image ? <img src={image} alt="Uploaded image" /> : <></>}
        </div>
      </div>
    </>
  );
};

export default test;

// var newImg = new Image();
// var height, width;

// newImg.onload = function() {
//   height = newImg.height;
//   width = newImg.width;

// };

// newImg.src = 'http://x0.org.ua/test/p/29/1.jpg';

// function getImageSizeInBytes(imgURL) {
// var request = new XMLHttpRequest();
// request.open("HEAD", imgURL, false);
// request.send(null);
// var headerText = request.getAllResponseHeaders();
// var re = /Content\-Length\s*:\s*(\d+)/i;
// re.exec(headerText);
// return parseInt(RegExp.$1);
// }

//  var height = newImg.height;
//   var width = newImg.width;

// var size_image = getImageSizeInBytes('http://x0.org.ua/test/p/29/1.jpg');

// size_image = size_image / 1000;
