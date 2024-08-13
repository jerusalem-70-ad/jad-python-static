import json
import os

import requests


LIST_VIEW_CONF = [
    {
        "data_source": "data/works",
        "verbose_name_pl": "Works",
        "verbose_name_sg": "Work",
        "file_name": "works",
    },
    {
        "data_source": "data/passages",
        "verbose_name_pl": "Passages",
        "verbose_name_sg": "Passage",
        "file_name": "passages",
    },
    {
        "data_source": "json_dumps/authors",
        "verbose_name_pl": "Authors",
        "verbose_name_sg": "Author",
        "file_name": "authors",
    },
]

MAIN_DATA_FILE = "passages.json"
GH_URL = "https://raw.githubusercontent.com/jerusalem-70-ad/jad-baserow-dump/main/"
DATA_DIR = os.path.join("html", "data")


def fetch_data():

    os.makedirs(DATA_DIR, exist_ok=True)

    for x in LIST_VIEW_CONF:
        url = f"{GH_URL}{x['data_source']}.json"
        print(url)
        data = requests.get(url).json()
        save_path = os.path.join(DATA_DIR, f'{x["file_name"]}.json')
        print(f"downloading {url} and saving it to {save_path}")
        with open(save_path, "w", encoding="utf-8") as fp:
            json.dump(data, fp, ensure_ascii=False)


if __name__ == "__main__":
    fetch_data()
