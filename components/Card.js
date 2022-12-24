const Card = ({ children, handleClose }) => {
  return (
    <div className="card">
      <div className="card__cover">
        <div className="card__wrapper">
          {children}
          <div className="container__btn">
            <button className="btn-close" onClick={() => handleClose()}>
              <span></span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Card;
