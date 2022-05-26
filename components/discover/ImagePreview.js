import Link from 'next/link';
import { useState } from 'react';
import Card from '../Card';

const ImagePreview = ({ workshop }) => {
  const imgSrc = workshop.thumb_img_id
    ? `/api/images/${workshop.thumb_img_id}.jpg`
    : thumbnailSrc || null;

  return (
    <>
      <div className="img-wrapper">
        <div className="img-preview">
          {/* <Link href={`discover/${workshop.ID}`}>
          <img
            // onClick={() => onExpand(workshop.ID)}
            src={imgSrc}
            alt={`Workshop ${workshop.ID} image`}
          /> */}
          {imgSrc && (
            <Link
              href="/discover/[id]"
              as={`/discover/${workshop.ID}`}
              scroll={false}
            >
              <img src={imgSrc} alt="img" />
            </Link>
          )}
        </div>
      </div>
    </>
  );
};

export default ImagePreview;
