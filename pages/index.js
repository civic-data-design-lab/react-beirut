import dynamic from 'next/dynamic';
// import { ScrollContainer, ScrollPage, batch, Fade, FadeIn, FadeOut, Move, MoveIn, MoveOut, Sticky, StickyIn, StickyOut, Zoom, ZoomIn, ZoomOut } from "react-scroll-motion";
import ImageFilter from 'react-image-filter';
import {
  MapIcon,
  DocumentSearchIcon,
  CloudUploadIcon,
  DatabaseIcon,
  GlobeIcon,
} from '@heroicons/react/outline';
import { useTranslation } from 'next-i18next';
const Animator = dynamic(
  import('react-scroll-motion').then((it) => it.Animator),
  { ssr: false }
);

const duotoneCraft = {
  architectural: { one: [57, 73, 130], two: [236, 223, 190] },
  cuisine: { one: [115, 51, 11], two: [242, 218, 144] },
  decorative: { one: [72, 111, 78], two: [229, 206, 195] },
  fashion: { one: [179, 103, 79], two: [169, 200, 231] },
  functional: { one: [11, 96, 115], two: [229, 200, 171] },
  furniture: { one: [105, 70, 70], two: [212, 234, 217] },
  textiles: { one: [115, 92, 22], two: [200, 219, 225] },
  default: { one: [71, 30, 16], two: [234, 216, 211] },
};

const Index = ({ i18n }) => {
  const { t } = useTranslation();

  return (
    <>
      <div className="index-gradient">
        <div className="container">
          <div className="container__landing">
            {/* <div className="container__title">
            <div className="title">
              Living Heritage <br/>Atlas&ensp;|&ensp;Beirut
            </div>
            <div>The craft heritage of Beirut.</div>
          </div>

          <div className="container-text">
            <p className="bold">Who are we?</p>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam eu
              turpis molestie, dictum est a, mattis tellus. Sed dignissim, metus
              nec fringilla accumsan, risus sem sollicitudin lacus, ut interdum
              tellus elit sed risus.
            </p>
            <p>
              Class aptent taciti sociosqu ad litora torquent per conubia nostra,
              per inceptos himenaeos. Praesent auctor purus luctus enim egestas,
              ac scelerisque ante pulvinar. Donec ut rhoncus ex. Suspendisse ac
              rhoncus nisl, eu tempor urna. Curabitur vel bibendum lorem. Morbi
              convallis convallis diam sit amet lacinia. Aliquam in elementum
              tellus.
            </p>
          </div> */}
            {/* <ScrollContainer>
            <ScrollPage page={0}>
              <Animator animation={batch(Sticky(), Zoom(2,1), Fade(0,1))}> */}
            <div className="container-sm vh-100 mt-5 p-4 pt-5">
              <div style={{ height: '90%' }}>
                <div className="d-inline-block col-3 col-sm-2 col-md-0 col-lg-0 m-1 m-md-0"></div>
                <ImageFilter
                  className="d-inline-block align-bottom col-2 col-md-1 m-1 m-sm-2 collage"
                  filter={'duotone'}
                  image={'./landing/138936839_4.jpg'}
                  svgProps={{
                    'aria-label': 'Craft workshop in architectural industry',
                  }}
                  colorOne={duotoneCraft.default.one}
                  colorTwo={duotoneCraft.default.two}
                />
                <ImageFilter
                  className="d-inline-block align-bottom col-3 col-md-2 m-1 m-sm-2 collage"
                  filter={'duotone'}
                  image={'./landing/138954053_1.jpg'}
                  svgProps={{
                    'aria-label': 'Craft workshop in fashion industry',
                  }}
                  colorOne={duotoneCraft.default.one}
                  colorTwo={duotoneCraft.default.two}
                />
                <div className="d-inline-block col-2 col-md-0"></div>
                <ImageFilter
                  className="d-inline-block align-middle align-sm-middle col-3 col-sm-2 m-1 m-sm-2 collage"
                  filter={'duotone'}
                  image={'./landing/145875023_1.jpg'}
                  svgProps={{
                    'aria-label':
                      'Archival image of furniture crafts on public steps',
                  }}
                  colorOne={duotoneCraft.default.one}
                  colorTwo={duotoneCraft.default.two}
                />
                <ImageFilter
                  className="d-inline-block align-bottom col-6 col-sm-5 col-md-3 col-lg-4 m-1 m-sm-2 collage"
                  filter={'duotone'}
                  image={'./landing/143052967_4.jpg'}
                  svgProps={{
                    'aria-label': 'Craft workshop in printing industry',
                  }}
                  colorOne={duotoneCraft.default.one}
                  colorTwo={duotoneCraft.default.two}
                />
                <ImageFilter
                  className="d-inline-block align-bottom col-2 col-md-1 m-1 m-sm-2 collage"
                  filter={'duotone'}
                  image={'./landing/143222876_1.jpg'}
                  svgProps={{
                    'aria-label': 'Craft workshop in cuisine industry',
                  }}
                  colorOne={duotoneCraft.default.one}
                  colorTwo={duotoneCraft.default.two}
                />
                <ImageFilter
                  className="d-inline-block align-top col-4 col-md-2 m-1 m-sm-2 ms-4 collage"
                  filter={'duotone'}
                  image={'./landing/151673966_1.jpg'}
                  svgProps={{
                    'aria-label': 'Archival image of souk in Beirut',
                  }}
                  colorOne={duotoneCraft.default.one}
                  colorTwo={duotoneCraft.default.two}
                />
                <ImageFilter
                  className="d-inline-block align-middle col-6 col-md-4 col-lg-5 m-1 m-sm-2 collage"
                  filter={'duotone'}
                  image={'./landing/148266688_1.jpg'}
                  svgProps={{
                    'aria-label':
                      'Archival image of craftsperson in textile craft workshop',
                  }}
                  colorOne={duotoneCraft.default.one}
                  colorTwo={duotoneCraft.default.two}
                />
                <div className="d-inline-block col-1 col-sm-2 col-md-0 m-1"></div>
                <ImageFilter
                  className="d-inline-block align-top col-3 col-md-2 m-1 m-sm-2 collage"
                  filter={'duotone'}
                  image={'./landing/140472870_4.jpg'}
                  svgProps={{
                    'aria-label': 'Craft workshop in furniture industry',
                  }}
                  colorOne={duotoneCraft.default.one}
                  colorTwo={duotoneCraft.default.two}
                />
                <ImageFilter
                  className="d-inline-block align-top col-4 col-md-2 m-1 m-sm-2 collage"
                  filter={'duotone'}
                  image={'./landing/148269533_1.jpg'}
                  svgProps={{
                    'aria-label':
                      'Archival image of craftsperson in functional craft workshop',
                  }}
                  colorOne={duotoneCraft.default.one}
                  colorTwo={duotoneCraft.default.two}
                />
              </div>
            </div>
            {/* </Animator>
            </ScrollPage>
            <ScrollPage>
              <Animator animation={batch(Sticky(), Fade(0,1))}> */}
            <div className="container-sm vh-100 d-flex flex-column justify-content-center mt-5 p-4">
              <div
                style={{
                  padding: '56.25% 0 0 0',
                  position: 'relative',
                }}
              >
                <iframe
                  src="https://player.vimeo.com/video/783337873?h=8529ccc1f9&autoplay=1&title=0&byline=0&portrait=0"
                  style={{
                    position: 'absolute',
                    top: '50%',
                    transform: 'translateY(-50%)',
                    left: 0,
                    width: '100%',
                    height: '90%',
                  }}
                  frameborder="0"
                  allow="fullscreen; picture-in-picture"
                  allowfullscreen
                ></iframe>
              </div>
              <script src="https://player.vimeo.com/api/player.js"></script>
              {/* <div className="index-logo">
                  <div className="col-8">
                    <img className="w-100" src="./LHA_logo-horiz.png" alt="Living Heritage Atlas | Beirut logo"/>
                    <p className="mt-3 px-4"><em>Living Heritage Atlas | Beirut</em> is a design-based research project
                      that contributes to urban planning discussion on Beirut's heritage by rendering visible the often
                      unrecognized social heritage of craftsmanship — with its crafts, public spaces, and local
                      knowledge</p>
                  </div>
                </div> */}
            </div>
            {/* </Animator>
            </ScrollPage>
            <ScrollPage page={2}>
              <Animator animation={batch(Sticky(), Fade(0,1))}> */}
            <div className="container-sm vh-100 d-flex flex-column justify-content-center mt-5 p-4">
              <div className="landing-nav d-flex flex-column justify-content-center mt-5 mt-sm-0">
                <div className="row mb-3">
                  <div className="col-1 col-sm-2 col-md-3 col-lg-4"></div>
                  <div className="col-2 col-md-1">
                    <div className="h-50">
                      <MapIcon className={`heroicon h-100 ` + i18n.language} />
                    </div>
                  </div>
                  <div className="nav-item col-7 col-sm-5 col-md-4 col-lg-3">
                    <a href="/map">
                      <h3 className="mb-0">{t('Map')}</h3>
                      <p className="mb-0 lh-1">
                        {t('the spatial presence of craftsmanship in Beirut')}
                      </p>
                    </a>
                  </div>
                </div>
                <div className="row mb-3">
                  <div className="col-1 col-sm-2 col-md-3 col-lg-4"></div>
                  <div className="col-2 col-md-1">
                    <div className="h-50">
                      <DocumentSearchIcon
                        className={`heroicon h-100 ` + i18n.language}
                      />
                    </div>
                  </div>
                  <div className="nav-item col-7 col-sm-5 col-md-4 col-lg-3">
                    <a href="/discover">
                      <h3 className="mb-0">{t('Discover')}</h3>
                      <p className="mb-0 lh-1">
                        current craft workshops and archival images of Beirut's
                        craftsmanship
                      </p>
                    </a>
                  </div>
                </div>
                <div className="row mb-3">
                  <div className="col-1 col-sm-2 col-md-3 col-lg-4"></div>
                  <div className="col-2 col-md-1">
                    <div className="h-50">
                      <CloudUploadIcon
                        className={`heroicon h-100 ` + i18n.language}
                      />
                    </div>
                  </div>
                  <div className="nav-item col-7 col-sm-5 col-md-4 col-lg-3">
                    <a href="/contribute">
                      <h3 className="mb-0">{t('Contribute')}</h3>
                      {i18n.language === 'en' ? (
                        <p className="mb-0 lh-1">
                          to the <em>Living Heritage Atlas</em> with photos of
                          Beirut's craftsmanship
                        </p>
                      ) : (
                        <p className="mb-0 lh-1">
                          {t(
                            'to the Living Heritage Atlas with photos of craftsmanship'
                          )}
                        </p>
                      )}
                    </a>
                  </div>
                </div>
                <div className="row mb-3">
                  <div className="col-1 col-sm-2 col-md-3 col-lg-4"></div>
                  <div className="col-2 col-md-1">
                    <div className="h-50">
                      <DatabaseIcon
                        className={`heroicon h-100 ` + i18n.language}
                      />
                    </div>
                  </div>
                  <div className="nav-item col-7 col-sm-5 col-md-4 col-lg-3">
                    <a href="/download">
                      <h3 className="mb-0">{t('Download')}</h3>
                      <p className="mb-0 lh-1">
                        craft workshop and archival image data from the{' '}
                        <em>Living Heritage Atlas</em>
                      </p>
                    </a>
                  </div>
                </div>
                <div className="row mb-3">
                  <div className="col-1 col-sm-2 col-md-3 col-lg-4"></div>
                  <div className="col-2 col-md-1">
                    <div className="h-50">
                      <GlobeIcon
                        className={`heroicon h-100 ` + i18n.language}
                      />
                    </div>
                  </div>
                  <div className="nav-item col-7 col-sm-5 col-md-4 col-lg-3">
                    <a href="/about">
                      <h3 className="mb-0">{t('About')}</h3>
                      <p className="mb-0 lh-1">
                        the <em>Living Heritage Atlas</em> and our community
                        engagement
                      </p>
                    </a>
                  </div>
                </div>
              </div>
            </div>
            {/* </Animator>
            </ScrollPage>
          </ScrollContainer> */}
          </div>
        </div>
      </div>
    </>
  );
};

export default Index;
