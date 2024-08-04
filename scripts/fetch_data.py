import json
import os

import requests

MAIN_DATA_FILE = "passages.json"
GH_URL = "https://raw.githubusercontent.com/jerusalem-70-ad/jad-baserow-dump/main/data/"
FILE_LIST = [
    MAIN_DATA_FILE,
]
DATA_DIR = os.path.join("html", "data")


def fetch_data():

    os.makedirs(DATA_DIR, exist_ok=True)

    for x in FILE_LIST:
        url = f"{GH_URL}{x}"
        print(url)
        data = requests.get(url).json()
        save_path = os.path.join(DATA_DIR, x)
        print(f"downloading {url} and saving it to {save_path}")
        with open(save_path, "w", encoding="utf-8") as fp:
            json.dump(data, fp, ensure_ascii=False)


if __name__ == "__main__":
    fetch_data()
