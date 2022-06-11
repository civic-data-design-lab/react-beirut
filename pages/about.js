import Head from 'next/head';

const About = () => {
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
              About the Living Heritage Atlas&ensp;|&ensp;Beirut.
            </p>
          </div>
        </div>
        <hr />
        <div className="about-card col col-md-10 col-lg-8">
          <p>Living Heritage Atlas&ensp;|&ensp;Beirut is a design-based research project that contributes to urban planning discussion on Beirut's heritage by rendering visible the often unrecognized social heritage of craftsmanship &mdash; with its crafts, public spaces, and local knowledge</p>
          <p>This project has been developed by the Massachusetts Insitute of Technology (MIT) Civic Data Design Lab (CDDL) and Future Heritage Lab (FHL). Living Heritage Atlas&ensp;|&ensp;Beirut recognizes that craftspeople are an exponentially marginalized and vulnerable group of individuals, operating at the intersection of heritage, the infrastructure of making, and the local economies at different urban scales.</p>
          <p></p>
        </div>
        <div className="about-card mb-5">
          <h3 className="mb-4">Program Schedule</h3>
          <div className="">
            <div className="row">
              <div className="col-2 p-2 t-1"><b>Date</b></div>
              <div className="col-10 row">
                <div className="col-3 p-2 t-1"><h5><b>Thursday, June 23</b></h5></div>
                <div className="col-3 p-2 t-1"><h5><b>Friday, June 24</b></h5></div>
                <div className="col-3 p-2 t-1"><h5><b>Saturday, June 25</b></h5></div>
                <div className="col-3 p-2 t-1"><h5><b>Sunday, June 26</b></h5></div>
              </div>
            </div>
            <div className="row">
              <div className="col-2 p-2 t-2"><b>Location</b></div>
              <div className="col-10 row">
                <div className="col-3 p-2 t-2">
                  <h6><b>Downtown Beirut Souks</b></h6><hr/>
                  <p className="mb-0">Exact location TBD</p>
                </div>
                <div className="col-3 p-2 t-2">
                  <h6><b>Gemmayze</b></h6><hr/>
                  <p className="mb-0">Exact location TBD</p>
                </div>
                <div className="col-3 p-2 t-2">
                  <h6><b>Bourj Hammoud</b></h6><hr/>
                  <p className="mb-0">Exact location TBD</p>
                </div>
                <div className="col-3 p-2 t-2">
                  <h6><b>Mar Mikhail</b></h6><hr/>
                  <p className="mb-0">Exact location TBD</p>
                </div>
              </div>
            </div>
            <div className="row">
              <div className="col-2 p-2 t-3"><b>11:00am&ndash;1:00pm</b></div>
              <div className="col-10 row">
                <div className="offset-3 col-3 p-2 t-3">
                  <h6><b>Craft Workshops Tour</b></h6><hr/>
                  <p className="mb-0">Intimate tour of 3&ndash;4 craft workshops in the Gemmayze and Mar Mikhail area</p>  
                </div>
                <div className="col-3 p-2 t-3">
                  <h6><b>Craft Workshops Tour</b></h6><hr/>
                  <p className="mb-0">Intimate tour of 3&ndash;4 craft workshops in the Bourj Hammoud area</p>  
                </div>
              </div>
            </div>
            <div className="row">
              <div className="col-2 p-2 t-4"><b>5:00pm&ndash;5:30pm</b></div>
              <div className="col-10 row">
                <div className="col-3 p-2 t-4">
                  <h6><b>Opening Presentation by MIT FHL & CDDL</b></h6><hr/>
                  <p>Presentation of the research, collected data, website, and ways to contribute to the growing database of craftsmanship</p>
                </div>
              </div>
            </div>
            <div className="row">
              <div className="col-2 p-2 t-5"><b>5:30pm&ndash;7:00pm</b></div>
              <div className="col-10 row">
                <div className="col-3 p-2 t-5">
                  <h6><b>Archival Crafts Tour</b>&ensp;|&ensp;Downtown</h6><hr/>
                  <p>Tour of the old souks with the cart, while projecting archival images of the old craft workshops on closed shopfronts (pending approval)</p>
                </div>
                <div className="offset-3 col-3 p-2 t-5">
                  <h6><b>Archival Crafts Tour</b>&ensp;|&ensp;Bourj Hammoud</h6><hr/>
                  <p>Tour of the streets of Bourj Hammoud with the cart, while projecting archival images of the old craft workshops on closed shopfronts (pending approval)</p>
                </div>
              </div>
            </div>
            <div className="row">
              <div className="col-2 p-2 t-6"><b>7:00pm&ndash;7:30pm</b></div>
              <div className="col-10 p-2 t-6">
                <h6><b>Craft Stories</b></h6><hr/>
                <p>An elder, historian, or storyteller narrates their unique perspective on the history of markets and crafts in Beirut</p>
              </div>
            </div>
            <div className="row">
            <div className="col-2 p-2 t-7"><b>7:30pm&ndash;9:00pm</b></div>
              <div className="col-10 px-0">
                <div className="p-2 t-7">
                  <h6><b>Living Heritage Atlas&ensp;|&ensp;Mapping Beirut's Craftsmanship</b></h6>
                </div>
                <div className="p-2 t-7">
                  <h6><b>Part I&ensp;|&ensp;Mapping Methods</b></h6><hr/>
                  <p>Mapping Methods (MM) are an animated panel-discussion/workshop format, which invites stakeholders to map their research and cooperation methods. The goal of the MM sessions is to connect local stakeholders and investigate potential design and data-driven research methodologies that activate public space, create awareness, and inform policy decisions.</p><hr/>
                  <div className="row">
                    <div className="col-3 border-right">
                      <p><b>Reconstructing Beirut's Heritage</b></p>
                      <p>Understanding the role of the craftspeople and their involvement in Beirut's post-blast reconstruction process</p>
                    </div>
                    <div className="col-3 border-right">
                      <p><b>Documenting Craftsmanship</b></p>
                      <p>Exploring hte potential of archiving and documentation as a means to stimulate a vibrant crafts culture</p>
                    </div>
                    <div className="col-3 border-right">
                      <p><b>Legitimizing Craftspeople's Presence</b></p>
                      <p>Advocating for the regulatory laws, craftspeople's legal rights, and articulating th eeconomic value of the crafts sector</p>
                    </div>
                    <div className="col-3">
                      <p><b>Mobilizing Crafts in Shared Spaces</b></p>
                      <p>Leveraging hte intersection of data, art, and shared space as a catalyst for craftsmanship in the city</p>
                    </div>
                  </div>
                </div>
                <div className="p-2 t-7">
                  <h6><b>Part II&ensp;|&ensp;Mapathon</b></h6><hr/>
                  <p>Mapathons are workshops designed specifically to map new data in the database of craftsmanship in Beirut. The goal of the mapathon is to invite the public, as well as local photographers, craftspeople, elders, and others to grow the database of historical and current images and locations of craftspeople in Beirut. The geographic focus of every mapathon will be determined by our location on the day of the mapathon. Every new finding and correction to the map will be projected and displayed in real-time.</p><hr/>
                  <div className="row">
                    <div className="col-3 border-right">
                      <p><b>Downtown Beirut Mapathon</b></p>
                    </div>
                    <div className="col-3 border-right">
                      <p><b>Gemmayze Mapathon</b></p>
                    </div>
                    <div className="col-3 border-right">
                      <p><b>Bourj Hammoud Mapathon</b></p>
                    </div>
                    <div className="col-3">
                      <p><b>Mar Mikhail Mapathon</b></p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default About;
