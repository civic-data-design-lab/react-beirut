import Link from 'next/link';

const ImageCard = ({ workshop }) => {
  const imgSrc = workshop.thumb_img_id
    ? `/api/images/${workshop.thumb_img_id}.jpg`
    : null;

  return (
    <>
      <div className="img-wrapper">
        <div className="img-preview">
          {imgSrc && (
            <Link href="/discover/[id]" as={`/discover/${workshop.ID}`}>
              <img src={imgSrc} alt="img" />
            </Link>
          )}
        </div>
      </div>
    </>
  );
};

export default ImageCard;
