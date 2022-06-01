import { useState } from 'react';

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
    children,
    ...rest
  } = props;

  let validationPattern;
  let errorString;
  const [focused, setFocused] = useState(false);
  const onFocus = (e) => {
    console.log('FOCUSED');
    setFocused(true);
  };

  const onBlur = (e) => {
    console.log('BLURRED');
    setFocused(false);
  };

  const showInput = () => {
    let inputType = type;
    if (!type) {
      inputType = 'text';
    }

    switch (inputType) {
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
      case 'select':
        return (
          <select
            name={title}
            id={fieldName}
            value={value || "null"}
            onChange={(e) => onUpdate({ [fieldName]: e.target.value })}
            {...rest}
          >
            <option selected hidden value="null">
              --Select {title}--
            </option>
            {children}
          </select>
        );
        case 'select-with-other':
          const [otherSelected, setOtherSelected] = useState(false);
          return (
            <>
              <select
                name={title}
                id={fieldName}
                value={[null, ...children[0].map(option => option.props.value)].includes(value) ? (value || '') : "OTHER"}
                onChange={(e) => 
                  {
                    if (e.target.value == "OTHER") {
                      setOtherSelected(true);
                      onUpdate({ [fieldName]: "" });
                    }
                    else {
                      setOtherSelected(false);
                      onUpdate(e.target.value == "null" ? { [fieldName]: null } : { [fieldName]: e.target.value });
                      console.log(children);
                    }
                  }}
                {...rest}
              >
                <option selected value="null">
                  {`--Select ${title}--`}
                </option>
                {children}
                <option value="OTHER">
                  ⊕ OTHER
                </option>
              </select>
              {otherSelected && <input
              id={fieldName}
              type="text"
              required={required}
              value={value}
              placeholder={`Enter Other ${title}`}
              onChange={(e) => onUpdate({ [fieldName]: e.target.value })}
              {...rest}
              />}
              {/* <p>Value: {value}</p>
              <p>otherSelected: {`${otherSelected}`}</p> */}
            </>
          );
      case 'tel':
        validationPattern =
          /^\s*(?:\+?(\d{1,3}))?([-. (]*(\d{3})[-. )]*)?((\d{3})[-. ]*(\d{2,4})(?:[-.x ]*(\d+))?)\s*$/gm;
        errorString = '* Please enter a valid phone number.';
        break;
      case 'email':
        validationPattern =
          /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/g;
        errorString = '* Please enter a valid email address';
        break;
      case 'url':
        validationPattern =
          /[-a-zA-Z0-9@:%_\+.~#?&//=]{2,256}\.[a-z]{2,4}\b(\/[-a-zA-Z0-9@:%_\+.~#?&//=]*)?/gi;
        errorString = '* Please enter a valid url';
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
          pattern={validationPattern.toString()} // Unsure if this attribute does anything
          value={value || ''}
          onFocus={onFocus}
          onBlur={onBlur}
          onChange={(e) => onUpdate({ [fieldName]: e.target.value })}
          {...rest}
        />
        {!focused && value && !validationPattern.test(value) && (
          <small className="input-error">{errorString}</small>
        )}
      </>
    );
  };

  return (
    <div>
      <label className={required ? 'required' : ''} htmlFor={fieldName}>
        {title}
      </label>
      {showInput()}
    </div>
  );
};

export default InputField;
