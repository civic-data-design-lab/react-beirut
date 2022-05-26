
const WorkshopAboutForm = ({ onUpdate, formData, title }) => {
  return (
    <form className="WorkshopAboutForm">
      <h2>{title || 'About the Workshop'}</h2>
      <div className="sections">
        <div className="section">
          <h3>Shop Information</h3>
          <div>
            <label htmlFor="shop-name">Shop Name</label>
            <input
              id="shop-name"
              type="text"
              value={formData.shopName || ''}
              onChange={(e) => onUpdate({ shopName: e.target.value })}
            />
          </div>
          <div>
            <label htmlFor="date-est">Date Established</label>
            <input
              id="date-est"
              type="date"
              value={formData.dateEstablished || ''}
              onChange={(e) => onUpdate({ dateEstablished: e.target.value })}
            />
          </div>
          <div>
            <label htmlFor="status">Operation Status</label>
            <select
              name="Shop status"
              id="status"
              value={formData.status || ''}
              onChange={(e) => onUpdate({ status: e.target.value })}
            >
              <option disabled value="">
                --Select a status--
              </option>
              <option value="open">Open</option>
              <option value="closed_temp">Closed (temporary)</option>
              <option value="closed_perm">Closed (permanent)</option>
              <option value="destroyed">Destroyed</option>
            </select>
          </div>
        </div>
        <div className="section">
          <h3>Shop Contact Information</h3>
          <div>
            <label htmlFor="owner-name">Owner Name</label>
            <input
              id="owner-name"
              type="text"
              value={formData.ownerName || ''}
              onChange={(e) => onUpdate({ ownerName: e.target.value })}
            />
          </div>
          <div>
            <label htmlFor="phone-number">Phone Number</label>
            <input
              id="phone-number"
              type="tel"
              value={formData.phoneNumber || ''}
              onChange={(e) => onUpdate({ phoneNumber: e.target.value })}
            />
          </div>
          <div>
            <label htmlFor="website">Website</label>
            <input
              id="website"
              type="url"
              value={formData.website || ''}
              onChange={(e) => onUpdate({ website: e.target.value })}
            />
          </div>
          <div>
            <label htmlFor="social-media">Social Media</label>
            <input
              id="social-media"
              type="url"
              value={formData.socialMedia || ''}
              onChange={(e) => onUpdate({ socialMedia: e.target.value })}
            />
          </div>
        </div>
      </div>
    </form>
  );
};

export default WorkshopAboutForm;
