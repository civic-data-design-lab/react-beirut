#!/usr/bin/env python3

import pandas as pd
import datetime
import argparse
import requests
import dotenv
import json
import os

dotenv.load_dotenv()

KOBO_API_KEY = os.getenv("KOBO_API_KEY")


def arrayify(
    record,
    space_sep_fields=[
        "craft_discipline_category",
        "craft_discipline",
        "primary_decade",
        "images",
    ],
):
    """Converts all space separated values into arrays.

    Default space-separated value fields are:
    * `craft_discipline_category`
    * `craft_discipline`
    * `primary_decade`
    * `images`

    Note that the `primary_decade` field is converted to an array of integers,
    not strings.

    Args:
        record (`pd.Series`): A dataframe record

    Returns:
        `pd.Series`: The same record, but with all space separated values converted to arrays
    """
    for key in space_sep_fields:
        try:
            split_list = record[key].split()
            if key == "primary_decade":
                record[key] = [int(x) for x in split_list]
            else:
                record[key] = split_list
        except AttributeError:
            record[key] = []
    return record


def main():
    # Creates an argument parser that accepts a csv file as input
    parser = argparse.ArgumentParser()
    parser.add_argument(
        "csv_filepath",
        help="The path to the CSV file to be converted to json",
    )
    # Reads the csv file and converts it to a dataframe
    args = parser.parse_args()
    path = args.csv_filepath
    archive_df = pd.read_csv(path)

    print(f"Successfully read CSV file at {path}")

    # Converts all space separated values to arrays
    arrayified_archive_df = archive_df.apply(arrayify, axis=1)

    current_time = datetime.datetime.now().strftime("%Y-%m-%d-%H-%M-%S")

    # Saves the dataframe to a json file
    new_name_info = f"archive-info-{current_time}.json"
    new_path_info = os.path.join("scripts", "data", "archive", new_name_info)
    # Create the directories if it doesn't exist
    os.makedirs(os.path.dirname(new_path_info), exist_ok=True)
    arrayified_archive_df.to_json(
        new_path_info,
        orient="records",
        force_ascii=False,
        indent=2,
    )

    print(f"Successfully wrote archive info JSON file at {new_path_info}")

    print("Creating archive info image metadata fields to update...")

    # Load the new archive JSON
    with open(new_path_info, "r", encoding="utf-8") as f:
        archive_info = json.load(f)

    image_meta_updates = []
    for archive in archive_info:
        image_ids = archive["images"]

        # Add the image to the archive response and create an image metadata object
        if len(image_ids) == 0:
            # No images for this archive
            continue

        # We only have the primary image data for now, so we only update the
        # primary image's metadata (the first image)
        primary_image_id = image_ids[0]

        # Create the updated image meta object
        craft_type: list = archive["craft_discipline"][:]
        craft_other: str = archive["craft_discipline_other"]
        if craft_other is not None:
            try:
                craft_type.remove("other")
            except ValueError:
                pass
            craft_type.append(craft_other)

        # Add the new image metadata (field, value) pairs to be updated
        image_meta_updates.append(
            {
                "img_id": primary_image_id,
                "response_id": archive["ID"],
                "is_thumbnail": archive["thumb_img_id"] == primary_image_id,
                "craft_category": archive["craft_discipline_category"],
                "craft_type": craft_type,
                "keywords": list(
                    set(craft_type + archive["craft_discipline_category"])
                ),
                # Geolocation
                "location.geo.lat": archive["primary_location.geo.lat"],
                "location.geo.lng": archive["primary_location.geo.lng"],
                # Address
                "location.address.content": archive["primary_location.address.content"],
                "location.address.content_ar": archive[
                    "primary_location.address.content_ar"
                ],
                "location.address.content_orig": archive[
                    "primary_location.address.content_orig"
                ],
                "location.address.content_orig_lang": archive[
                    "primary_location.address.content_orig_lang"
                ],
                # Administrative regions
                "location.adm4": archive["primary_location.adm4"],
                "location.adm3": archive["primary_location.adm3"],
                "location.adm2": archive["primary_location.adm2"],
                "location.adm1": archive["primary_location.adm1"],
                "year_taken": archive["primary_year"],
                "decade_taken": archive["primary_decade"],
                "historic_map": archive["primary_historic_map"],
                "src": f"https://cddl-beirut.herokuapp.com/api/images/{primary_image_id}.jpg",
            }
        )

    # Saves the image metadata (updates) to a json file
    new_name_meta = f"archive-updated-image-meta-{current_time}.json"
    new_path_meta = os.path.join("scripts", "data", "image-meta", new_name_meta)
    os.makedirs(os.path.dirname(new_path_meta), exist_ok=True)
    with open(new_path_meta, "w", encoding="utf-8") as f:
        json.dump(image_meta_updates, f, indent=2, ensure_ascii=False)

    print(
        f"Successfully wrote archive updated image metadata JSON file at {new_path_meta}"
    )

    print("done")

    print(
        "--------------------------------------------------------------------------------"
    )
    print(
        f"""
To automatically upload the updated archive information and image
metadata to the CDDL API, run the following commands:

$ node scripts/upload.js --overwrite scripts/data/archive/{new_name_info} archive

This OVERWRITES the existing archive information using the new info
from the CSV.

$ node scripts/upload.js --update scripts/data/image-meta/{new_name_meta} image-meta

This UPDATES the existing image metadata using the new info from the
CSV. Does not overwrite the image meta object since the other fields
can only be found by looking at the original responses from the Kobo
survey.
    """
    )


if __name__ == "__main__":
    main()
