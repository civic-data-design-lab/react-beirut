#!/usr/bin/env python3

import pandas as pd
import datetime
import argparse
import os

# Creates an argument parser that accepts a csv file as input
parser = argparse.ArgumentParser()
parser.add_argument(
    "csv_filepath",
    help="The path to the CSV file to be converted to json",
)


def arrayify(record):
    """Converts all space separated records into arrays.

    Current space-separated records are:
    * `craft_discipline_category`
    * `craft_discipline`
    * `primary_decade`
    * `images`

    Args:
        record (`pd.Series`): A dataframe record

    Returns:
        `pd.Series`: The same record, but with all space separated values converted to arrays
    """
    for key in [
        "craft_discipline",
        "craft_discipline_category",
        "primary_decade",
        "images",
    ]:
        try:
            split_list = record[key].split()
            if key == "primary_decade":
                record[key] = [int(x) for x in split_list]
            else:
                record[key] = split_list
        except AttributeError:
            record[key] = []
    return record

# Reads the csv file and converts it to a dataframe
args = parser.parse_args()
path = args.csv_filepath
archive_df = pd.read_csv(path)

print(f"Successfully read CSV file at {path}")

# Converts all space separated values to arrays
arrayified = archive_df.apply(arrayify, axis=1)

# Saves the dataframe to a json file
new_name = f"archive-info-{datetime.datetime.now().strftime('%Y-%m-%d-%H-%M-%S')}.json"
new_path = os.path.join("scripts", "data", "archive", new_name)
arrayified.to_json(
    new_path,
    orient="records",
    force_ascii=False,
    indent=2,
)

print(f"Successfully wrote JSON file at {new_path}")
