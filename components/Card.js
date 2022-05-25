const Card = ({ children, handleClose }) => {
  return (
    <div className="card">
      <div className="card__cover">
        <div className="card__wrapper">
          <div className="container__btn">
            <button className="btn-close" onClick={() => handleClose(false)}>
              <span></span>
            </button>
          </div>

          {children}
        </div>
      </div>
    </div>
  );
};

export default Card;
