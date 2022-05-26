import Link from 'next/link';
import { useState } from 'react';
import Card from '../Card';

const ImageCard = ({
  workshop,
  isExpanded,
  onExpand,
  onClose,
  thumbnailSrc,
}) => {
  const imgSrc = workshop.thumb_img_id
    ? `/api/images/${workshop.thumb_img_id}.jpg`
    : thumbnailSrc || null;

  return (
    <>
      <div className="img-preview">
        {imgSrc && (
          <>
            <Link href="/discover/[id]" as={`/discover/${workshop.ID}`}>
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

export default ImageCard;
