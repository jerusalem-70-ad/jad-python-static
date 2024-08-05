import os
import jinja2
import json

try:
    from .build_static import out_dir
except ImportError:
    from build_static import out_dir

try:
    from .fetch_data import MAIN_DATA_FILE, DATA_DIR
except ImportError:
    from fetch_data import MAIN_DATA_FILE, DATA_DIR

templateLoader = jinja2.FileSystemLoader(searchpath=".")
templateEnv = jinja2.Environment(loader=templateLoader)


def build_dynamic():
    with open("project.json", "r", encoding="utf-8") as f:
        project_data = json.load(f)

    print("#########################")
    print("building edition pages")

    with open(os.path.join(DATA_DIR, MAIN_DATA_FILE), "r", encoding="utf-8") as f:
        items = json.load(f)

    os.makedirs(out_dir, exist_ok=True)
    page_template = templateEnv.get_template("./templates/dynamic/passage_template.j2")

    key_list = sorted(items.keys())
    for i, v in enumerate(key_list):
        prev_item = items[key_list[i - 1]]["jad_id"]
        try:
            next_item = items[key_list[i + 1]]["jad_id"]
        except IndexError:
            next_item = items[key_list[0]]
        value = items[key_list[i]]

        output_path = os.path.join(out_dir, f'{value["jad_id"]}.html')
        with open(output_path, "w", encoding="utf-8") as f:
            data = value
            passage = value["passage"]
            if len(passage) >= 35:
                data["short_passage"] = f"{passage[:35]}..."
            else:
                data["short_passage"] = passage
            data["prev"] = f"{prev_item}.html"
            data["next"] = f"{next_item}.html"

            f.write(page_template.render({"project_data": project_data, "data": data}))


if __name__ == "__main__":
    build_dynamic()
