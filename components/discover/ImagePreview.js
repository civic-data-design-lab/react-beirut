import Link from 'next/link';
import ImageFilter from "react-image-filter";

const ImagePreview = ({ workshop, thumbnailSrc }) => {
  const imgSrc = workshop.thumb_img_id
    ? `/api/images/${workshop.thumb_img_id}.jpg`
    : thumbnailSrc || null;

  const imgAlt = workshop.thumb_img_id
    ? `img-${workshop.thumb_img_id}`
    : thumbnailSrc || null;

  const duotoneCraft = {
    architectural: {one: [52, 62, 97], two: [236, 223, 190]},
    cuisine: {one: [172, 107, 43], two: [185, 193, 179]},
    decorative: {one: [70, 95, 75], two: [222, 194, 180]},
    fashion: {one: [179, 103, 79], two: [167, 192, 218]},
    functional: {one: [11, 96, 115], two: [186, 210, 218]},
    furniture: {one: [133, 89, 75], two: [205, 184, 159]},
    textiles: {one: [172, 133, 17], two: [229, 200, 171]}
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
              <ImageFilter image={imgSrc} filter={"duotone"} preserveAspectRatio="cover"
                colorOne={imgDuotone.one}
                colorTwo={imgDuotone.two}
              />
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
