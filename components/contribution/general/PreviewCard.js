import Workshop from '../../Workshop';
import Archive from '../../Archive';

const PreviewCard = ({
  object,
  imageMetas,
  imageSrc,
  objType,
  includeSuggestions,
  lang,
  i18n,
}) => {
  console.log('i18n from prev card ', i18n);
  const getObjectPreview = () => {
    if (objType === 'workshop') {
      return (
        <Workshop
          workshop={object}
          imageMetas={imageMetas}
          imageSrc={imageSrc}
          lang={lang}
          i18n={i18n}
          preview={true}
        />
      );
    } else {
      return (
        <Archive
          archive={object}
          imageMetas={imageMetas}
          imageSrc={imageSrc}
          i18n={i18n}
          preview={true}
        />
      );
    }
  };

  return <div className={'preview-card'}>{getObjectPreview()}</div>;
};

export default PreviewCard;
