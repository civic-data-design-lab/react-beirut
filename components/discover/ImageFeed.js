import ImagePreview from './ImagePreview';
import { useEffect } from 'react';

const ImageFeed = ({
  objects,
  imageFilterData,
  storeScrollPosition,
  i18n,
  imageSearchData,
}) => {
  const searchableKeys = [
    'shop_name',
    'content',
    'content_orig',
    'content_ar',
    'craft_discipline',
    'craft_discipline_category',
    'craft_discipline_other',
    'location',
    'address',
    'adm1',
    'adm2',
    'adm3',
    'adm4',
  ];

  const iterateObject = (object, searchValue) => {
    let filteredObject = Object.fromEntries(
      Object.entries(object).filter(([key]) => searchableKeys.includes(key))
    );

    return Object.values(filteredObject).some((val) => {
      if (val) {
        if (Array.isArray(val)) {
          return iterateArray(val, searchValue);
        } else if (val && typeof val === 'object') {
          return iterateObject(val, searchValue);
        } else {
          if (typeof val === 'string' || val instanceof String) {
            if (
              val.toLowerCase().includes(searchValue.toLowerCase()) ||
              searchValue.toLowerCase().includes(val.toLowerCase())
            ) {
              return true;
            }
          }
        }
      }
    });
  };

  const iterateArray = (array, searchValue) => {
    return array.some((item) => {
      if (item) {
        if (Array.isArray(item)) {
          return iterateArray(item, searchValue);
        } else if (item && typeof item === 'object') {
          return iterateObject(item, searchValue);
        } else {
          if (typeof item === 'string' || item instanceof String) {
            // console.log("this is a string ", item)
            if (
              item.toLowerCase().includes(searchValue.toLowerCase()) ||
              searchValue.toLowerCase().includes(item.toLowerCase())
            ) {
              return true;
            }
          }
        }
      }
    });
  };

  const filter = (object) => {
    if (!object.thumb_img_id) {
      return false;
    }

    let meetSearchCriteria;
    if (!imageSearchData || imageSearchData.length < 1) {
      meetSearchCriteria = true;
    } else {
      meetSearchCriteria = iterateObject(object, imageSearchData);
    }

    const craftType = object.craft_discipline_category;
    const indices = craftType.map((craft) => {
      return imageFilterData['filteredCrafts'].indexOf(craft);
    });
    const start = imageFilterData['filteredStartYear'];
    const end = imageFilterData['filteredEndYear'];
    let withinInterval = null;

    if (object.primary_year) {
      if (start <= object.primary_year && object.primary_year <= end) {
        withinInterval = true;
      }
    } else if (object.primary_decade) {
      if (
        start <= object.primary_decade[0] &&
        object.primary_decade[0] <= end
      ) {
        withinInterval = true;
      }
    } else if (object.decade_established) {
      if (object.year_established == null) {
        if (start <= 2010 && end >= 2010) {
          withinInterval = true;
        } else {
          withinInterval = false;
        }
      } else {
        if (
          start <= object.year_established &&
          object.year_established <= end
        ) {
          withinInterval = true;
        } else {
          withinInterval = false;
        }
      }
    } else {
      withinInterval = false;
    }

    const noCrafts =
      ((!object.craft_discipline_category ||
        object.craft_discipline_category.length < 1) &&
        imageFilterData['filteredCrafts'] &&
        imageFilterData['filteredCrafts'].length < 1) ||
      (imageFilterData['filteredCrafts'] &&
        imageFilterData['filteredCrafts'].length === 7);

    if (
      (indices[0] > -1 ||
        (indices.length > 1 && indices[1] > -1) ||
        noCrafts) &&
      withinInterval &&
      meetSearchCriteria
    ) {
      if (
        imageFilterData['filteredToggleWorkshopStatus'] &&
        object.object === 'workshop'
      ) {
        return true;
      } else if (
        imageFilterData['filteredToggleArchiveStatus'] &&
        object.object === 'archive'
      ) {
        return true;
      } else {
        return false;
      }
    }
  };

  //TODO: Adjust css to fit the width of the page

  return (
    <div className="image-feed">
      {objects &&
        objects.map(
          (object) =>
            filter(object) && (
              <div className="image-container" key={object.ID}>
                <ImagePreview
                  workshop={object}
                  storeScrollPosition={storeScrollPosition}
                  grayscale={false}
                  routeToAPI={'api/imageMetaData/'}
                />
              </div>
            )
        )}
    </div>
  );
};

export default ImageFeed;
