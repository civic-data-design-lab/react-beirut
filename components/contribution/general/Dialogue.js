import { Trans, useTranslation } from 'react-i18next';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXmark } from '@fortawesome/free-solid-svg-icons';

const Dialogue = (
  {
    title,
    content,
    accept,
    cancel,
    acceptText,
    cancelText,
    handleCancel,
    handleAccept,
    handleClose,
    cardCover = true,
  },
  loader = false
) => {
  const { t } = useTranslation();

  return (
    <>
      <div className={cardCover ? 'card-cover' : 'card-cover-clear'}>
        <div className={'dialogue-container'}>
          <div className={'dialogue-title'}>{t(title)}</div>
          <button
            className={'close-card-btn dialogue-close-btn'}
            onClick={handleClose}
          >
            <FontAwesomeIcon icon={faXmark} size={'sm'} />
          </button>

          {loader === true ? <div className="loader" /> : null}
          <div className={'dialogue-content'}>{content}</div>
          <div className={'dialogue-buttons'}>
            {cancel ? (
              <button className={'cancel-button'} onClick={handleCancel}>
                <p className={'cancel-label'}>{t(cancelText)}</p>
              </button>
            ) : null}
            {accept ? (
              <button className={'accept-button'}>
                <p className={'accept-label'} onClick={handleAccept}>
                  {t(acceptText)}
                </p>
              </button>
            ) : null}
          </div>
        </div>
      </div>
    </>
  );
};

export default Dialogue;
