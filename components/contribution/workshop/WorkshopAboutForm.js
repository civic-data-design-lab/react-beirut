import InputField from "../general/InputField";

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
          <h3>Craft Workshop Information</h3>
          <InputField
            title="Shop Name"
            fieldName="shopName"
            value={formData.shopName}
            onUpdate={onUpdate}
            required={requiredFields?.includes('shopName')}
            highlight={highlightedFields?.includes('shopName')}
          />
          {/* This input was changed from a date to numerical year. Check that data still works here. */}
          <InputField
            title="Year Established"
            fieldName="yearEstablished"
            value={formData.yearEstablished}
            type="number"
            min="0"
            max={new Date().getFullYear()}
            onUpdate={onUpdate}
            required={requiredFields?.includes('yearEstablished')}
            highlight={highlightedFields?.includes('yearEstablished')}
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
          <h3>Business Contact Information</h3>
          {/* Removed per Ashley.
          <InputField
            title="Owner Name"
            fieldName="ownerName"
            type="text"
            value={formData.ownerName}
            onUpdate={onUpdate}
            required={requiredFields?.includes('ownerName')}
            highlight={highlightedFields?.includes('ownerName')}
          /> */}
          <p>This information will be publicly available on the <br />Living Heritage Atlas | Beirut database and website.</p>
          {/* TODO: Make this into an info "i" note. */}
          <InputField
            title="Phone Number"
            fieldName="phoneNumber"
            type="tel"
            // pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}"  This will only work if it is a US number
            value={formData.phoneNumber}
            onUpdate={onUpdate}
            required={requiredFields?.includes('phoneNumber')}
            highlight={highlightedFields?.includes('phoneNumber')}
          />
          <InputField
            title="Email"
            fieldName="email"
            type="email"
            value={formData.email}
            onUpdate={onUpdate}
            required={requiredFields?.includes('email')}
            highlight={highlightedFields?.includes('email')}
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
