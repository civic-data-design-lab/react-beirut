import React from 'react';
import Card from '../Card';
import Workshop from '../Workshop';
import Archive from '../Archive';
import { useMediaQuery } from 'react-responsive';

const Desktop = ({ children }) => {
  const isDesktop = useMediaQuery({ minWidth: 992 })
  return isDesktop ? children : null
}
const Tablet = ({ children }) => {
  const isTablet = useMediaQuery({ minWidth: 651, maxWidth: 991 })
  return isTablet ? children : null
}
const Mobile = ({ children }) => {
  const isMobile = useMediaQuery({ maxWidth: 650 })
  return isMobile ? children : null
}
const Default = ({ children }) => {
  const isNotMobile = useMediaQuery({ minWidth: 768 })
  return isNotMobile ? children : null
}


export default class ImageCard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      mainSliderStyle: {
        sliderContainer: 'mapSlider-container',
        buttonLabel: 'slider-btn-label',
        prevButton: 'btn-prev',
        nextButton: 'btn-next',
        wrapperContainer: 'mapSlider-wrapper',
      },
    };
  }


  componentDidMount() {
      console.log('lang in imagecard is ', this.props.lang)
      console.log('mounting');
      document.body.style.overflow = "hidden"; // ADD THIS LINE
      document.body.style.height = "100%"; // ADD THIS LINE
      document.body.style.position='fixed';
  }



    componentWillUnmount() {
      console.log('unmounting');
      document.body.style.overflow = "auto"; // ADD THIS LINE
        document.body.style.height = "auto"; // ADD THIS LINE
         document.body.style.position='static';
  }

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
          className="mapCard-img"
          key={image.src}
          style={{
            width: '100%',
            height: '100%',
            marginRight: '10px',
            objectFit: 'cover',
            scrollSnapAlign: 'center',
          }}
          src={image.src}
          alt=""
        />
      );
    });
  }


  render() {
    const { object, onClose, type, imageMetas, similarWorkshops } = this.props;

    return (
        <>

        <Desktop>
          <Card handleClose={onClose}>

          {type === 'workshop' ? (
            <div className="fixed object-card slide-up">
            <Workshop
              workshop={object}
              imageMetas={imageMetas}
              // imageSrc={null}
              similarWorkshops={similarWorkshops}
              handleClose={onClose}
              includeSuggestion={true}
              lang={this.props.lang}
              i18n={this.props.i18n}
            />
              </div>

          ) : (
              <div className="fixed object-card">

            <Archive
              archive={object}
              imageMetas={imageMetas}
              // imageSrc={thumbnailSrc}
              similarArchives={similarWorkshops}
              handleClose={onClose}
              i18n={this.props.i18n}
            />
              </div>

          )}

      </Card>
          </Desktop>

          <Tablet>
          <Card handleClose={onClose}>

          {type === 'workshop' ? (
            <div className="fixed object-card slide-up">
            <Workshop
              workshop={object}
              imageMetas={imageMetas}
              // imageSrc={null}
              similarWorkshops={similarWorkshops}
              handleClose={onClose}
              includeSuggestion={true}
              lang={this.props.lang}
              i18n={this.props.i18n}
            />
              </div>

          ) : (
              <div className="fixed object-card slide-up">

            <Archive
              archive={object}
              imageMetas={imageMetas}
              // imageSrc={thumbnailSrc}
              similarArchives={similarWorkshops}
              handleClose={onClose}
              i18n={this.props.i18n}
            />
              </div>

          )}

      </Card>
          </Tablet>

      <Mobile>

        <div className="card ">
                          <div className="card__cover">
                            <div className="card__wrapper">
        {type === 'workshop' ? (
            <div className="fixed object-card slide-up">
            <Workshop
              workshop={object}
              imageMetas={imageMetas}
              // imageSrc={null}
              similarWorkshops={similarWorkshops}
              handleClose={onClose}
              includeSuggestion={true}
              lang={this.props.lang}
              i18n={this.props.i18n}
            />
              </div>

          ) : (
              <div className="fixed object-card ">

            <Archive
              archive={object}
              imageMetas={imageMetas}
              // imageSrc={thumbnailSrc}
              similarArchives={similarWorkshops}
              handleClose={onClose}
              i18n={this.props.i18n}
            />
              </div>

          )}
                            </div>
                          </div>
        </div>

      </Mobile>


      </>


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
