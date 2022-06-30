import { useMediaQuery } from 'react-responsive';

const Mobile = ({ children }) => {
  const isMobile = useMediaQuery({ maxWidth: 575 }) // bootstrap XS breakpoint
  return isMobile ? children : null
}
const Default = ({ children }) => {
  const isNotMobile = useMediaQuery({ minWidth: 576 }) // bootstrap s or larger breakpoint
  return isNotMobile ? children : null
}

const Schedule = ({i18n}) => {
  return (
    <>
    <Default>
      <div className="container-fluid">
        <div className="row">
          <div className="col-2 p-2 t-1"><b>Date</b></div>
          <div className="col-10">
            <div className="row">
              <div className="col-3 p-2 t-1"><h6 class="mb-0"><b>Tuesday, July 5</b></h6></div>
              <div className="col-lg-1 p-2 t-1"><h6 class="mb-0"><b>Wed</b></h6></div>
              <div className="col-6 col-lg-5 p-2 t-1"><h6 class="mb-0"><b>Thursday, July 7</b></h6></div>
              <div className="col-3 p-2 t-1"><h6 class="mb-0"><b>Friday, July 8</b></h6></div>
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
              <div className="col-6"></div>
              <div className="col-3 p-2 t-3">
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
    </Default>

    <Mobile>
      <div className="container-fluid">
        <div className="row">
          <h6 class="mb-0 p-2 t-1"><b>Tuesday, July 5</b></h6>
        </div>
        <div className="row">
          <div className="col-3 p-2 t-3"><b>2:00&ndash;4:00pm</b></div>
          <div className="col-9 p-2 t-3">
            <h6><b>Craft Workshops Tour</b>&ensp;|&ensp;Gemmayze&ndash;Mar Mikhael</h6><hr/>
            <p className="mb-0">Intimate walking tour of 3&ndash;4 craft workshops in the Gemmayze and Mar Mikhael area</p>
          </div>
        </div>
        <div className="row">
          <div className="col-3 p-2 t-5"><b>6:00&ndash;8:00pm</b></div>
          <div className="col-9 p-2 t-5">
            <h6><b>Archival Crafts Tour</b>&ensp;|&ensp;Al Balad</h6><hr/>
            <p>Walking tour of locations of old craft workshops and souks in Al Balad</p>
          </div>
        </div>{/* close tuesday */}

        <div className="row mt-3">
          <h6 class="mb-0 p-2 t-1"><b>Thursday, July 7</b></h6>
        </div>
        <div className="row">
          <div className="col-3 p-2 t-5"><b>6:00&ndash;8:00pm</b></div>
          <div className="col-9 p-2 t-5">
            <h6><b>Living Heritage Atlas&ensp;|&ensp;Mapping Beirut's Craftsmanship</b></h6><hr/>
            <ol className={i18n.language}>
              <li>Opening Remarks by MIT FHL & CDDL</li>
              <li>Mapping Methods Discussion</li>
              <li>Mapathon Discussion</li>
              <li>Closing Remarks</li>
            </ol>
          </div>
        </div>{/* close thursday */}

        <div className="row mt-3">
          <h6 class="mb-0 p-2 t-1"><b>Friday, July 8</b></h6>
        </div>
        <div className="row">
          <div className="col-3 p-2 t-3"><b>2:00&ndash;4:00pm</b></div>
          <div className="col-9 p-2 t-3">
            <h6><b>Craft Workshops Tour</b>&ensp;|&ensp;Bourj Hammoud</h6><hr/>
            <p className="mb-0">Intimate walking tour of 3&ndash;4 craft workshops in the Bourj Hammoud area</p>
          </div>
        </div>
        <div className="row">
          <div className="col-3 p-2 t-5"><b>6:00&ndash;8:00pm</b></div>
          <div className="col-9 p-2 t-5">
            <h6><b>Archival Crafts Tour</b>&ensp;|&ensp;Bourj Hammoud</h6><hr/>
            <p>Walking tour of locations of old craft workshops and souks in Bourj Hammoud</p>
          </div>
        </div>{/* close friday */}
      </div>
    </Mobile>
    </>
  )
};

export default Schedule;