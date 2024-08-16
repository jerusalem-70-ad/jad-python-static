import json
import os

import requests


MODEL_CONFIG = [
    {
        "data_source": "data/manuscripts",
        "verbose_name_pl": "Manuscripts",
        "verbose_name_sg": "Manuscript",
        "file_name": "manuscripts",
        "label_field": "name",
        "related_objects": [
            {
                "source_file": "passages",
                "lookup_field": "manuscript",
                "label_field": "passage",
            },
        ],
    },
    {
        "data_source": "data/works",
        "verbose_name_pl": "Works",
        "verbose_name_sg": "Work",
        "file_name": "works",
        "label_field": "title",
        "related_objects": [
            {
                "source_file": "passages",
                "lookup_field": "work",
                "label_field": "passage",
            }
        ],
    },
    {
        "data_source": "data/passages",
        "verbose_name_pl": "Passages",
        "verbose_name_sg": "Passage",
        "file_name": "passages",
        "label_field": "short_passage",
    },
    {
        "data_source": "json_dumps/authors",
        "verbose_name_pl": "Authors",
        "verbose_name_sg": "Author",
        "file_name": "authors",
        "label_field": "name",
        "related_objects": [
            {"source_file": "works", "lookup_field": "author", "label_field": "name"}
        ],
    },
]

MAIN_DATA_FILE = "passages.json"
GH_URL = "https://raw.githubusercontent.com/jerusalem-70-ad/jad-baserow-dump/main/"
DATA_DIR = os.path.join("html", "data")


def fetch_data():

    os.makedirs(DATA_DIR, exist_ok=True)

    for x in MODEL_CONFIG:
        url = f"{GH_URL}{x['data_source']}.json"
        print(url)
        data = requests.get(url).json()
        save_path = os.path.join(DATA_DIR, f'{x["file_name"]}.json')
        print(f"downloading {url} and saving it to {save_path}")
        if x["file_name"] == "manuscripts":
            for _, value in data.items():
                value[x["label_field"]] = value["name"][0]["value"]
        with open(save_path, "w", encoding="utf-8") as fp:
            json.dump(data, fp, ensure_ascii=False)


def add_related_objects():
    for x in MODEL_CONFIG:
        try:
            rel_obj = x["related_objects"]
        except KeyError:
            continue
        save_path = os.path.join(DATA_DIR, f'{x["file_name"]}.json')
        with open(save_path, "r") as fp:
            source_data = json.load(fp)

        for item in rel_obj:
            source_file = item["source_file"]
            lookup_field = item["lookup_field"]
            label_field = item["label_field"]

            feed_path = os.path.join(DATA_DIR, f"{source_file}.json")
            with open(feed_path, "r") as fp:
                feed_data = json.load(fp)

            for key, value in source_data.items():
                jad_id = value["jad_id"]
                related_items = []
                for _, rel_value in feed_data.items():
                    for m in rel_value[lookup_field]:
                        if m["jad_id"] == jad_id:
                            related_items.append(
                                {
                                    "jad_id": rel_value["jad_id"],
                                    "label": rel_value[label_field],
                                }
                            )
                            break
                value[f"related__{source_file}"] = related_items
        with open(save_path, "w", encoding="utf-8") as fp:
            json.dump(source_data, fp, ensure_ascii=True)


if __name__ == "__main__":
    fetch_data()
    add_related_objects()
