import { useMediaQuery } from 'react-responsive';

const Mobile = ({ children }) => {
  const isMobile = useMediaQuery({ maxWidth: 575 }) // bootstrap XS breakpoint
  return isMobile ? children : null
}
const Default = ({ children }) => {
  const isNotMobile = useMediaQuery({ minWidth: 576 }) // bootstrap s or larger breakpoint
  return isNotMobile ? children : null
}

import {useTranslation} from "next-i18next";

const Schedule = ({i18n}) => {
  const { t } = useTranslation();
  return (
    <>
    <Default>
      <div className="container-fluid">
        <div className="row">
          <div className="col-2 p-2 t-1"><b>{t('Date')}</b></div>
          <div className="col-10">
            <div className="row">
              <div className="col-3 p-2 t-1"><h6 class="mb-0"><b>{t('Tuesday, July 5')}</b></h6></div>
              <div className="col-lg-1 p-2 t-1"><h6 class="mb-0"><b>{t('Wed')}</b></h6></div>
              <div className="col-6 col-lg-5 p-2 t-1"><h6 class="mb-0"><b>{t('Thursday, July 7')}</b></h6></div>
              <div className="col-3 p-2 t-1"><h6 class="mb-0"><b>{t('Friday, July 8')}</b></h6></div>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-2 p-2 t-3"><b>{t('200')}&ndash;{t('400pm')}</b></div>
          <div className="col-10">
            <div className="row">
              <div className="col-3 p-2 t-3">
                <h6><b>{t('Crafts Workshops Tour')}</b>&ensp;|&ensp;{t('Gemmayze - Mar Mikhael (Doniguian Armenian bookstore)')}</h6><hr/>
                <p className="mb-0">{t('Intimate walking tour of 3-4 craft workshops in the Gemmayze and Mar Mikhael area')}</p>
              </div>
              <div className="col-6"></div>
              <div className="col-3 p-2 t-3">
                <h6><b>{t('Crafts Workshops Tour')}</b>&ensp;|&ensp;{t('Bourj Hammoud')}</h6><hr/>
                <p className="mb-0">{t('Intimate walking tour of 3-4 craft workshops in the Bourj Hammoud area')}</p>
              </div>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-2 p-2 t-5"><b>{t('600')}&ndash;{t('800pm')}</b></div>
          <div className="col-10">
            <div className="row">
              <div className="col-3 p-2 t-5">
                <h6><b>{t('Archival Workshops Tour')}</b>&ensp;|&ensp;{t('Al Balad (Samir Kassir Square)')}</h6><hr/>
                <p>{t('Walking tour of the locations of the old craft workshops and souks in Al Balad')}</p>
              </div>
              <div className="col-lg-1 p-2">
                <p className="text-center">{t('No events')}</p>
              </div>
              <div className="col-6 col-lg-5 p-2 t-7">
                <h6><b>{t('Living Heritage Atlas Event')}</b> {t('(Abroyan Factory, Bourj Hammoud)')}</h6><hr/>
                <ol className={i18n.language}>
                  <li>{t('Opening remarks by MIT CDDL & FHL (6:00 - 6:30 PM)')}</li>
                  <li>{t('Mapping methods, 3 roundtable discussions (6:30 - 7:45 PM)')}</li>
                  <li>{t('Mapathon (8:00 - 9:00 PM)')}</li>
                  <li>{t('Closing remarks (9:00 - 9:15 PM)')}</li>
                </ol>
              </div>
              <div className="col-3 p-2 t-5">
                <h6><b>{t('Archival Workshops Tour')}</b>&ensp;|&ensp;{t('Bourj Hammoud')}</h6><hr/>
                <p>{t('Intimate walking tour of 3-4 craft workshops in the Bourj Hammoud area')}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Default>

    <Mobile>
      <div className="container-fluid">
        <div className="row">
          <h6 class="mb-0 p-2 t-1"><b>{t('Tuesday, July 5')}</b></h6>
        </div>
        <div className="row">
          <div className="col-3 p-2 t-3"><b>{t('200')}&ndash;{t('400pm')}</b></div>
          <div className="col-9 p-2 t-3">
            <h6><b>{t('Craft Workshops Tour')}</b>&ensp;|&ensp;{t('Gemmayze')}&ndash;{t('Mar Mikhael')}</h6><hr/>
            <p className="mb-0">{t('Intimate walking tour of 3-4 craft workshops in the Gemmayze and Mar Mikhael area')}</p>
          </div>
        </div>
        <div className="row">
          <div className="col-3 p-2 t-5"><b>{t('600')}&ndash;{t('800pm')}</b></div>
          <div className="col-9 p-2 t-5">
            <h6><b>{t('Archival Crafts Tour')}</b>&ensp;|&ensp;{t('Al Balad')}</h6><hr/>
            <p>{t('Walking tour of locations of old craft workshops and souks in Al Balad')}</p>
          </div>
        </div>{/* close tuesday */}

        <div className="row mt-3">
          <h6 class="mb-0 p-2 t-1"><b>{t('Thursday, July 7')}</b></h6>
        </div>
        <div className="row">
          <div className="col-3 p-2 t-5"><b>{t('600')}&ndash;{t('800pm')}</b></div>
          <div className="col-9 p-2 t-5">
          <h6><b>{t('Living Heritage Atlas Event')}</b> {t('(Abroyan Factory, Bourj Hammoud)')}</h6><hr/>
            <ol className={i18n.language}>
              <li>{t('Opening Remarks by MIT FHL & CDDL')}</li>
              <li>{t('Mapping Methods Discussion')}</li>
              <li>{t('Mapathon Discussion')}</li>
              <li>{t('Closing Remarks')}</li>
            </ol>
          </div>
        </div>{/* close thursday */}

        <div className="row mt-3">
          <h6 class="mb-0 p-2 t-1"><b>{t('Friday, July 8')}</b></h6>
        </div>
        <div className="row">
          <div className="col-3 p-2 t-3"><b>{t('200')}&ndash;{t('400pm')}</b></div>
          <div className="col-9 p-2 t-3">
            <h6><b>{t('Craft Workshops Tour')}</b>&ensp;|&ensp;{t('Bourj Hammoud')}</h6><hr/>
            <p className="mb-0">{t('Intimate walking tour of 3-4 craft workshops in the Bourj Hammoud area')}</p>
          </div>
        </div>
        <div className="row">
          <div className="col-3 p-2 t-5"><b>{t('600')}&ndash;{t('800pm')}</b></div>
          <div className="col-9 p-2 t-5">
            <h6><b>{t('Archival Crafts Tour')}</b>&ensp;|&ensp;{t('Bourj Hammoud')}</h6><hr/>
            <p>{t('Walking tour of locations of old craft workshops and souks in Bourj Hammoud')}</p>
          </div>
        </div>{/* close friday */}
      </div>
    </Mobile>
    </>
  )
};

export default Schedule;