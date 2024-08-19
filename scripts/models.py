MODEL_CONFIG = [
    {
        "data_source": "data/manuscripts",
        "verbose_name_pl": "Manuscripts",
        "verbose_name_sg": "Manuscript",
        "file_name": "manuscripts",
        "label_lookup_expression": "$.name[0].value",
        "related_objects": [
            {
                "source_file": "passages",
                "lookup_field": "manuscript",
            },
        ],
    },
    {
        "data_source": "data/works",
        "verbose_name_pl": "Works",
        "verbose_name_sg": "Work",
        "file_name": "works",
        "label_lookup_expression": "$.title",
        "related_objects": [
            {
                "source_file": "passages",
                "lookup_field": "work",
            }
        ],
    },
    {
        "data_source": "data/passages",
        "verbose_name_pl": "Passages",
        "verbose_name_sg": "Passage",
        "file_name": "passages",
        "label_lookup_expression": "$.passage",
    },
    {
        "data_source": "json_dumps/authors",
        "verbose_name_pl": "Authors",
        "verbose_name_sg": "Author",
        "file_name": "authors",
        "label_lookup_expression": "$.name",
        "related_objects": [{"source_file": "works", "lookup_field": "author"}],
    },
]


ID_FIELD = "jad_id"
