import dynamic from 'next/dynamic';
// import { ScrollContainer, ScrollPage, batch, Fade, FadeIn, FadeOut, Move, MoveIn, MoveOut, Sticky, StickyIn, StickyOut, Zoom, ZoomIn, ZoomOut } from "react-scroll-motion";
import ImageFilter from 'react-image-filter';
import Window from '../components/landing/Window';
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
import Link from 'next/link';
import React, { useState, useEffect } from 'react';

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

const data = {
  video: {
    link: false,
    onclick: () => {
      const video = document.getElementsByClassName('video__landing')[0];
      console.log('video ', video);
      if (video !== undefined) {
        video.scrollIntoView({ behavior: 'smooth' });
      }
      console.log('clicked');
    },
    static: './landing/video.png',
    filepath: './landing/video.gif',
    heading: 'Introduction to Living Heritage Atlas | Beirut',
    subheading: '',
    body: [],
    style: { height: '27%', width: '35%', top: '61%', left: '17.6%' },
  },
  circus: {
    link: '/discover/139558956',
    filepath: './landing/circus.jpg',
    heading: 'Circus Hub',
    subheading:
      'Cirbus Hub | Est. 2010 · Circus Props · Qobaiyat, Remeil, Beirut',
    body: [
      'Paramaz Yepremiao, the owner of Circus Hub, specializes in the manufacture of circus equipment. Yepremiao has shared his practice with the Living Heritage Atlas, and his business is one of over 110 current craft workshops that have been mapped and documented in the Living Heritage Atlas database.',
    ],
    style: {
      width: '10.0145%',
      height: '9.290060%',
      left: '81.226277%',
      top: '12.00811%',
    },
  },
  badguer: {
    link: '/discover',
    filepath: './landing/badguer.jpg',
    heading: 'Badguer',
    subheading: 'Badguer · Embroidery · Bourj Hammoud, El Meten',
    body: [
      'Arpi Mangasserian is the founder of Badguèr, an arts incubator, cultural platform, and multipurpose space promoting Armenian heritage, cuisine, and customs.' +
        ' Arpi has shared her practice with the Living Heritage Atlas, and her business is one of over 110 current craft workshops that have been mapped and documented in the Living Heritage Atlas database.',
    ],
    style: {
      width: '8.729%',
      height: '12.04868%',
      left: '1.19708%',
      top: '12.089%',
    },
  },
  coin: {
    link: '/discover/138961186',
    filepath: './landing/coin.jpg',
    heading: "Coin d'Art",
    subheading:
      "Coin d'Art | Est. 1990 · Framing, Painting, Printing, Woodwork · Rmeil, Beirut",
    body: [
      "Located in Remeil, Beirut, Coin d'Art is a family run business that specializes in framing, paintingm printing and woodwork. Coin d'Art has shared their practice with the Living Heritage Atlas, and their business is one of over 110 current craft workshops that have been mapped and documented in the Living Heritage Atlas database.",
    ],
    style: {
      width: '6.627737%',
      height: '9.29006%',
      left: '93.37226%',
      top: '12.00811%',
    },
  },
  doniguian: {
    link: '/discover/149744914',
    filepath: './landing/doniguian.jpg',
    heading: 'Doniguian Printing House',
    subheading:
      'Doniguian Printing House | 2023 · Printing, Packaging · Mar Mikhael, Medawar, Beirut',
    body: [
      'Guy Doniguian is a printmaker at Doniguian Printing House. Doniguian has shared his practice with the Living Heritage Atlas, and his business is one of over 110 current craft workshops that have been mapped and documented in the Living Heritage Atlas database.',
    ],
    style: {
      width: '9.78102%',
      height: '10.10141%',
      left: '69.956%',
      top: '4.74645%',
    },
  },
  donikian: {
    link: '/discover/148266688',
    filepath: './landing/donikian.jpeg',
    heading: 'Donikian Leather',
    subheading:
      'Donikian Leather | 2014 · Leather · Badguèr, Der Melkonian Street, Bourj Hammoud',
    body: [
      'Sarkis Donikian, craftsperson and owner of Donikian Leather, in his shop. This photo is one of over 800 archival images that have been mapped and documented in the Living Heritage Atlas database.',
    ],
    style: {
      width: '13.021%',
      height: '12.0081%',
      left: '40.496%',
      top: '2.920%',
    },
  },
  jackson: {
    link: '/discover/148266023',
    filepath: './landing/jackson.jpg',
    heading: 'Hagop "Jackson" Keshishian',
    subheading:
      'Hagop “Jackson” Keshishian | 2023 · Shoemaker · Bourj Hammoud, El Meten',
    body: [
      'Hagop “Jackson” Keshishian works on leather shoes in his workshop. Jackson has shared his practice with the Living Heritage Atlas, and his business is one of over 110 current craft workshops that have been mapped and documented in the Living Heritage Atlas database.',
    ],
    style: {
      width: '9.78%',
      height: '18.093%',
      left: '83.06569%',
      top: '39.269%',
    },
  },
  noubar: {
    link: '/discover/148274420',
    filepath: './landing/noubar.jpg',
    heading: 'Noubar Eskidjian',
    subheading: 'Noubar Eskidjian | 2023 · Copper · Bourj Hammoud, El Meten',
    body: [
      'A craftsperson, Noubar Eskidjian, uses industrial machinery to carefully mold copper sculptures. Having practiced this craft for decades, Noubar owns and operates his craft workshop in Bourj Hammoud. Noubar has shared his practice with the Living Heritage Atlas, and his business is one of over 110 current craft workshops that have been mapped and documented in the Living Heritage Atlas database. ',
    ],
    style: {
      width: '9.927%',
      height: '18.3367%',
      left: '0%',
      top: '27.1399%',
    },
  },
  piper: {
    link: '/discover/145593040',
    filepath: './landing/piper.jpg',
    heading: 'Peter Khatcherian',
    subheading:
      'Peter Khatcherian | 2022 · Pipe maker · Nor Marash, Bourj Hammoud, El Meten',
    body: [
      'Peter Khatcherian hand crafts wooden pipes. Khatcherian has shared his practice with the Living Heritage Atlas, and his business is one of over 110 current craft workshops that have been mapped and documented in the Living Heritage Atlas database.',
    ],
    style: {
      width: '6.598%',
      height: '9.16%',
      left: '51%',
      top: '90.8%',
    },
  },
  archive_tour: {
    link: '/about',
    filepath: './landing/archive_tour.jpg',
    heading: 'Archival Image Tour',
    subheading: 'Uncovering the past through digital tools',
    body: [
      'During the archival tours both residents and visitors explored the rich archival dataset of the Living Heritage Atlas through the stickers distributed around Beirut; people who joined these tours were encouraged to message a WhatsApp code written on the stickers, read out loud the stories delivered to their phones and collectively participate in a community exercise to acknowledge the historic presence (and often displacement) of workshops in Beirut.',
    ],
    style: { width: '13.6%', height: '18.9%', left: '54.7%', top: '69.7%' },
  },
  naser: {
    link: '/discover/145875023',
    filepath: './landing/naser.jpg',
    heading: 'Abu Al-Nasr Market',
    subheading: 'Abu Al-Nasr Market | 1900 · Wickerwork · Beirut',
    body: [
      'Straw chairs and household supplies at a souk in Abu Al-Nasr Market. This photo is one of over 800 archival images that have been mapped and documented in the Living Heritage Atlas database.',
    ],
    style: { width: '4.846%', height: '9.12%', left: '69.81%', top: '69.61%' },
  },
  tannery: {
    link: '/discover/144975829',
    filepath: './landing/tannery.jpg',
    heading: 'The Tannery',
    subheading:
      'The Tannery | 1972 · Leather · Beirut River, Bourj Hammoud, El Meten Hayek, J. Bourj Hammoud: l’évolution du site urbain. Institut français du Proche-Orient (1972). Courtesy of Institut français du Proche-Orient.',
    body: [
      'In this 1972 photograph, children of Nor Marash proudly demonstrate their tanner skills and displayed tanned leather on a wooden cart. The art of leatherworking is historically rooted in Bourj Hammoud, a place of refuge for many asylum seekers. The craft of tannery represents the survival of an inherited skill that has been passed down over generations and connects to the collective identity of the resilient community in Bourj Hammoud. This photo is one of over 800 archival images that have been mapped and documented in the Living Heritage Atlas database. ',
    ],
    style: {
      width: '9.8394160583%',
      height: '9.12778904%',
      left: '87.41605%',
      top: '0%',
    },
  },
  upholstery: {
    link: '/discover/151673966',
    filepath: './landing/upholstery.jpg',
    heading: "Upholsterer's Souk",
    subheading:
      'Upholsterer’s Souk | 1950 · Upholstery · Serail, Zoukak el-Blatt, Beirut',
    body: [
      'Upholsterer’s souk near Riad as-Solh square. This photo is one of over 800 archival images that have been mapped and documented in the Living Heritage Atlas database.',
    ],
    style: { width: '13.722%', height: '19.066%', left: '12%', top: '39.269%' },
  },
  street: {
    link: '/about',
    filepath: './landing/street.jpg',
    heading: 'Bourj Hammoud',
    subheading: 'Site of ',
    body: [
      'This Bourj Hammoud tour allowed participants to meet many craft workshops due to the cluster of craftspeople in the area of Bourj Hammoud; the tour started with meeting Hagop Keshishian, known as Jackson, a local craftsperson who makes and repairs shoes, and moved to meet his next-door neighbor Bedros Keshishian who works in woodworks and carpentry. The tour then resumed with meeting Gregor Ichkerian, a metal sculptor who works with his son, and then Peter Khatcherian, the only pipe maker in the Arab Region. The tour ended with meeting Noubar Eskidjian, who specializes in copper work.',
    ],
    style: {
      width: '9.78%',
      height: '9.046%',
      left: '83.0656%',
      top: '60.5679%',
    },
  },
  panel: {
    link: '/about',
    filepath: './landing/panel.jpg',
    heading: 'Roundtable Discussions',
    subheading:
      'Documenting Craftsmanship · Legitimizing Craftspeople’s Presence · Mobilizing Crafts in Shared Spaces',
    body: [
      'In July 2022, the Future Heritage Lab and the Civic Data Design Lab at MIT, the research team that created the Living Heritage Atlas, organized a roundtable discussion focused on preserving the living heritage of craftsmanship in Beirut. Over a dozen prominent stakeholders involved in the craftsmanship community came together to discuss three main topics: documenting craftsmanship, valorizing craftpeoples’ presence, and mobilizing shared spaces. The event was held in the Abroyan Factory, a former textile factory and adapted event space in Bourj Hammoud.',
    ],
    style: {
      width: '24.408%',
      height: '19.066%',
      left: '28.05%',
      top: '39.269%',
    },
  },
  panel_2: {
    link: '/about',
    filepath: './landing/panel_2.jpg',
    heading: 'Mappathon',
    subheading: '',
    body: [
      'Wissam Houry, a third generation leather craftsperson, poses with his son and the tools he uses to create handmade horse saddles and other leather goods.',
    ],
    style: {
      width: '17.4598%',
      height: '18.174%',
      left: '62.277%',
      top: '18.05273%',
    },
  },
  mappathon: {
    link: '/about',
    filepath: './landing/mappathon.jpg',
    heading: 'Mappathon',
    subheading: '',
    body: [
      'Participants were invited to contribute to the digital archive through a mapathon, a community mapping event,in which participants brought along a living heritage item (such as photos, maps, and fabric) to be scanned and returned to them.',
    ],
    style: {
      width: '19.5036%',
      height: '18.0933%',
      left: '40.496%',
      top: '18.05273%',
    },
  },
  craft_tour: {
    link: '/about',
    filepath: './landing/craft_tour.jpg',
    heading: 'Craft Workshop Tour',
    subheading: 'Exploring local practices first hand',
    body: [
      'Visitors and local residents were invited to join walking tours in different areas of the city and meet with local craftspeople who toured the group through their shops. Craftspeople explained their practices by inscribing them into a more complex narrative of family heritage and knowledge.',
      'The event hosted 15 individuals at the time to maximize the learning experience and allow for connections to build between the craftsmen and the participants.',
      // 'Mar-Mikhael-Gemmayze Tour (July 5): the Living Heritage Atlas team and participants toured several local craftspeople with different specialties and heard their stories: Mr. Doniguian, who runs a printing press on Armenia street, Studio Kunukku, a block-printing studio, The Circus Hub, one of the first manufacturers of circus equipment, and Coin d’Art, a framing and art/painting restoration family business.',
      // 'Bourj Hammoud Tour (July 8): this tour allowed participants to meet many craft workshops due to the cluster of craftspeople in the area of Bourj Hammoud; the tour started with meeting Hagop Keshishian, known as Jackson, a local craftsperson who makes and repairs shoes, and moved to meet his next-door neighbor Bedros Keshishian who works in woodworks and carpentry. The tour then resumed with meeting Gregor Ichkerian, a metal sculptor who works with his son, and then Peter Khatcherian, the only pipe maker in the Arab Region. The tour ended with meeting Noubar Eskidjian who specializes in copper work.',
    ],
    style: {
      width: '13.6%',
      height: '12.210%',
      left: '81.86%',
      top: '24.016%',
    },
  },
  map: {
    link: '/map',
    static: './landing/map.png',
    filepath: './landing/map.gif',
    heading: 'Map',
    subheading: 'the spatial presence of craftsmanship',
    body: [
      'A selection of current and archival visual documentation contained in the Living Heritage Atlas database are displayed to the right — their placement creates a stylized map of the Beirut region. Living Heritage Atlas includes over 800 entries of historic craft workshops spaces and current craft workshops collected through on-site investigations, archival research, and community-based engagement. Each image has been mapped, and can be viewed in the context of Beirut’s urban fabric, thanks to a series of high-resolution historic maps. Explore the complete atlas online to discover Beirut’s intangible heritage through the interactive map.',
    ],
    style: {
      width: '26.5109%',
      height: '27.5456%',
      left: '12%',
      top: '8.6004%',
    },
  },
  discover: {
    link: '/discover',
    static: './landing/discover.png',
    filepath: './landing/discover.gif',
    heading: 'Discover',
    subheading: 'current craft workshops and archival images of craftsmanship',
    body: [
      'Living Heritage Atlas includes over 800 entries of historic craft spaces and current craft workshops collected through interviews, archival research, fieldwork, and community-based engagement. This online atlas documents information including the location, dates of operation, and type of craft captured in each image. Explore the complete atlas online to discover Beirut’s intangible heritage through these historic and contemporary images.',
    ],
    style: {
      width: '26.510%',
      height: '27.62%',
      left: '54.510%',
      top: '39.269%',
    },
  },
};

const Index = ({ i18n }) => {
  const default_text = {
    heading: 'Living Heritage Atlas',
    subheading: 'mapping and activating Beirut’s crafts',
    body: [
      'Living Heritage Atlas documents and visualizes Beirut’s living heritage of' +
        ' artisanship by mapping its craftspeople and cataloging its crafts through an open-source database,' +
        ' viewable through an interactive website. This project celebrates the past and present of local artisanship' +
        ' through archival data, interviews and community workshops.',
      ' The goal of this atlas is to shed light on the intangible heritage of Beirut by highlighting craftspeople’s cultural significance, vulnerability, and potential role in crafting the future of Beirut.',
    ],
  };
  const { t } = useTranslation();
  const [text, setText] = useState(default_text);
  const [touchscreen, setTouchscreen] = useState(false);

  useEffect(() => {
    setTouchscreen(window.matchMedia('(pointer: coarse)').matches);
  });

  function hover(key) {
    setText(data[key]);

    const cover = document.getElementById(`${key}-cover`);
    const image = document.getElementById(`${key}-img`);
    const stat = document.getElementById(`${key}-static`);
    cover.classList.add('active');
    image.classList.add('active');
    if (stat !== undefined) stat?.classList?.add('active');
  }

  function unhover(key) {
    setText(default_text);

    const cover = document.getElementById(`${key}-cover`);
    const image = document.getElementById(`${key}-img`);
    const stat = document.getElementById(`${key}-static`);
    cover.classList.remove('active');
    image.classList.remove('active');
    if (stat !== undefined) stat?.classList?.remove('active');
  }

  function renderText(key, value) {
    return (
      <div
        onClick={() => {
          if (touchscreen) {
            const cover = document.getElementById(`${key}-cover`);
            const active = cover.classList.contains('active');

            if (active) {
              unhover(key);
            } else hover(key);
          } else {
            if (value.link) {
              window.location.href = value.link;
            } else {
              value?.onclick();
            }
          }
        }}
        onMouseEnter={() => {
          if (!touchscreen) hover(key);
        }}
        onMouseLeave={() => {
          if (!touchscreen) unhover(key);
        }}
      >
        <img
          id={`${key}-img`}
          className="landing_window"
          src={value.filepath}
          style={value.style}
        />
        {value?.static && (
          <img
            src={value.static}
            id={`${key}-static`}
            className="static_cover"
            style={value.style}
          />
        )}
        <div id={`${key}-cover`} className="image_cover" style={value.style} />
      </div>
    );
  }

  function renderGrid() {
    const grid = [];
    for (const [key, value] of Object.entries(data)) {
      // if (value.link) {
      // grid.push(<Link href={value.link}>{renderText(key, value)}</Link>);
      // } else {
      grid.push(<> {renderText(key, value)}</>);
      // }
    }

    return grid;
  }

  return (
    <div className="container__landing">
      <div className="subcontainer__landing">
        <div className="container col-md-4 col-sm-12 landing_text">
          <div>
            <h3>{text.heading}</h3>
            <p>{text.subheading}</p>
          </div>
          <div>
            {text.body.map((t) => {
              return <p>{t}</p>;
            })}
          </div>
          {touchscreen && text.link && (
            <div>
              <p>
                Click <a href={text.link}>here</a> to learn more
              </p>
            </div>
          )}
        </div>

        <div className="container col-md-8 col-sm-12 grid_container">
          <div className="window_grid">{renderGrid()}</div>
        </div>
      </div>
      <div className="video__landing">
        <div
          style={{
            padding: '0 0 0 0',
            position: 'relative',
          }}
        >
          <iframe
            src="https://player.vimeo.com/video/783337873?h=8529ccc1f9&autoplay=0&title=0&byline=0&portrait=0"
            style={{
              position: 'absolute',
              top: '50%',
              transform: 'translateY(-50%)',
              left: 0,
              width: '100vw',
              height: '100%',
            }}
            frameborder="0"
            allow="fullscreen; picture-in-picture"
            allowfullscreen
          ></iframe>
        </div>
        <script src="https://player.vimeo.com/api/player.js"></script>
      </div>
    </div>
  );
};

export default Index;
