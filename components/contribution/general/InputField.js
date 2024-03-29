import { useState } from 'react';
import { REGEX_VALIDATION, VALID_DECADES } from '../../../lib/utils';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { faPlus } from '@fortawesome/free-solid-svg-icons';

import { Trans, useTranslation } from 'react-i18next';

/**
 * Component handling inputs for the contribution page. It is used to handle a
 * lot of the actions an input would normall need such as updating the form data
 * and validation based on the required fields.
 *
 * @param {object} props - Props
 * @param {string} props.title - The title of this field to be shown in the label
 * @param {string} props.fieldName - The name of the field as it is saved in the
 *    form data
 * @param {any} props.value - The current value of the field. All inputs are
 *    expected to be controlled elements.
 * @param {string} props.type - The type of input to render (e.g. 'text',
 *    'textarea', 'select' etc.)
 * @param {function} props.onUpdate - The function to call when the value of the
 *   field is updated.
 * @param {boolean} props.required - Whether or not this field is required
 * @param {string} props.label - Optional parameter only used for the checkbox type.
 * @param {string} props.defaultValue - Optional parameter specially for the select type field. This is the value that first appears on the dropdown.
 * @param {JSX.Element[]} props.children - Any children to render (e.g., if
 *    using `type='select'`, this would be the '<option>' elements to render)
 * @returns
 */
const InputField = (props) => {
  const {
    title,
    fieldName,
    value,
    type,
    onUpdate,
    required,
    label,
    defaultValue,
    otherExists,
    setOtherExists,
    children,
    ...rest
  } = props;

  const { t } = useTranslation();
  // Only a single child was given. Convert to array.
  if (children != undefined) {
    if (children[0] == undefined) children = [children];
  }

  let validationPattern;
  let errorString;
  const [focused, setFocused] = useState(false);
  const onFocus = (e) => {
    setFocused(true);
  };

  const onBlur = (e) => {
    setFocused(false);
  };

  const showInput = () => {
    let inputType = type;
    if (!type) {
      inputType = 'text';
    }

    switch (inputType) {
      case 'checkbox':
        return (
          <>
            <span>
              <input
                name={fieldName}
                id={fieldName}
                type={inputType}
                required={required}
                defaultChecked={value || false}
                onClick={(e) => {
                  onUpdate({ [fieldName]: e.target.checked });
                }}
                {...rest}
              />
              <label style={{ margin: '10px' }} htmlFor={fieldName}>
                {t(label)}
              </label>
            </span>
          </>
        );
      case 'text':
      case 'number':
      case 'date':
        return (
          <input
            id={fieldName}
            type={inputType}
            required={required}
            value={value || ''}
            onChange={(e) => onUpdate({ [fieldName]: e.target.value })}
            {...rest}
          />
        );
      case 'textarea':
        return (
          <textarea
            id={fieldName}
            value={value || ''}
            onChange={(e) => onUpdate({ [fieldName]: e.target.value })}
            {...rest}
          />
        );
      case 'year':
        const startYear = VALID_DECADES[0];
        const endYear = new Date().getFullYear();
        return (
          <select
            name={title}
            id={fieldName}
            value={value || 'null'}
            onChange={(e) =>
              onUpdate(
                e.target.value == 'null'
                  ? { [fieldName]: null }
                  : { [fieldName]: e.target.value }
              )
            }
            {...rest}
          >
            <option defaultValue value="null">
              {defaultValue ? defaultValue : `--${t('Select')} ${title}--`}
            </option>
            {[...Array(endYear - startYear).keys()]
              .map((i) => i + startYear)
              .reverse()
              .map((year) => {
                return (
                  <option key={year} value={year}>
                    {year}
                  </option>
                );
              })}

            {/* {children} */}
          </select>
        );
      case 'select':
        return (
          <select
            name={title}
            id={fieldName}
            value={value || 'null'}
            onChange={(e) =>
              onUpdate(
                e.target.value == 'null'
                  ? { [fieldName]: null }
                  : { [fieldName]: e.target.value }
              )
            }
            {...rest}
          >
            <option defaultValue value="null">
              {defaultValue ? defaultValue : `--${t('Select')} ${title}--`}
            </option>
            {children}
          </select>
        );
      case 'select-with-other':
        return (
          <>
            <select
              //value={'null'}
              name={title}
              id={fieldName}
              value={value}
              //value={
              //  [
              //    null,
              //    ...children.map((option) => option.props.value),
              //  ].includes(value)
              //    ? value || ''
              //    : 'OTHER'
              //}
              onChange={(e) => {
                if (e.target.value == 'OTHER') {
                  setOtherExists(true);
                  onUpdate({ [fieldName]: '' });
                } else {
                  setOtherExists(false);
                  onUpdate(
                    e.target.value == 'null'
                      ? { [fieldName]: null }
                      : { [fieldName]: e.target.value }
                  );
                }
              }}
              {...rest}
            >
              <option value="null">{`--${t('Select')} ${title}--`}</option>
              {children}
              <option value="OTHER"> ＋ {t('Other')}</option>
            </select>
            {otherExists && (
              <input
                id={fieldName}
                type="text"
                required={required}
                value={value}
                placeholder={t(`Enter Other`) + t(title)}
                onChange={(e) => {
                  onUpdate({ [fieldName]: e.target.value });
                }}
                {...rest}
              />
            )}
            {/* <p>Value: {value}</p>
              <p>otherSelected: {`${otherSelected}`}</p> */}
          </>
        );
      case 'tel':
        validationPattern = REGEX_VALIDATION.tel;
        errorString = t('* Please enter a valid phone number.');
        break;
      case 'email':
        validationPattern = REGEX_VALIDATION.email;
        errorString = t('* Please enter a valid email address');
        break;
      case 'instagram_handle':
        validationPattern = REGEX_VALIDATION.instagram_handle;
        errorString = t('* Please enter a valid instagram handle');

        break;
      case 'twitter_handle':
        validationPattern = REGEX_VALIDATION.twitter_handle;
        errorString = t('* Please enter a valid twitter handle');

        break;
      case 'url':
        validationPattern = REGEX_VALIDATION.url;
        errorString = t('* Please enter a valid url');
        break;
      default:
        return <></>;
    }
    return (
      <>
        <input
          id={fieldName}
          type={inputType}
          required={required}
          // pattern={validationPattern.toString()} // Unsure if this attribute does anything
          value={value || ''}
          onFocus={onFocus}
          onBlur={onBlur}
          onChange={(e) => onUpdate({ [fieldName]: e.target.value })}
          placeholder={
            inputType === 'instagram_handle' || inputType === 'twitter_handle'
              ? '@username'
              : ''
          }
          {...rest}
        />
      </>
    );
  };

  return (
    <div className="inputType">
      <label className={required ? 'required' : ''} htmlFor={fieldName}>
        {title}
      </label>
      {showInput()}
    </div>
  );
};

export default InputField;
