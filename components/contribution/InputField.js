import { useState } from 'react';

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
    console.log("FOCUSED");
    setFocused(true);
  }

  const onBlur = (e) => {
    console.log("BLURRED");
    setFocused(false);
  }

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
            value={value || ''}
            onChange={(e) => onUpdate({ [fieldName]: e.target.value })}
            {...rest}
          >
            {children}
          </select>
        );
      case 'tel':
        validationPattern = /^\s*(?:\+?(\d{1,3}))?([-. (]*(\d{3})[-. )]*)?((\d{3})[-. ]*(\d{2,4})(?:[-.x ]*(\d+))?)\s*$/gm
        errorString = "* Please enter a valid phone number."
        break;
      case 'email':
        validationPattern = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/g
        errorString = "* Please enter a valid email address"
        break;
      case 'url':
        validationPattern = /[-a-zA-Z0-9@:%_\+.~#?&//=]{2,256}\.[a-z]{2,4}\b(\/[-a-zA-Z0-9@:%_\+.~#?&//=]*)?/gi
        errorString = "* Please enter a valid url"
        break;
      default:
        return <></>
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
            {!focused && value && !validationPattern.test(value) && (<small className="input-error">{errorString}</small>)}
          </>
    )
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
