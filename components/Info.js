import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleCheck } from '@fortawesome/free-solid-svg-icons';
import { faQuestionCircle } from '@fortawesome/free-solid-svg-icons';
import { faCircleInfo } from '@fortawesome/free-solid-svg-icons';
import { useState } from 'react';

const Info = ({ icon, text }) => {
  const [showTooltipText, setShowTooltipText] = useState(null);

  const getIcon = () => {
    if (icon === 'question') {
      return <FontAwesomeIcon icon={faQuestionCircle} width=".75em" />;
    } else if (icon === 'check') {
      return <FontAwesomeIcon icon={faCircleCheck} width=".75em" />;
    } else if (icon === 'info') {
      return <FontAwesomeIcon icon={faCircleInfo} width=".75em" />;
    }
  };

  return (
    <span className={'tooltip-container'}>
      {/* <span style={{ display: 'flex', flexDirection: 'row' }}> */}
      <div
        className={'tooltip-trigger'}
        onMouseOver={() => {
          if (window.innerWidth > 991) {
            setShowTooltipText(true);
          }
        }}
        onMouseLeave={() => {
          if (window.innerWidth > 991) {
            setShowTooltipText(false);
          }
        }}
        onClick={() => {
          if (window.innerWidth < 991) {
            setShowTooltipText(!showTooltipText);
          }
        }}
      >
        {icon === 'question' ? (
          <small className="m-0">Pending</small>
        ) : icon === 'check' ? (
          <small className="m-0">Verified</small>
        ) : null}
        &nbsp;
        {getIcon(icon)}
      </div>
      {/* </span> */}

      {showTooltipText ? (
        <div className={'tooltip-text-container'}>
          <p className={'tooltip-text'}>{text}</p>
        </div>
      ) : null}
    </span>
  );
};

export default Info;
