import React from 'react';
import Card from '../Card';
import ImagePreview from './ImagePreview';
import Slider from '../../components/Slider';
import { data } from 'autoprefixer';

export default class ImageCard extends React.Component {
  constructor(props) {
    super(props);
  } //   const imgSrc = workshop.thumb_img_id
  //     ? `/api/images/${workshop.thumb_img_id}.jpg`
  //     : thumbnailSrc || null;

  // TODO: Need to fix slider styling
  showImages() {
    const imageMeta = this.props.imageMeta;
    const workshop = this.props.workshop;
    const thumbImage = imageMeta.filter(
      (image) => image.img_id === workshop.thumb_img_id
    );
    const remainingImages = imageMeta.filter(
      (image) => image.img_id !== workshop.thumb_img_id
    );
    const images = [...thumbImage, ...remainingImages];
    return images.map((image) => {
      return (
        <img
          // className="img__detail"
          style={{
            width: '100%',
            height: '100%',
            marginRight: '10px',
            objectFit: 'cover',
          }}
          src={image.src}
          alt=""
        />
      );
    });
  }

  render() {
    return (
      <Card handleClose={this.props.onClose}>
        <div className="card__content">
          <div className="card__item">
            <div className="container__preview-content">
              <Slider>{this.showImages()}</Slider>
            </div>
          </div>
          <div className="card__item">
            <div className="container__preview-content">
              <div className="container__text">
                <div className="container__title">
                  <h1>
                    {this.props.workshop.shop_name.content ||
                      this.props.workshop.shop_name.content_orig}
                  </h1>
                  <p className="type">
                    {this.props.workshop.craft_discipline_category.join(' | ')}
                  </p>
                </div>
                <p>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc
                  et velit interdum, ac aliquet odio mattis. Class aptent taciti
                  sociosqu ad lr adipiscing elit. Nunc et velit interdum, ac
                  aliquet odio mattis. Class aptent taciti sociosqu ad ...{' '}
                  <b>Read More</b>
                </p>
              </div>
              <div className="container__map">
                <p>See it on map</p>
                <div className="map"></div>
              </div>
              <div className="container__suggestion">
                <p>Explore similar shops</p>
                <div className="parent">
                  <Slider>
                    {this.props.similarWorkshops?.map((shop) => (
                      <div key={shop.ID} className="container__img">
                        <ImagePreview workshop={shop} />
                      </div>
                    ))}
                  </Slider>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Card>
    );
  }
}

// const ImageCard = ({ workshop, onClose, thumbnailSrc }) => {
//   const imgSrc = workshop.thumb_img_id
//     ? `/api/images/${workshop.thumb_img_id}.jpg`
//     : thumbnailSrc || null;

//   // TODO: dynamically fetching suggestion shops
//   // let suggetion = () => {
//   //   return <></>;
//   // };

//   return (
//     <Card handleClose={onClose}>
//       <div className="card__content">
//         <div className="card__item">
//           <div className="container__preview-content">
//             <img className="img__detail" src={imgSrc} alt="" />
//           </div>
//         </div>
//         <div className="card__item">
//           <div className="container__preview-content">
//             <div className="container__text">
//               <div className="container__title">
//                 <h1>
//                   {workshop.shop_name.content ||
//                     workshop.shop_name.content_orig}
//                 </h1>
//                 <p className="type">
//                   {workshop.craft_discipline_category.join(' | ')}
//                 </p>
//               </div>
//               <p>
//                 Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc et
//                 velit interdum, ac aliquet odio mattis. Class aptent taciti
//                 sociosqu ad lr adipiscing elit. Nunc et velit interdum, ac
//                 aliquet odio mattis. Class aptent taciti sociosqu ad ...{' '}
//                 <b>Read More</b>
//               </p>
//             </div>
//             <div className="container__map">
//               <p>See it on map</p>
//               <div className="map"></div>
//             </div>
//             <div className="container__suggestion">
//               <p>Explore similar shops</p>
//               <div className="parent">
//                 <Slider>
//                   <div className="container__img">
//                     <ImagePreview workshop={workshop} />
//                   </div>
//                   <div className="container__img">
//                     <ImagePreview workshop={workshop} />
//                   </div>
//                   <div className="container__img">
//                     <ImagePreview workshop={workshop} />
//                   </div>
//                   <div className="container__img">
//                     <ImagePreview workshop={workshop} />
//                   </div>
//                   <div className="container__img">
//                     <ImagePreview workshop={workshop} />
//                   </div>
//                   <div className="container__img">
//                     <ImagePreview workshop={workshop} />
//                   </div>
//                 </Slider>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </Card>
//   );
// };

// export default ImageCard;
