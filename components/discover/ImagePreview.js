import Link from 'next/link';
import ImageFilter from "react-image-filter";

const ImagePreview = ({ workshop, thumbnailSrc, grayscale }) => {
  const imgSrc = workshop.thumb_img_id
    ? `/api/thumbnail_images/${workshop.thumb_img_id}_thumbnail.jpeg`
    : thumbnailSrc || null;

  const imgAlt = workshop.thumb_img_id
    ? `img-${workshop.thumb_img_id}`
    : thumbnailSrc || null;

  const duotoneCraft = {
    architectural: {one: [57, 73, 130], two: [236, 223, 190]},
    cuisine: {one: [115, 51, 11], two: [242, 218, 144]},
    decorative: {one: [72, 111, 78], two: [229, 206, 195]},
    fashion: {one: [179, 103, 79], two: [169, 200, 231]},
    functional: {one: [11, 96, 115], two: [229, 200, 171]},
    furniture: {one: [105, 70, 70], two: [212, 234, 217]},
    textiles: {one: [115, 92, 22], two: [200, 219, 225]}
  };

  const imgDuotone =
    (workshop.craft_discipline_category.length == 1) ? duotoneCraft[workshop.craft_discipline_category[0]]
    : (workshop.craft_discipline_category.length == 2) ? {one: duotoneCraft[workshop.craft_discipline_category[0]].one, two: duotoneCraft[workshop.craft_discipline_category[1]].two}
    : {one: [0, 0, 0], two: [255, 255, 255]};

  return (
    <>
      <div className="img-preview">
        {imgSrc && (
          <>
            <Link href="/discover/[id]" as={`/discover/${workshop.ID}`} scroll={false}>
              {/* <img src={imgSrc} alt={imgAlt} style={{filter: "url(#architectural)"}}/> */}
              {/* <div className="img architectural" style={{backgroundImage: "url(" + imgSrc + ")"}}></div> */}

              {grayscale ?
              <ImageFilter image={imgSrc} filter={'grayscale'}/> :
              <ImageFilter image={imgSrc} filter={"duotone"} preserveAspectRatio="cover"
                colorOne={imgDuotone.one}
                colorTwo={imgDuotone.two}
              />}



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
