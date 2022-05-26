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

  const showInput = () => {
    let inputType = type;
    if (!type) {
      inputType = 'text';
    }

    switch (inputType) {
      case 'text':
      case 'email':
      case 'tel':
      case 'url':
      case 'number':
      case 'date':
        return (
          <input
            id={fieldName}
            type={inputType}
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
      default:
        return <></>
    }
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
