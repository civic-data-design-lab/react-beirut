import Head from 'next/head';
import Schedule from '../components/about/schedule';
import { useTranslation } from 'next-i18next';

const About = ({ i18n }) => {
  const { t } = useTranslation();
  return (
    <>
      <Head>
        <title>About | Living Heritage Atlas</title>
      </Head>
      <div className="container">
        <div className="title-card">
          <div className="text-container">
            {/* <h1>{t('About')}</h1> */}
            <p>{t("Mapping and activating Beirut's crafts")}</p>
          </div>
        </div>
        <hr />
        <div className="about-card col col-md-10 col-lg-8">
          <p className="fs-5 lh-sm">
            {t(
              "Living Heritage Atlas\u2002|\u2002Beirut is a design-based research project that contributes to the urban planning discussion on Beirut's heritage by rendering visible the often unrecognized living heritage of craftsmanship \u2014 with its crafts, public spaces, and local knowledge.\r"
            )}
          </p>
          <p className="fs-5 lh-sm">
            {t(
              `This project has been developed by the Massachusetts Institute of Technology (MIT) Civic Data Design Lab (CDDL) and Future Heritage Lab (FHL), and it is supported by Dar Group.`
            )}{' '}
            {t(
              'Living Heritage Atlas\u2002|\u2002Beirut recognizes that craftspeople are an exponentially marginalized and vulnerable group of individuals, operating at the intersection of heritage, the infrastructure of making, and the local economy at different urban scales.'
            )}
          </p>
          <p className={'fs-5 lh-sm'}>
            {t(
              'This project seemingly bridges the digital to the physical by advancing three key interventions:\r'
            )}{' '}
          </p>
          <ol className={`group ${i18n.language}`}>
            <li className="fs-5 lh-sm">
              {t(
                'It constructs a digital archive of geolocated historic data and images using visual and textual materials from local archives, residents, and craftspeople. Data is open-access and available to download at:'
              )}{' '}
              <a href="http://livingheritage.mit.edu/download">
                http://livingheritage.mit.edu/download
              </a>
            </li>
            <li className="fs-5 lh-sm">
              {t(
                'It implements a series of small neighborhood-wide interventions by disseminating site-specific street stickers and physical signages that connect physical spaces in contemporary Beirut to the historic images available on the Living Heritage Atlas | Beirut digital archive'
              )}
            </li>
            <li className="fs-5 lh-sm">
              {t(
                'It connects stakeholders working on the topic of craftsmanship through community meetings, participatory mapping workshops, and share-your-story events on the spaces and history of craftsmanship in Beirut'
              )}
            </li>
          </ol>
        </div>
        <div className="about-card">
          <h3 className="mb-4">
            <b>{t('Program Schedule')}</b>
          </h3>
          <p>
            {t(
              'Register to attend Living Heritage Atlas | Beirut events via the '
            )}{' '}
            <a href="https://ihjoz.com/companies/1887" target="_blank">
              {t('Ihjoz event webpage')}
            </a>
          </p>
          <Schedule i18n={i18n} />
        </div>
        <div className="about-card col col-md-10 col-lg-8">
          <h3 className="mb-3">
            <b>
              {t(
                'Living Heritage Atlas\u2002|  Mapping Beirut\u2019s Craftsmanship Event (July 7th) '
              )}
            </b>
          </h3>
          <p className="mb-0">
            <b>{t('Featured Event:')}</b>&emsp;
            {t('Two-hour roundtable discussion and mapping event')}
          </p>
          <p className="mb-0">
            <b>{t('Date&#58;')}</b>&emsp;{t('Thursday, July 7, 2022')}
          </p>
          <p className="mb-0">
            <b>{t('Time&#58;')}</b>&emsp;{t('600')}&ndash;{t('900pm')}
          </p>
          <p>
            <b>{t('Location&#58;')}</b>&emsp;
            {t('Abroyan Factor —Emile Eddeh Street, Bouj Hammoud, Beirut')}
          </p>
          <p>
            {t(
              'Register to attend Living Heritage Atlas | Beirut events via the'
            )}{' '}
            <a href="https://ihjoz.com/companies/1887" target="_blank">
              Ijhoz event webpage
            </a>
          </p>
          <p>
            {t(
              'Discussion during this event will primary be conducted in English; if you prefer to converse in Arabic, there will be a person at each table ready to help translate to and from Arabic and English as needed.'
            )}
          </p>
          <div className="t-event container-fluid mt-4">
            <div className="row mb-2">
              <div className="col-12 col-sm-3 col-md-2 px-0 pb-2">
                <b>{t('Pre-Opening')}</b>
              </div>
              <div className="col-12 col-sm-9 col-md-10 px-0 px-sm-3">
                <p>
                  {t('The')}{' '}
                  <a href="https://www.futureheritagelab.com/" target="blank">
                    {t('MIT Future Heritage Lab')}
                  </a>{' '}
                  {t('(FHL)')} {t('and')}{' '}
                  <a href="https://civicdatadesignlab.mit.edu/" target="blank">
                    {t('MIT Civic Data Design Lab')}
                  </a>{' '}
                  {t('(CDDL)')} {t('will present the')}{' '}
                  {t(
                    'digital archive of geolocated historic data and images using visual and textual materials from local archives, residents and craftspeople.'
                  )}
                </p>
                <p class="mb-1">
                  <b>{t('Bring a living heritage item!')}</b>
                </p>
                <p>
                  {t(
                    'Invitees and guests are asked to bring with them a living heritage item to contribute to the living heritage atlas. We define this element as a photograph, plan, map, guidebook, newspaper clipping, or artefact related to the past, present of crafts and craftsmanship in the city. All items will be scanned by our data collectors and returned by the end of the event.'
                  )}
                </p>
              </div>
            </div>
            <div className="row mb-2">
              <div className="col-12 col-sm-3 col-md-2 px-0 pb-2">
                <b>{t('Opening Remarks')}</b>
                <br />
                {t('600')}&ndash;{t('630pm')}
              </div>
              <div className="col-12 col-sm-9 col-md-10 px-0 px-sm-3">
                <p>
                  {t(
                    'We will begin with introductions; each participant will be given a tag based on their contribution to the event. Categories will include: expert, contributor, advocate, moderator, craftsperson, data collector.'
                  )}
                </p>
                <p>
                  {t(
                    'MIT FHL & CDDL will kick-off the event with an opening presentation.'
                  )}
                </p>
              </div>
            </div>
            <div className="row mb-2">
              <div className="col-12 col-sm-3 col-md-2 px-0 pb-2">
                <b>{t('Mapping Methods Discussion')}</b>
                <br />
                {t('630')}&ndash;{t('745pm')}
              </div>
              <div className="col-12 col-sm-9 col-md-10 px-0 px-sm-3">
                <p>
                  {t(
                    'Mapping Methods is an animated panel-discussion/workshop format that invites stakeholders to map their research and cooperation methods. The goal of the Mapping Methods sessions is to connect local stakeholders and investigate potential design and data-driven research methodologies that activate public space, create awareness, and inform policy-decisions.'
                  )}
                </p>
                <p>
                  {t(
                    'Three back-to back round table discussions will take place consecutively with 25 minutes dedicated to each one. Each table will include 3-4 experts, 1 moderator, and 1-2 craftspeople'
                  )}
                </p>
                <ol className={`${i18n.language}`}>
                  <li>
                    <b>
                      {t(
                        'Round Table Discussion 01 (25 min) Documenting Craftsmanship'
                      )}
                    </b>
                    <br />
                    <p className="mb-1">
                      {t(
                        'Exploring the potential of archiving and documentation as a means to stimulate a vibrant crafts culture.'
                      )}
                    </p>
                  </li>
                  <li>
                    <b>
                      {t(
                        "Round Table Discussion 02 (25 min) Legitimizing Craftsmen's Presence"
                      )}
                    </b>
                    <br />
                    <p className="mb-1">
                      {t(
                        "Advocating for the regulatory laws, crafts people's legal rights, and articulating the economic value of the crafts sector."
                      )}
                    </p>
                  </li>
                  <li>
                    <b>
                      {t(
                        'Round Table Discussion 03 (25 min) Mobilizing Crafts in Shared Spaces'
                      )}
                    </b>
                    <br />
                    <p className="mb-1">
                      {t(
                        'Leveraging the intersection of data, art, and shared space as a catalyst for craftsmanship in the city.'
                      )}
                    </p>
                  </li>
                </ol>
              </div>
            </div>
            <div className="row mb-2">
              <div className="col-12 col-sm-3 col-md-2 px-0 pb-2 mb-sm-1">
                <b>{t('Break')}</b>
                <br />
                {t('745')}&ndash;{t('800pm')}
              </div>
              <div className="col-12 col-sm-9 col-md-10 px-0 px-sm-3">
                <p>
                  {t(
                    'Data collectors will collect and scan your living heritage items.'
                  )}
                </p>
              </div>
            </div>
            <div className="row mb-2">
              <div className="col-12 col-sm-3 col-md-2 px-0 pb-2">
                <b>{t('Mapathon Discussion')}</b>
                <br />
                {t('800')}&ndash;{t('900pm')}
              </div>
              <div className="col-12 col-sm-9 col-md-10 px-0 px-sm-3">
                <p>
                  {t(
                    'Mapathons are workshops designed specifically to map new data on the existing database of craftsmanship in Beirut. The goal of the mapathon is to invite the public, as well as local photographers, craftsmen, elders, and others to grow the database of historical and current images and locations of craftsmen in Beirut. Every new finding and correction to the map will be projected and displayed in real-time.'
                  )}
                </p>
                <ul className={i18n.language}>
                  <li>
                    <p>
                      {t(
                        'Experts and participants are asked to brainstorm effective ways to use the open database within their scope of work.'
                      )}
                    </p>
                  </li>
                  <li>
                    <p>
                      {t(
                        'Guests and participants are invited to contribute to the database with their \u201cliving heritage item.\u201d'
                      )}
                    </p>
                  </li>
                </ul>
              </div>
            </div>
            <div className="row mb-2">
              <div className="col-12 col-sm-3 col-md-2 px-0 pb-2">
                <b>{t('Closing Remarks')}</b>
                <br />
                {t('900pm')}&ndash;{t('915pm')}
              </div>
              <div className="col-12 col-sm-9 col-md-10 px-0 px-sm-3">
                <p>
                  {t(
                    'MIT FHL & CDDL will conclude the event with closing remarks.'
                  )}
                </p>
              </div>
            </div>
          </div>
        </div>
        <div className="about-card col col-md-10 col-lg-8 mb-5">
          <h3 className="mb-3">
            <b>{t('Credits')}</b>
          </h3>
          <p>
            {t(
              'This project has been developed by the Massachusetts Institute of Technology (MIT); more specifically by the Civic Data Design Lab and the Future Heritage Lab. The “Living Heritage Atlas | Beirut” is supported by “Dar Group” through a 2021 seed grant that has enabled MIT faculty members to conduct research on the challenges experienced in Beirut in the aftermath of the August 2020 port explosion.'
            )}
          </p>
          <div className="row">
            <div className="col-12 col-sm-6 order-1 order-sm-1">
              <h5>
                <b>{t('Civic Data Design Lab')}</b>
              </h5>
              <p>
                {t(
                  'The MIT Civic Data Design Lab works with data to understand it for public good. We seek to develop alternative practices which can make the work we do with data and images richer, smarter, more relevant, and more responsive to the needs and interests of citizens traditionally on the margins of policy development. In this practice we experiment with and develop data visualization and collection tools that allow us to highlight urban phenomena. Our methods borrow from the traditions of science and design by using spatial analytics to expose patterns and communicating those results, through design, to new audiences.'
                )}
              </p>
            </div>
            <div className="col-12 col-sm-6 order-3 order-sm-2">
              <h5>
                <b>{t('Future Heritage Lab')}</b>
              </h5>
              <p>
                {t(
                  'The MIT Future Heritage Lab invents creative responses to conflict and crisis. We develop and implement projects and alternative educational formats at the intersection of art, culture, and preservation technology to address the emotional, cultural, and practical needs of communities in threat. We believe that culture is an essential human need, and a powerful tool to address conflicts and injustice. We build on our experience in Art, Design, and Cultural Preservation and leverage the MIT expertise in new technologies to collaborate with a global and diverse network of partners and ensure the quality and a wide reach of our work. We build future heritage by creating cultural projects on a civic scale that translate traditional crafts into new technologies, advance  knowledge transfer across borders, and have a positive impact on threatened communities.'
                )}
              </p>
            </div>
            {/* </div>
          <div className="row"> */}
            <div className="col-12 col-sm-6 order-2 order-sm-3">
              <p>
                <h5 className="mb-0">
                  <b>{t('Civic Data Design Lab Team')}</b>
                </h5>
                {t('Sarah Williams, Director')}
                <br />
                {t('Carmelo Ignaccolo, Lead Researcher & Project Manager')}
                <br />
                {t('Ashley Louie, Project Manager')}
                <br />
                {t(
                  'Enrique Casillas, Gatlen Culp, Doris Duanmu, Kelly Fang, Huiwen Shi, Wesley Woo, Rasha Zayour, Sophia Zheng'
                )}
              </p>
            </div>
            <div className="col-12 col-sm-6 order-4 order-sm-4">
              <p>
                <h5 className="mb-0">
                  <b>{t('Future Heritage Lab Team')}</b>
                </h5>
                {t('Azra Aksamija, Director')}
                <br />
                {t('Daniella Maamari, Lead Researcher')}
                <br />
                {t(
                  'Sarine Agopian, Ramzi Alieh, Ahmad Beydoun, Racha Doughman, Reem Farhat, Kamila El Khechen, ' +
                    'Raafat Majzoub, Reem Obeid, Rasha Zayour, Fatima Moussa'
                )}
              </p>
            </div>
          </div>
          <div className="row mt-5">
            <div className="col-4">
              <a
                className="d-flex flex-column justify-content-center"
                href="https://sap.mit.edu/"
                target="blank"
              >
                <img
                  className="logo w-100"
                  src="./MIT SA+P Logo.png"
                  alt="MIT School of Architecture and Planning logo"
                />
              </a>
            </div>
            <div className="col-4">
              <a
                className="d-flex justify-content-center"
                href="https://www.futureheritagelab.com/"
                target="blank"
              >
                <img
                  id="logo-fhl"
                  src="./FHL Logo.png"
                  alt="MIT Future Heritage Lab logo"
                />
              </a>
            </div>
            <div className="col-4">
              <a href="https://civicdatadesignlab.mit.edu/" target="blank">
                <img
                  className="logo w-100"
                  src="./CDDL Logo.png"
                  alt="MIT Civic Data Design Lab logo"
                />
              </a>
            </div>
          </div>
        </div>
        {/* close about card */}
      </div>
    </>
  );
};

export default About;
