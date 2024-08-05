from scripts.fetch_data import fetch_data
from scripts.build_static import build_static
from scripts.build_dynamic import build_dynamic
from scripts.fulltext_index import fulltext_index

fetch_data()
build_static()
build_dynamic()
fulltext_index()
