import Link from 'next/link';

const ImagePreview = ({ workshop, thumbnailSrc }) => {
  const imgSrc = workshop.thumb_img_id
    ? `/api/images/${workshop.thumb_img_id}.jpg`
    : thumbnailSrc || null;

  return (
    <>
      <div className="img-preview">
        {imgSrc && (
          <>
            <Link href="/discover/[id]" as={`/discover/${workshop.ID}`} scroll={false}>
              <img src={imgSrc} alt="img" />
            </Link>
            <div className="overlay">
              <div className="shop-info">
                <p>{workshop.shop_name.content_orig}</p>
              </div>
            </div>
            <div className="overlay fill"></div>
          </>
        )}
      </div>
    </>
  );
};

export default ImagePreview;
