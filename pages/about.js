import Head from 'next/head';
import Schedule from '../components/about/schedule';
import { useTranslation } from 'next-i18next';
import { useState, useEffect } from 'react';
import Carousel from 'react-bootstrap/Carousel';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronLeft, faXmark } from '@fortawesome/free-solid-svg-icons';

const workshopData = {
  badguer: {
    title: 'Badguer',
    description:
      'Founded by Arpi Mangasserian, Badguèr is an arts incubator, cultural platform, and multipurpose space promoting Armenian heritage, cuisine, and customs.',
  },
  circus: {
    title: 'The Circus Hub',
    description:
      'Paramaz Yepremiao, the owner of The Circus Hub, specializes in the manufacture of circus equipment.',
  },
  coin: {
    title: "Coin d'Art",
    description:
      "Located in Remeil, Beirut, Coin D'Art specializes in framing, paintingm printing and woodwork",
  },
  doniguian: {
    title: 'Doniguian Printing House',
    description: 'Guy Doniguian is a printmaker at Doniguian Printing House',
  },
  studio: {
    title: 'Studio Kunukku',
    description:
      'Craftspeople at Studio Kunukku print patterns onto fabric using engraved wooden blocks',
  },
  jackson: {
    title: 'Hagop "Jackson" Keshishian',
    description:
      'Hagop “Jackson” Keshishian works on leather shoes in his workshop',
  },
  nobour: {
    title: 'Noubar Eskidjian',
    description:
      'A craftsperson, Noubar Eskidjian, uses industrial machinery to carefully mold copper sculptures. Having practiced this craft for decades, Noubar owns and operates his craft workshop in Bourj Hammoud.',
  },

  piper: {
    title: 'Peter Katcherian',
    description: 'Peter Katcherian handcrafts wooden pipes.',
  },
  zakour: {
    title: 'Wissam Houry',
    description:
      'Wissam Houry, a third generation leather craftsperson, poses with a handmade leather horse harness in his craft workshop.',
  },
};

const About = ({ i18n }) => {
  const { t } = useTranslation();

  const [craftsPerson, setCraftsPerson] = useState(undefined);
  const [menu, setMenu] = useState(false);
  const [touchscreen, setTouchscreen] = useState(false);
  useEffect(() => {
    setTouchscreen(window.matchMedia('(pointer: coarse)').matches);
  });

  return (
    <>
      <Head>
        <title>About | Living Heritage Atlas</title>
      </Head>
      <div className="about-wrap">
        <div className={'about-container'} id={'about-section'}>
          <div className={' text-container'}>
            <h3>Living Heritage Atlas</h3>
            <p>
              Living Heritage Atlas celebrates the past and present of local
              artisanship in Beirut through archival data, interviews and
              community workshops. By leveraging historical data and
              interactions with craftspeople, the Living Heritage Atlas
              advocates for a more equitable future for small local crafts
              businesses. This project recognizes the enduring vulnerability of
              Beirut-based craftspeople as they cope with the ongoing economic
              crisis, post-disaster challenges and fierce global market
              competition.{' '}
            </p>
          </div>
          <div className={'about-image-container'}>
            <img src="./about/about_1.jpg" />
          </div>
        </div>
        <div
          className={'about-container bleed'}
          id={'venice exhibit 2023-section'}
        >
          <div className={'about-image-container bleed'}>
            <img src="./about/about_2.jpg" />
          </div>
          <div className={'text-container bleed'}>
            <div>
              <h3>Rebuilding Beirut</h3>
              <p>Using Data to Co-Design a New Future</p>
              <i>(2023 Exhibition in Venice)</i>
            </div>
            <p>
              In May 2023, the Venice Biennale will feature “Tools for
              Rebuilding Beirut”, a showcase of three collaborative research and
              design proposals led by faculty, researchers and students from
              MIT’s School of Architecture and Planning. Each intervention
              addresses a unique aspect of rebuilding Beirut’s urban fabric:
              from the significance and vulnerability of cultural heritage in
              Living Heritage Atlas; to the environmental impacts of the
              explosion and the subsequent rebuilding efforts in City Scanner;
              to the redesign of streets and public space in Community Streets.{' '}
            </p>
          </div>
        </div>
        <div className={'about-container'} id={'community engagement-section'}>
          <div className={'text-container'}>
            <h3>Community Engagement</h3>
            <p>
              In July 2022, Living Heritage Atlas held workshop walking tours, a
              participatory mapping workshop, and a panel discussion on
              documenting craftsmanship, legitimizing craftspeople's presence,
              and mobilizing shared spaces to connect stakeholders working on
              craftsmanship in Beirut.{' '}
            </p>
          </div>
          <div className={'about-image-container'}>
            <img src="./about/about_3.jpg" />
          </div>
        </div>

        <div className={'about-container bleed'}>
          <div className={'about-image-container bleed'}>
            <img src="./about/craft_tour.jpg" />
          </div>
          <div className={'text-container bleed'}>
            <div>
              <h3>Craft Workshop Tours</h3>
            </div>
            <p>
              The Craft Workshop Tours were a result of extensive work to map as
              many craftspeople and learn more about their crafts and stories.
              In the Craft Workshop Tours, participants walked around the
              streets of Gemmayze, Mar Mikhael, and Bourj Hammoud to meet local
              endangered and unrecognized craftsmen at an intimate scale,
              shedding light on this culture and enhancing its liveliness and
              know-how. Participants were provided with a mobile mapping kit,
              containing small neighborhood maps to mark workshops’ locations
              and write down notes about craftspeople's stories throughout the
              guided walks.The event hosted 15 individuals at the time to
              maximize the learning experience and allow for connections to
              build between the craftsmen and the participants. These tours
              acted as a celebratory moment of the local ingenuity of
              craftspeople. Flags and colorful tote bags–designed and produced
              by Studio Kunukku through block printing techniques–were carried
              by the team throughout the tours.
            </p>
          </div>
        </div>

        <div className="about-container">
          <div
            className={'about-subcontainer'}
            style={{
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              alignContent: 'center',
              padding: '2rem',
            }}
          >
            <div className={'workshop-grid'}>
              {[
                'badguer',
                'circus',
                'coin',
                'doniguian',
                'jackson',
                'nobour',
                'piper',
                'studio',
                'zakour',
              ].map((name) => {
                return (
                  <div
                    onClick={() => {
                      if (craftsPerson !== name) {
                        setCraftsPerson(name);

                        document
                          .getElementById(`${name}-thumbnail`)
                          .classList.add('active');
                      } else {
                        setCraftsPerson(undefined);
                      }
                      document
                        .getElementById(`${craftsPerson}-thumbnail`)
                        ?.classList?.remove('active');
                    }}
                    className={'grid-space'}
                  >
                    <img
                      className={'grid-img'}
                      id={`${name}-thumbnail`}
                      src={`./about/${name}_1.jpg`}
                    />
                  </div>
                );
              })}
            </div>
          </div>
          <div
            className={'about-subcontainer'}
            style={{
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              alignContent: 'center',
              padding: '3.5rem',
              rowGap: '1rem',
            }}
          >
            {craftsPerson === undefined ? (
              <>
                <p>
                  Throughout the Mar-Mikhael-Gemmayze Tour, the living heritage
                  atlas team and participants toured several local craftsmen
                  with different specialties and heard their stories: Mr.
                  Doniguian, who runs a printing press on Armenia street, Studio
                  Kunukku, a block-printing studio, The Circus Hub, one of the
                  first manufacturers of circus equipment, and Coin d’Art, a
                  painting, framing, and restoration family business.
                </p>
                <p>
                  The Bourj Hammoud Tour allowed participants to meet more
                  crafts workshops due to the cluster of craftsmen in the area;
                  the tour started with meeting Hagop Keshishian, known as
                  Jackson, a local who makes and repairs shoes, and moved to
                  meet his next-door neighbor Bedros Keshishian who works in
                  woodworks and carpentry. The tour then resumed with meeting
                  Gregor Ichkerian, a metal sculptor who works with his son, and
                  then Peter Khatcherian, the only pipemaker in the Arab Region.
                  The tour ended with meeting Noubar Eskidjian who specializes
                  in copper work.
                </p>

                <b>Click on a craftsperson to learn more</b>
              </>
            ) : (
              <>
                <h3>{workshopData[craftsPerson].title}</h3>
                <div>
                  <Carousel indicators={false}>
                    <Carousel.Item>
                      <img
                        className="d-block w-100 archive-slide"
                        src={`./about/${craftsPerson}_1.jpg`}
                      />
                    </Carousel.Item>
                    <Carousel.Item>
                      <img
                        className="d-block w-100 archive-slide"
                        src={`./about/${craftsPerson}_2.jpg`}
                      />
                    </Carousel.Item>
                    <Carousel.Item>
                      <img
                        className="d-block w-100 archive-slide"
                        src={`./about/${craftsPerson}_3.jpg`}
                      />
                    </Carousel.Item>
                  </Carousel>
                </div>
                <p>{workshopData[craftsPerson].description}</p>
              </>
            )}
          </div>
        </div>
        <div className={'about-container'}>
          <div className={'text-container'}>
            <h3>Archival Image Tours</h3>
            <p>
              The Archival Tours brought to the public realm months of archival
              harvesting and research. By touring the streets of Al Balad and
              Bourj Hammoud, participants were able to enrich their narrative on
              craftsmanship in the city of Beirut while understanding the ways
              in which craftspeople have been marginalized.{' '}
            </p>
          </div>
          <div className={'about-image-container'}>
            <img src="./about/archive_1.jpg" />
          </div>
        </div>
        <div className={'about-container'}>
          <div className={'text-container'}>
            <p>
              The team previously roamed these locations and placed geo-located
              stickers to allow for the tours to happen. During the tours,
              participants followed a map of where those stickers were, scanned
              the QR code on them which led them to a Whatsapp Chat where they
              sent an allocated code in order to get to view an archival
              picture, and read a story about it. Unlike the crafts workshop
              tours, the archival tours focused more on the past of
              craftsmanship in the city, showing imagery of what was, rather
              than what is.
            </p>
            <p>
              These stickers remain posted throughout the city as a reminder to
              people of what used to exist in those spaces. They act as digital
              windows into the city’s past. Those interested in a self-guided
              archival tour can look for the stickers around Al-Balad and
              Bourj-Hammoud, for an archival digitally-powered experience of
              craftsmanship in Beirut.
            </p>
          </div>
          <div className={'about-image-container'}>
            <Carousel indicators={false}>
              {/* <Carousel.Item>
                <img className="d-block w-100" src="./about/archive_1.jpg" />
              </Carousel.Item> */}
              <Carousel.Item>
                <img
                  className="d-block w-100 archive-slide"
                  src="./about/archive_2.jpg"
                />
              </Carousel.Item>
              <Carousel.Item>
                <img
                  className="d-block w-100 archive-slide"
                  src="./about/archive_3.jpg"
                />
              </Carousel.Item>
              <Carousel.Item>
                <img
                  className="d-block w-100 archive-slide"
                  src="./about/archive_4.jpg"
                />
              </Carousel.Item>
            </Carousel>
          </div>
        </div>

        <div className={'about-container bleed'}>
          <div className={'about-image-container bleed'}>
            <img src="./about/panel.jpg" />
          </div>
          <div className={'text-container bleed'}>
            <div>
              <h3>Roundtable Discussionss</h3>
            </div>
            <p>
              Diverse panelists were invited to sit around for 3 roundtable
              events that discussed craftsmanship. The roundtable discussions
              were moderated by Daniella Maamari (lead researcher & project
              manager at FHL) and Racha Doughman (events coordinator). Ahmad
              Khouja (Mashghal Initiative), Arpi Mangasserian (Badguer), Joy
              Kanaan (Beirut Heritage Initiative) and Pascale Habis (The Ready
              Hand) sat together for the first panel discussing the
              documentation of craftsmanship and its importance. In the second
              panel discussing the legitimizing of craftsmen’s presence, Camille
              Tarazi (Maison Tarazi), Mohamad Ayoub (NAHNOO), Nicole Hamouche
              and Roula Haidar (L’artisan du Liban) engaged in a fruitful
              conversation to look at the different ways this legitimizing can
              take place and how craftsman can benefit from a legal body to link
              them to stakeholders. The final panel which discussed the
              mobilizing of crafts in shared spaces featured Christina Abou
              Rouphael (Public Works Studio), Elena Costantinou (UNESCO), Nanor
              Karageozian (UN-Habitat) and Charbel Tawil (Nusaned), who
              discussed the role of public space and data as art and crafts
              catalysts.
            </p>
          </div>
        </div>

        <div className={'about-container'}>
          <div className={'text-container'}>
            <h3>Mappathon</h3>
            <p>
              Participants were invited to contribute to the digital archive
              through a mapathon, a community mapping event,in which
              participants brought along a living heritage item (such as photos,
              maps, and fabric) to be scanned and returned to them. Over 70
              participants were presented with detailed maps of Beirut in which
              they could locate and name crafts workshops that haven’t been
              previously located by the team. The points were added to the
              online directory and archival database in real-time and the
              attendees were provided with detailed instructions on how to
              contribute their points to be reviewed, through the website
              directly.
            </p>
          </div>
          <div className={'about-image-container'}>
            <img src="./about/mappathon.jpg" />
          </div>
        </div>
        <div className={'about-container'} id={'credits-section'}>
          <div className={'about-image-container'}>
            <h3>Credits</h3>
            <p>
              <i>Living Heritage Atlas </i>was developed by the Civic Data
              Design Lab and the Future Heritage Lab at Massachusetts Institute
              of Technology (MIT). Living Heritage Atlas is supported by the Dar
              Group Urban Seed Grant Fund at MIT’s Norman B. Leventhal Center
              for Advanced Urbanism.
            </p>
            <div className="credit-grid">
              <div>
                <h3>Civic Data Desgin Lab</h3>
                <p>
                  The Civic Data Design Lab at MIT works by using data for
                  public good. Research methods in the lab employ an ethical
                  approach to working with data. Collaboration within an
                  interdisciplinary team of data scientists, policy experts,
                  designers, and technologists catalyzes the development of
                  alternative practices, which make data findings richer, more
                  relevant, and more responsive to the needs and interests of
                  citizens traditionally on the margins of policy development.
                  Borrowing from the traditions of science and design, spatial
                  analytics expose patterns and creative visualizations
                  communicate results to reach new audiences.
                </p>
              </div>
              <div>
                <h3>Future Heritage Lab</h3>
                <p>
                  The Future Heritage Lab collaborates with communities affected
                  by conflict and crisis to collect and preserve histories of
                  transcultural exchange and histories of threatened monuments,
                  artifacts, textiles, and crafts. Linking art, culture, and
                  technology, the Future Heritage Lab regenerates relevance of
                  cultural heritage for contemporary conditions and for the
                  future. The team builds future heritage by implementing
                  civic-scale participatory cultural projects that translate
                  traditional crafts into new technologies, advance knowledge
                  transfer across borders, and have a positive impact on
                  threatened communities.
                </p>
              </div>
              <div>
                <h3>Civic Data Desgin Lab Team</h3>
                <p>
                  Sarah Williams (Director), Carmelo Ignaccolo (Lead Researcher
                  & Project Manager), Ashley Louie (Exhibition Lead & Project
                  Manager), Niko McGlashan, Kelly Fang, Enrique Casillas, Gatlen
                  Culp, Huiwen Shi, Sophia Zheng
                </p>
              </div>
              <div>
                <h3>Future Heritage Lab Team</h3>
                <p>
                  Azra Aksamija (Director), Daniella Maamari (Lead Researcher &
                  Project Manager), Sarine Agopian, Ramzi Alieh, Ahmad Beydoun,
                  Racha Doughman, Reem Farhat, Kamila El Khechen, Raafat
                  Majzoub, Fatima Moussa, Moussa Shabandar, Reem Obeid, Rasha
                  Zayour
                </p>
              </div>
            </div>
            <div className="logos">
              <img src={'./MIT SA+P Logo.png'} />
              <img src={'./FHL Logo.png'} />
              <img src={'./CDDL Logo.png'} />
            </div>
          </div>
        </div>
      </div>

      <FontAwesomeIcon
        onClick={() => {
          if (touchscreen) setMenu(true);
        }}
        onMouseEnter={() => {
          console.log('enter');
          setMenu(true);
        }}
        icon={faChevronLeft}
        className={'about-menu-btn'}
      />
      <div
        onMouseLeave={() => {
          console.log('exit');

          setMenu(false);
        }}
        className={`about-menu ${menu ? 'active' : 'inactive'}`}
      >
        {(touchscreen || window.innerWidth < 600) && (
          <FontAwesomeIcon
            className="close-about-menu"
            icon={faXmark}
            onClick={() => {
              setMenu(false);
            }}
          />
        )}
        {[
          'about',
          'venice exhibit 2023',
          'community engagement',
          'credits',
        ].map((chapter) => {
          return (
            <div
              className="container"
              onClick={() => {
                const selected = document.getElementById(`${chapter}-section`);
                if (selected) selected.scrollIntoView({ behavior: 'smooth' });
              }}
            >
              <div className="item-line"></div>
              <div className="item-text-1">
                <p className="about-item">{chapter}</p>
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
};

export default About;
