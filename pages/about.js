import Head from 'next/head';

const About = ({i18n}) => {
  return (
    <>
      <Head>
        <title>About | Living Heritage Atlas</title>
      </Head>
      <div className="container">
        <div className="title-card">
          <div className="text-container">
            <h1>ABOUT</h1>
            <p>
              Mapping and activating Beirut's living heritage of craftsmanship
            </p>
          </div>
        </div>
        <hr />
        <div className="about-card col col-md-10 col-lg-8">
          <p>Living Heritage Atlas&ensp;|&ensp;Beirut is a design-based research project that contributes to urban planning discussion on Beirut's heritage by rendering visible the often unrecognized social heritage of craftsmanship &mdash; with its crafts, public spaces, and local knowledge</p>
          <p>This project has been developed by the Massachusetts Insitute of Technology (MIT) Civic Data Design Lab (CDDL) and Future Heritage Lab (FHL). Living Heritage Atlas&ensp;|&ensp;Beirut recognizes that craftspeople are an exponentially marginalized and vulnerable group of individuals, operating at the intersection of heritage, the infrastructure of making, and the local economies at different urban scales.</p>
          <p></p>
        </div>
        <div className="about-card">
          <h3 className="mb-4"><b>Program Schedule</b></h3>
          <div className="container-fluid">
            <div className="row">
              <div className="col-2 p-2 t-1"><b>Date</b></div>
              <div className="col-10">
                <div className="row">
                  <div className="col-3 p-2 t-1"><h5 class="mb-0"><b>Tuesday, July 5</b></h5></div>
                  <div className="col-lg-1 p-2 t-1"><h5 class="mb-0"><b>Wed</b></h5></div>
                  <div className="col-6 col-lg-5 p-2 t-1"><h5 class="mb-0"><b>Thursday, July 7</b></h5></div>
                  <div className="col-3 p-2 t-1"><h5 class="mb-0"><b>Friday, July 8</b></h5></div>
                </div>
              </div>
            </div>
            <div className="row">
              <div className="col-2 p-2 t-3"><b>2:00&ndash;4:00pm</b></div>
              <div className="col-10">
                <div className="row">
                  <div className="col-3 p-2 t-3">
                    <h6><b>Craft Workshops Tour</b>&ensp;|&ensp;Gemmayze&ndash;Mar Mikhael</h6><hr/>
                    <p className="mb-0">Intimate walking tour of 3&ndash;4 craft workshops in the Gemmayze and Mar Mikhael area</p>
                  </div>
                  <div className="offset-6 col-3 p-2 t-3">
                  <h6><b>Craft Workshops Tour</b>&ensp;|&ensp;Bourj Hammoud</h6><hr/>
                    <p className="mb-0">Intimate walking tour of 3&ndash;4 craft workshops in the Bourj Hammoud area</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="row">
              <div className="col-2 p-2 t-5"><b>6:00&ndash;8:00pm</b></div>
              <div className="col-10">
                <div className="row">
                  <div className="col-3 p-2 t-5">
                    <h6><b>Archival Crafts Tour</b>&ensp;|&ensp;Al Balad</h6><hr/>
                    <p>Walking tour of locations of old craft workshops and souks in Al Balad</p>
                  </div>
                  <div className="col-lg-1 p-2">
                    <p className="text-center">No events</p>
                  </div>
                  <div className="col-6 col-lg-5 p-2 t-7">
                    <h6><b>Living Heritage Atlas&ensp;|&ensp;Mapping Beirut's Craftsmanship</b></h6><hr/>
                    <ol className={i18n.language}>
                      <li>Opening Remarks by MIT FHL & CDDL</li>
                      <li>Mapping Methods Discussion</li>
                      <li>Mapathon Discussion</li>
                      <li>Closing Remarks</li>
                    </ol>
                  </div>
                  <div className="col-3 p-2 t-5">
                    <h6><b>Archival Crafts Tour</b>&ensp;|&ensp;Bourj Hammoud</h6><hr/>
                    <p>Walking tour of locations of old craft workshops and souks in Bourj Hammoud</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="about-card col col-md-10 col-lg-8">
          <h3 className="mb-3"><b>Living Heritage Atlas&ensp;|&ensp;Mapping Beirut's Craftsmanship Event</b></h3>
          <p className="mb-0"><b>Featured Event:</b>&emsp;Two-hour roundtable discussion and mapping event</p>
          <p className="mb-0"><b>Date:</b>&emsp;Thursday, July 7, 2022</p>
          <p className="mb-0"><b>Time:</b>&emsp;6:00&ndash;8:00pm</p>
          <p className="mb-0"><b>Location:</b>&emsp;Venue TBD</p>
          <p>Discussion during this event will primary be conducted in English; if you prefer to converse in Arabic, there will be a person at each table ready to help translate to and from Arabic and English as needed.</p>
          <div className="t-event container-fluid mt-4">
            <div className="row mb-2">
              <div className="col-2 px-0"><b>Pre-Opening</b></div>
              <div className="col-10">
                <p>The <a href="https://www.futureheritagelab.com/" target="blank">MIT Future Heritage Lab</a> (FHL) and <a href="https://civicdatadesignlab.mit.edu/" target="blank">MIT Civic Data Design Lab</a> (CDDL) will present the <i>digital archive</i> of geolocated historic data and images using visual and textual materials from local archives, residents, and craftspeople in Beirut.</p>
                <p class="mb-1"><b>Bring a living heritage item!</b></p>
                <p>Invitees and guests are asked to bring with them a living heritage item to contribute to the Living Heritage Atlas. We define this element as a photograph, plan, map, guidebook, newspaper clipping, or artifact related to the past or present presence of crafts and craftsmanship in Beirut. All items will be scanned by our data collectors and returned by the end of the event</p>
              </div>
            </div>
            <div className="row mb-2">
              <div className="col-2 px-0"><b>Opening Remarks</b><br/>6:00&ndash;6:30pm</div>
              <div className="col-10">
                <p>We will begin with introductions; each participant will be given a tag based on their contribution to the event. Categories will include: expert, contributor, advocate, moderator, craftsperson, data collector.</p>
                <p>MIT FHL & CDDL will kick-off the event with an opening presentation.</p>
              </div>
            </div>
            <div className="row mb-2">
              <div className="col-2 px-0"><b>Mapping Methods Discussion</b><br/>6:30&ndash;7:00pm</div>
              <div className="col-10">
                <p>Mapping Methods is an animated panel-discussion and workshop format, which invites stakeholders to map their research and cooperation methods. The goal of the Mapping Methods session is to connect local stakeholders and to investigate potential design and data-driven research methodologies that activate public space, create awareness, and inform policy decisions.</p>
                <p>We will divide into sub-groups to focus the discussion on three main topics: Documenting Craftsmanship, Legitimizing Craftspeople's Presence, and Mobilizing Crafts in Shared Spaces. Participants in each group will be asked to share their methods and to articulate different approaches to preserve living heritage. The moderator at each table will lead the discussion and report summarized findings at the end of the discussion. Experts will be guided to one of three tables based on their area of expertise. Discussion sub-groups:</p>
                <ol className={`groups ` + i18n.language}>
                  <li>
                    <h6 className="mb-0"><b>Documenting Craftsmanship</b></h6>
                    <p className="mb-1">Explore the potential of archiving and documentation as a means to stimulate a vibrant crafts culture</p>
                  </li>
                  <li>
                    <h6 className="mb-0"><b>Legitimizing Craftspeople's Presence</b></h6>
                    <p className="mb-1">Advocate for regulatory laws, craftspeople's legal rights, and articulate the economic value of the crafts sector</p>
                  </li>
                  <li>
                    <h6 className="mb-0"><b>Mobilizing Crafts in Shared Spaces</b></h6>
                    <p className="mb-1">Leverage the intersection of data, art, and shared spaces as a catalyst for craftsmanship in Beirut</p>
                  </li>
                </ol>
              </div>
            </div>
            <div className="row mb-2">
              <div className="col-2 px-0 mb-3"><b>Break</b><br/>7:00&ndash;7:15pm</div>
              <div className="col-10">
                <p>Data collectorrs will collect and scan your living heritage items.</p>
              </div>
            </div>
            <div className="row mb-2">
              <div className="col-2 px-0"><b>Mapathon Discussion</b><br/>7:15&ndash;7:45pm</div>
              <div className="col-10">
                <p>The Mapathon workshop  will focus on mapping and adding new data to the Living Heritage Atlas database of craftsmanship in Beirut. The goal of the mapathon is to invite the local craftspeople, elders, photographers, and the public to expand the database of historical and current images and locations of craftsmanship in Beirut. Each new finding and correction to the map will be projected and displayed in real-time.</p>
                <p>We will stay in the same sub-groups listed above. Participants in each group will be asked to brainstorm effective ways to use the open source database within the focus of each discussion theme. The moderator at each table will lead the discussion and report summarized findings at the end of the discussion.</p>
              </div>
            </div>
            <div className="row mb-2">
              <div className="col-2 px-0"><b>Closing Remarks</b><br/>7:45&ndash;8:00pm</div>
              <div className="col-10">
                <p>MIT FHL & CDDL will conclude the event with closing remarks.</p>
              </div>
            </div>
          </div>
        </div>
        <div className="about-card col col-md-10 col-lg-8 mb-5">
          <h3 className="mb-3"><b>Credits</b></h3>
          <p>This project has been developed by the Massachusetts Institute of Technology (MIT); more specifically by the Civic Data Design Lab and the Future Heritage Lab. The “Intangible Heritage Atlas | Crafts” is supported by “Dar Group” through a 2021 seed grant that enabled MIT faculty members to conduct research on the challenges experienced in Beirut in the aftermath of the August 2020 port explosion.</p>
          <div className="row">
            <div className="col">
              <h5><b>Future Heritage Lab</b></h5>
              <p>The MIT Future Heritage Lab invents creative responses to conflict and crisis. We develop and implement projects and alternative educational formats at the intersection of art, culture, and preservation technology to address the emotional, cultural, and practical needs of communities in threat. We believe that culture is an essential human need, and a powerful tool to address conflicts and injustice. We build on our experience in Art, Design, and Cultural Preservation and leverage the MIT expertise in new technologies to collaborate with a global and diverse network of partners and ensure the quality and a wide reach of our work. We build future heritage by creating cultural projects on a civic scale that translate traditional crafts into new technologies, advance  knowledge transfer across borders, and have a positive impact on threatened communities.</p>
            </div>
            <div className="col">
              <h5><b>Civic Data Design Lab</b></h5>
              <p>The Civic Data Design Lab works with data to understand it for public good. We seek to develop alternative practices which can make the work we do with data and images richer, smarter, more relevant, and more responsive to the needs and interests of citizens traditionally on the margins of policy development. In this practice we experiment with and develop data visualization and collection tools that allow us to highlight urban phenomena. Our methods borrow from the traditions of science and design by using spatial analytics to expose patterns and communicating those results, through design, to new audiences.</p>
            </div>
          </div>
          <div className="row">
            <div className="col">
              <p>
                <h5 className="mb-0"><b>Future Heritage Lab Team</b></h5>
                Azra Aksamija, Director<br/>
                Daniella Maamari, Lead Researcher<br/>
                Sarine Agopian, Ramzi Alieh, Ahmad Beydoun, Racha Doughman, Reem Farhat, Kamila El Khechen, Raafat Majzoub, Reem Obeid, Rasha Zayour
              </p>
            </div>
            <div className="col">
              <p>
                <h5 className="mb-0"><b>Civic Data Design Lab Team</b></h5>
                Sarah Williams, Director<br/>
                Carmelo Ignaccolo, Lead Researcher & Project Manager<br/>
                Ashley Louie, Project Manager<br/>
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
