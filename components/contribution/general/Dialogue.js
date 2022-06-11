

const Dialogue = ({title, content, accept, cancel, acceptText, cancelText,
                      handleCancel, handleAccept, handleClose}) => {

    return (
        <>
            <div className={'card-cover'}>
                <div className={'dialogue-container'}>


                    <div className={'dialogue-title'}>{title}</div>
                    <button className={'close-card-btn dialogue-close-btn'} onClick={handleClose}>
                        <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M14 1.41L12.59 0L7 5.59L1.41 0L0 1.41L5.59 7L0 12.59L1.41 14L7 8.41L12.59 14L14 12.59L8.41 7L14 1.41Z" fill="#404044"/>
                        </svg>
                    </button>

                    <div className={'dialogue-content'}>{content}</div>
                    <div className={'dialogue-buttons'}>
                        {cancel ? <button className={'cancel-button'} onClick={handleCancel}>
                            <p className={'cancel-label'}>{cancelText}</p>
                        </button> : null}
                        {accept ? <button className={'accept-button'}>
                            <p className={'accept-label'} onClick={handleAccept}>{acceptText}</p>

                        </button> : null}
                    </div>


                </div>

            </div>
        </>
    )

}

export default Dialogue;