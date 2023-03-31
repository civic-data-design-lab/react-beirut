import ImageUploadForm from '../general/imageUpload/ImageUploadForm';
import InputField from '../general/InputField';
import {
  CRAFT_CATEGORIES,
  CRAFT_TYPES,
  VALID_DECADES,
} from '../../../lib/utils';
import BooleanButtonForm from '../general/booleanButtonForm/BooleanButtonForm';
import { useMediaQuery } from 'react-responsive';
import { useTranslation } from 'react-i18next';
import { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faXmark } from '@fortawesome/free-solid-svg-icons';

const Desktop = ({ children }) => {
  const isDesktop = useMediaQuery({ minWidth: 992 });
  return isDesktop ? children : null;
};
const Tablet = ({ children }) => {
  const isTablet = useMediaQuery({ minWidth: 651, maxWidth: 991 });
  return isTablet ? children : null;
};
const Mobile = ({ children }) => {
  const isMobile = useMediaQuery({ maxWidth: 650 });
  return isMobile ? children : null;
};
const Default = ({ children }) => {
  const isNotMobile = useMediaQuery({ minWidth: 768 });
  return isNotMobile ? children : null;
};

const ArchiveImageForm = ({ onUpdate, formData, formSchema, title, label }) => {
  const { t } = useTranslation();
  const page = formSchema.pages.image_upload;
  const fields = page.fields;

  const [numImageForm, setNumImageForm] = useState(1);
  const [imageFormState, setImageFormState] = useState({});

  useEffect(() => {
    let storedNum = localStorage.getItem('numImageFormArchive');
    if (storedNum) {
      setNumImageForm(parseInt(storedNum));
    }
  }, []);

  const updateImageFormState = (imageIndex, data) => {
    let newData = formData;
    if (!newData.images) {
      newData.images = {};
    }
    newData.images[imageIndex] = data;
    setImageFormState((prevForm) => {
      const updatedFormData = { ...prevForm, ...newData };
      onUpdate(updatedFormData);
      return updatedFormData;
    });
  };

  const shiftImagesUp = (index) => {
    let keys = Object.keys(formData.images);
    let newData = formData;
    keys.map((key) => {
      if (key > index) {
        if (newData.images[key]) {
          updateImageFormState(key - 1, newData.images[key]);
          updateImageFormState(key, { imageData: null, imageExtension: null });
        }
      }
    });
  };

  const shiftCaptionsUp = (index) => {
    let keys = Object.keys(formData.caption);
    let newData = formData;
    keys.map((key) => {
      if (key > index) {
        if (newData.caption[key]) {
          newData.caption[key - 1] = newData.caption[key];
          newData.caption[key] = [];
          onUpdate(newData);
        }
      }
    });
  };

  const shiftTagsUp = (index) => {
    let keys = Object.keys(formData.image_type);
    let newData = formData;
    keys.map((key) => {
      if (key > index) {
        if (newData.image_type[key]) {
          newData.image_type[key - 1] = newData.image_type[key];
          newData.image_type[key] = [];
          onUpdate(newData);
        }
      }
    });
  };

  return (
    <>
      <div className={'form'}>
        <div className={'form-title'}>
          <h2>{t(page.title)}</h2>
        </div>
        <div className={'d-flex flex-column'}>
          <div className={'WorkshopImageForm'}>
            {[...Array(numImageForm).keys()].map((num) => {
              return (
                <div>
                  {numImageForm > 1 && (
                    <div className={'delete-img-btn'}>
                      <FontAwesomeIcon
                        icon={faXmark}
                        width={12}
                        onClick={() => {
                          if (!formData.images) {
                            // if there images is not defined in the formData
                          } else {
                            // if images is defined in formData then shift data up
                            shiftImagesUp(num + 1);
                          }
                          setNumImageForm(numImageForm - 1);

                          if (!formData.image_type) {
                            // if there are no tags at all
                          } else {
                            // if there are some tags
                            shiftTagsUp(num + 1);
                          }

                          if (!formData.caption) {
                            // if there are no tags at all
                          } else {
                            // if there are some tags
                            shiftCaptionsUp(num + 1);
                          }
                        }}
                      />
                    </div>
                  )}

                  <ImageUploadForm
                    onUpdate={onUpdate}
                    formData={formData}
                    dataLocation="images"
                    title=""
                    label={t(
                      'Upload an image related to craftsmanship in Beirut'
                    )}
                    imageRequired={true}
                    captionRequired={fields.caption.required}
                    fields={fields}
                    forWorkshop={false}
                    imageIndex={parseInt(num + 1)}
                  />
                </div>
              );
            })}

            {numImageForm < 3 && (
              <div
                className={
                  'add-img-btn d-flex flex-row justify-content-center align-items-center w-100'
                }
              >
                <button
                  className={'hstg-btn-pill'}
                  onClick={() => {
                    setNumImageForm(numImageForm + 1);
                    localStorage.setItem(
                      'numImageFormArchive',
                      (numImageForm + 1).toString()
                    );
                  }}
                >
                  <FontAwesomeIcon icon={faPlus} width={16} />
                </button>
              </div>
            )}
          </div>
          <div className="archive-image-section">
            <div className={'subsection'}>
              <InputField
                title={t('What year was the image taken?')}
                fieldName={fields.year_taken.field_name}
                value={formData[fields.year_taken.field_name]}
                type="year"
                onUpdate={(newData) => {
                  const year = newData[fields.year_taken.field_name];
                  const decade = year - (year % 10);
                  onUpdate({
                    [fields.year_taken.field_name]: year,
                    [fields.start_decade.field_name]: decade,
                    [fields.end_decade.field_name]: decade,
                  });
                }}
                required={fields.year_taken.required}
              />
              <div>
                <label>
                  {t('If exact year is unknown, please provide a decade range')}
                </label>
                <span>
                  <select
                    name="decade-select-start"
                    id="decade-select-start"
                    value={formData[fields.start_decade.field_name] || ''}
                    onChange={(e) =>
                      onUpdate({
                        [fields.start_decade.field_name]: e.target.value,
                      })
                    }
                  >
                    {formData[fields.year_taken.field_name] ? (
                      <option
                        disabled
                        value={formData[fields.start_decade.field_name]}
                      >
                        {formData[fields.start_decade.field_name]}
                      </option>
                    ) : (
                      <>
                        <option value=""> --{t('Start Decade')}--</option>
                        {VALID_DECADES.map((decade) => (
                          <option key={decade} value={decade}>
                            {decade}
                          </option>
                        ))}
                      </>
                    )}
                  </select>
                  —
                  <select
                    name="decade-select-end"
                    id="decade-select-end"
                    value={formData[fields.end_decade.field_name] || ''}
                    onChange={(e) =>
                      onUpdate({
                        [fields.end_decade.field_name]: e.target.value,
                      })
                    }
                  >
                    {formData[fields.year_taken.field_name] ? (
                      <option
                        disabled
                        value={formData[fields.end_decade.field_name]}
                      >
                        {formData[fields.end_decade.field_name]}
                      </option>
                    ) : (
                      <>
                        <option value=""> --{t('End Decade')}--</option>
                        {VALID_DECADES.map((decade) => (
                          <option
                            key={decade}
                            value={decade}
                            disabled={
                              decade < formData[fields.start_decade.field_name]
                            }
                          >
                            {decade}
                          </option>
                        ))}
                      </>
                    )}
                  </select>
                </span>
              </div>
              {(() => {
                const timeReq = page.custom_reqs.time_req.function(formData);
                return (
                  !timeReq.requirementFulfilled && (
                    <small className="input-error">
                      * {t(timeReq.errorMessage)}
                    </small>
                  )
                );
              })()}
            </div>

            <div className={'subsection'}>
              <h3 className={'Contribute-form-section-heading'}>
                {t('Craft Information')}
              </h3>
              <BooleanButtonForm
                onUpdate={onUpdate}
                formData={formData}
                title={fields.craft_category.title}
                dataLocation={fields.craft_category.field_name}
                label={t(
                  'What category of crafts are produced in this workshop?'
                )}
                selectionsAllowed="2"
                defaultTags={CRAFT_CATEGORIES}
                required={fields.craft_category.required ? true : false}
              />
              <BooleanButtonForm
                onUpdate={onUpdate}
                formData={formData}
                title={fields.type_of_craft.title}
                dataLocation={fields.type_of_craft.field_name}
                label={t(
                  'What type of crafts are produced in this workshop? If entering a custom type, English is preferred.'
                )}
                defaultTags={CRAFT_TYPES}
                required={fields.type_of_craft.required ? true : false}
                hasOtherField={true}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ArchiveImageForm;
