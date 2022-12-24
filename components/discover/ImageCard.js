import React from 'react';
import Card from '../Card';
import Workshop from '../Workshop';
import Archive from '../Archive';
import { useMediaQuery } from 'react-responsive';

const Desktop = ({ children }) => {
  const isDesktop = useMediaQuery({ minWidth: 992 });
  return isDesktop ? children : null;
};
const Tablet = ({ children }) => {
  const isTablet = useMediaQuery({ minWidth: 651, maxWidth: 991 });
  return isTablet ? children : null;
};
const Mobile = ({ children }) => {
  const isMobile = useMediaQuery({ maxWidth: 650 });
  return isMobile ? children : null;
};
const Default = ({ children }) => {
  const isNotMobile = useMediaQuery({ minWidth: 768 });
  return isNotMobile ? children : null;
};

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
    document.body.style.overflow = 'hidden';
    document.body.style.height = '100%';
    document.body.style.position = 'fixed';
  }

  componentWillUnmount() {
    document.body.style.overflow = 'auto';
    document.body.style.height = 'auto';
    document.body.style.position = 'static';
  }

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
          <Card handleClose={this.props.onClose}>
            {type === 'workshop' ? (
              <div className="fixed object-card slide-up">
                <Workshop
                  workshop={this.props.object}
                  imageMetas={this.props.imageMetas}
                  similarWorkshops={this.props.similarWorkshops}
                  handleClose={this.props.onClose}
                  includeSuggestion={true}
                  lang={this.props.lang}
                  i18n={this.props.i18n}
                />
              </div>
            ) : (
              <div className="fixed object-card">
                <Archive
                  archive={this.props.object}
                  imageMetas={this.props.imageMetas}
                  similarArchives={this.props.similarWorkshops}
                  handleClose={this.props.onClose}
                  i18n={this.props.i18n}
                />
              </div>
            )}
          </Card>
        </Desktop>

        <Tablet>
          <Card handleClose={this.props.onClose}>
            {type === 'workshop' ? (
              <div className="fixed object-card slide-up">
                <Workshop
                  workshop={this.props.object}
                  imageMetas={this.props.imageMetas}
                  similarWorkshops={this.props.similarWorkshops}
                  handleClose={this.props.onClose}
                  includeSuggestion={true}
                  lang={this.props.lang}
                  i18n={this.props.i18n}
                />
              </div>
            ) : (
              <div className="fixed object-card slide-up">
                <Archive
                  archive={this.props.object}
                  imageMetas={this.props.imageMetas}
                  similarArchives={this.props.similarWorkshops}
                  handleClose={this.props.onClose}
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
                      workshop={this.props.object}
                      imageMetas={this.props.imageMetas}
                      similarWorkshops={this.props.similarWorkshops}
                      handleClose={this.props.onClose}
                      includeSuggestion={true}
                      lang={this.props.lang}
                      i18n={this.props.i18n}
                    />
                  </div>
                ) : (
                  <div className="fixed object-card ">
                    <Archive
                      archive={this.props.object}
                      imageMetas={this.props.imageMetas}
                      similarArchives={this.props.similarWorkshops}
                      handleClose={this.props.onClose}
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
