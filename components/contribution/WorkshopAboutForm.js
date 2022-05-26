import InputField from './InputField';

const WorkshopAboutForm = ({
  onUpdate,
  formData,
  title,
  requiredFields,
  highlightedFields,
}) => {
  return (
    <form className="WorkshopAboutForm">
      <h2>{title || 'About the Workshop'}</h2>
      <div className="sections">
        <div className="section">
          <h3>Shop Information</h3>
          <InputField
            title="Shop Name"
            fieldName="shopName"
            value={formData.shopName}
            onUpdate={onUpdate}
            required={requiredFields?.includes('shopName')}
            highlight={highlightedFields?.includes('shopName')}
          />
          <InputField
            title="Date Established"
            fieldName="dateEstablished"
            value={formData.dateEstablished}
            type="date"
            onUpdate={onUpdate}
            required={requiredFields?.includes('dateEstablished')}
            highlight={highlightedFields?.includes('dateEstablished')}
          />
          <InputField
            title="Shop Status"
            fieldName="status"
            value={formData.status}
            type="select"
            onUpdate={onUpdate}
            required={requiredFields?.includes('status')}
            highlight={highlightedFields?.includes('status')}
          >
            <option disabled value="">
              --Select a status--
            </option>
            <option value="open">Open</option>
            <option value="closed_temp">Closed (temporary)</option>
            <option value="closed_perm">Closed (permanent)</option>
            <option value="destroyed">Destroyed</option>
          </InputField>
        </div>
        <div className="section">
          <h3>Shop Contact Information</h3>
          <InputField
            title="Owner Name"
            fieldName="ownerName"
            type="text"
            value={formData.ownerName}
            onUpdate={onUpdate}
            required={requiredFields?.includes('ownerName')}
            highlight={highlightedFields?.includes('ownerName')}
          />
          <InputField
            title="Phone Number"
            fieldName="phoneNumber"
            type="tel"
            pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}"
            value={formData.phoneNumber}
            onUpdate={onUpdate}
            required={requiredFields?.includes('phoneNumber')}
            highlight={highlightedFields?.includes('phoneNumber')}
          />
          <InputField
            title="Website"
            fieldName="website"
            type="url"
            value={formData.website}
            onUpdate={onUpdate}
            required={requiredFields?.includes('website')}
            highlight={highlightedFields?.includes('website')}
          />
          <InputField
            title="Social Media"
            fieldName="socialMedia"
            type="url"
            value={formData.socialMedia}
            onUpdate={onUpdate}
            required={requiredFields?.includes('socialMedia')}
            highlight={highlightedFields?.includes('socialMedia')}
          />
        </div>
      </div>
    </form>
  );
};

export default WorkshopAboutForm;
