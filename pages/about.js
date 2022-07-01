import Head from 'next/head';
import Schedule from '../components/about/schedule';
import {useTranslation} from "next-i18next";

const About = ({i18n}) => {
  const {t} = useTranslation()
  return (
    <>
      <Head>
        <title>About | Living Heritage Atlas</title>
      </Head>
      <div className="container">
        <div className="title-card">
          <div className="text-container">
            <h1>{t('About')}</h1>
            <p>
              {t('Mapping and activating Beirut\'s living heritage of craftsmanship')}
            </p>
          </div>
        </div>
        <hr />
        <div className="about-card col col-md-10 col-lg-8">

          <p className="fs-5 lh-sm"><b><em>{t('Living Heritage Atlas')} | {t('Beirut')}</em></b> {t('is a design-based research project that contributes to urban planning discussion on Beirut\'s heritage by rendering visible the often unrecognized social heritage of craftsmanship')} &mdash; {t('with its crafts, public spaces, and local knowledge')}</p>
          <p className="fs-5 lh-sm">{t('This project has been developed by the Massachusetts Insitute of Technology (MIT) Civic Data Design Lab (CDDL) and Future Heritage Lab (FHL). Living Heritage Atlas&ensp;|&ensp;Beirut recognizes that craftspeople are an exponentially marginalized and vulnerable group of individuals, operating at the intersection of heritage, the infrastructure of making, and the local economies at different urban scales.')}</p>

          <p></p>
        </div>
        <div className="about-card">
            <h3 className="mb-4"><b>{t('Program Schedule')}</b></h3>
            <p>Register to attend <em>Living Heritage Atlas | Beirut</em> events via the <a href="https://ihjoz.com/companies/1887" target="_blank">Ijhoz event webpage</a></p>
            <Schedule i18n={i18n} />
        </div>
        <div className="about-card col col-md-10 col-lg-8">
          <h3 className="mb-3"><b>{t('Living Heritage Atlas')}&ensp;|&ensp;{t('Mapping Beirut\'s Craftsmanship Event')}</b></h3>
          <p className="mb-0"><b>{t('Featured Event:')}</b>&emsp;{t('Two-hour roundtable discussion and mapping event')}</p>
          <p className="mb-0"><b>{t('Date:')}</b>&emsp;{t('Thursday, July 7, 2022')}</p>
          <p className="mb-0"><b>{t('Time:')}</b>&emsp;{t('6:00')}&ndash;{t('9:00pm')}</p>
          <p><b>{t('Location:')}</b>&emsp;{t('Abroyan Factor &mdash; Emile Eddeh Street, Bouj Hammoud, Beirut')}</p>
          <p><b>Register:</b>&emsp;RSVP your attendance in advanced via the <a href="https://ihjoz.com/companies/1887" target="_blank">Ijhoz event webpage</a></p>
          <p>{t('Discussion during this event will primary be conducted in English; if you prefer to converse in Arabic, there will be a person at each table ready to help translate to and from Arabic and English as needed.')}</p>
          <div className="t-event container-fluid mt-4">
            <div className="row mb-2">
              <div className="col-12 col-sm-3 col-md-2 px-0 pb-2"><b>{t('Pre-Opening')}</b></div>
              <div className="col-12 col-sm-9 col-md-10 px-0 px-sm-3">
                <p>The <a href="https://www.futureheritagelab.com/" target="blank">MIT Future Heritage Lab</a> (FHL) and <a href="https://civicdatadesignlab.mit.edu/" target="blank">MIT Civic Data Design Lab</a> (CDDL) will present the <i>digital archive</i> of geolocated historic data and images using visual and textual materials from local archives, residents, and craftspeople in Beirut.</p>
                <p class="mb-1"><b>{t('Bring a living heritage item!')}</b></p>
                <p>{t('Invitees and guests are asked to bring with them a living heritage item to contribute to the')} <em>{t('Living Heritage Atlas')}</em>. {t('We define this element as a photograph, plan, map, guidebook, newspaper clipping, or artifact related to the past or present presence of crafts and craftsmanship in Beirut. All items will be scanned by our data collectors and returned by the end of the event')}</p>
              </div>
            </div>
            <div className="row mb-2">
              <div className="col-12 col-sm-3 col-md-2 px-0 pb-2"><b>{t('Opening Remarks')}</b><br/>{t('6:00')}&ndash;{t('6:30pm')}</div>
              <div className="col-12 col-sm-9 col-md-10 px-0 px-sm-3">
                <p>{t('We will begin with introductions; each participant will be given a tag based on their contribution to the event. Categories will include: expert, contributor, advocate, moderator, craftsperson, data collector.')}</p>
                <p>{t('MIT FHL & CDDL will kick-off the event with an opening presentation.')}</p>
              </div>
            </div>
            <div className="row mb-2">
              <div className="col-12 col-sm-3 col-md-2 px-0 pb-2"><b>{t('Mapping Methods Discussion')}</b><br/>{t('6:30')}&ndash;{t('7:00pm')}</div>
              <div className="col-12 col-sm-9 col-md-10 px-0 px-sm-3">
                <p>{t('Mapping Methods is an animated panel-discussion and workshop format, which invites stakeholders to map their research and cooperation methods. The goal of the Mapping Methods session is to connect local stakeholders and to investigate potential design and data-driven research methodologies that activate public space, create awareness, and inform policy decisions.')}</p>
                <p>{t('We will divide into sub-groups to focus the discussion on three main topics: Documenting Craftsmanship, Legitimizing Craftspeople\'s Presence, and Mobilizing Crafts in Shared Spaces. Participants in each group will be asked to share their methods and to articulate different approaches to preserve living heritage. The moderator at each table will lead the discussion and report summarized findings at the end of the discussion. Experts will be guided to one of three tables based on their area of expertise. Discussion sub-groups:')}</p>
                <ol className={`groups ` + i18n.language}>
                  <li>
                    <b>{t('Documenting Craftsmanship')}</b><br/>
                    <p className="mb-1">{t('Explore the potential of archiving and documentation as a means to stimulate a vibrant crafts culture')}</p>
                  </li>
                  <li>
                    <b>{t('Legitimizing Craftspeople\'s Presence')}</b><br/>
                    <p className="mb-1">{t('Advocate for regulatory laws, craftspeople\'s legal rights, and articulate the economic value of the crafts sector')}</p>
                  </li>
                  <li>
                    <b>{t('Mobilizing Crafts in Shared Spaces')}</b><br/>
                    <p className="mb-1">{t('Leverage the intersection of data, art, and shared spaces as a catalyst for craftsmanship in Beirut')}</p>
                  </li>
                </ol>
              </div>
            </div>
            <div className="row mb-2">
              <div className="col-12 col-sm-3 col-md-2 px-0 pb-2 mb-sm-1"><b>{t('Break')}</b><br/>{t('7:00')}&ndash;{t('7:15pm')}</div>
              <div className="col-12 col-sm-9 col-md-10 px-0 px-sm-3">
                <p>{t('Data collectorrs will collect and scan your living heritage items.')}</p>
              </div>
            </div>
            <div className="row mb-2">
              <div className="col-12 col-sm-3 col-md-2 px-0 pb-2"><b>{t('Mapathon Discussion')}</b><br/>{t('7:15')}&ndash;{t('7:45pm')}</div>
              <div className="col-12 col-sm-9 col-md-10 px-0 px-sm-3">
                <p>{t('The Mapathon workshop  will focus on mapping and adding new data to the')} <em>{t('Living Heritage Atlas')}</em> {t('database of craftsmanship in Beirut. The goal of the mapathon is to invite the local craftspeople, elders, photographers, and the public to expand the database of historical and current images and locations of craftsmanship in Beirut. Each new finding and correction to the map will be projected and displayed in real-time.')}</p>
                <p>{t('We will stay in the same sub-groups listed above. Participants in each group will be asked to brainstorm effective ways to use the open source database within the focus of each discussion theme. The moderator at each table will lead the discussion and report summarized findings at the end of the discussion.')}</p>
              </div>
            </div>
            <div className="row mb-2">
              <div className="col-12 col-sm-3 col-md-2 px-0 pb-2"><b>{t('Closing Remarks')}</b><br/>{t('7:45')}&ndash;{t('8:00pm')}</div>
              <div className="col-12 col-sm-9 col-md-10 px-0 px-sm-3">
                <p>{t('MIT FHL & CDDL will conclude the event with closing remarks.')}</p>
              </div>
            </div>
          </div>
        </div>
        <div className="about-card col col-md-10 col-lg-8 mb-5">
          <h3 className="mb-3"><b>{t('Credits')}</b></h3>
          <p>{t('This project has been developed by the Massachusetts Institute of Technology (MIT); more specifically by the Civic Data Design Lab and the Future Heritage Lab.')} <em>{t('Living Heritage Atlas | Beirut')}</em> {t('is supported by “Dar Group” through a 2021 seed grant that enabled MIT faculty members to conduct research on the challenges experienced in Beirut in the aftermath of the August 2020 port explosion.')}</p>
          <div className="row">
            <div className="col-12 col-sm-6 order-1 order-sm-1">
              <h5><b>{t('Future Heritage Lab')}</b></h5>
              <p>{t('The MIT Future Heritage Lab invents creative responses to conflict and crisis. We develop and implement projects and alternative educational formats at the intersection of art, culture, and preservation technology to address the emotional, cultural, and practical needs of communities in threat. We believe that culture is an essential human need, and a powerful tool to address conflicts and injustice. We build on our experience in Art, Design, and Cultural Preservation and leverage the MIT expertise in new technologies to collaborate with a global and diverse network of partners and ensure the quality and a wide reach of our work. We build future heritage by creating cultural projects on a civic scale that translate traditional crafts into new technologies, advance  knowledge transfer across borders, and have a positive impact on threatened communities.')}</p>
            </div>
            <div className="col-12 col-sm-6 order-3 order-sm-2">
              <h5><b>{t('Civic Data Design Lab')}</b></h5>
              <p>{t('The MIT Civic Data Design Lab works with data to understand it for public good. We seek to develop alternative practices which can make the work we do with data and images richer, smarter, more relevant, and more responsive to the needs and interests of citizens traditionally on the margins of policy development. In this practice we experiment with and develop data visualization and collection tools that allow us to highlight urban phenomena. Our methods borrow from the traditions of science and design by using spatial analytics to expose patterns and communicating those results, through design, to new audiences.')}</p>
            </div>
          {/* </div>
          <div className="row"> */}
            <div className="col-12 col-sm-6 order-2 order-sm-3">
              <p>
                <h5 className="mb-0"><b>{t('Future Heritage Lab Team')}</b></h5>
                {t('Azra Aksamija, Director')}<br/>
                {t('Daniella Maamari, Lead Researcher')}<br/>
                Sarine Agopian, Ramzi Alieh, Ahmad Beydoun, Racha Doughman, Reem Farhat, Kamila El Khechen, Raafat Majzoub, Reem Obeid, Rasha Zayour
              </p>
            </div>
            <div className="col-12 col-sm-6 order-4 order-sm-4">
              <p>
                <h5 className="mb-0"><b>{t('Civic Data Design Lab Team')}</b></h5>
                {t('Sarah Williams, Director')}<br/>
                {t('Carmelo Ignaccolo, Lead Researcher & Project Manager')}<br/>
                {t('Ashley Louie, Project Manager')}<br/>
                Enrique Casillas, Gatlen Culp, Doris Duanmu, Kelly Fang, Huiwen Shi, Wesley Woo, Sophia Zheng
              </p>
            </div>
          </div>
          <div className="row mt-5">
            <div className="col-4">
              <a className="d-flex flex-column justify-content-center" href="https://sap.mit.edu/" target="blank">
                <img className="logo w-100" src="./MIT SA+P Logo.png" alt="MIT School of Architecture and Planning logo"/>
              </a>
            </div>
            <div className="col-4">
              <a className="d-flex justify-content-center" href="https://www.futureheritagelab.com/" target="blank">
                <img id="logo-fhl" src="./FHL Logo.png" alt="MIT Future Heritage Lab logo"/></a>
            </div>
            <div className="col-4">
              <a href="https://civicdatadesignlab.mit.edu/" target="blank">
                <img className="logo w-100" src="./CDDL Logo.png" alt="MIT Civic Data Design Lab logo"/></a>
            </div>
            
          </div>
        </div>{/* close about card */}
      </div>
    </>
  );
};

export default About;
