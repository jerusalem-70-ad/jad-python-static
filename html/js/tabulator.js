const colConf = {
    "passages": [
        { title: "ID", field: "jad_id", visible: false },
        { title: "Quote", field: "passage", formatter: "textarea", headerFilter: "input", minWidth: 400 },
        { title: "Work", field: "work", mutator: mutateM2mField, mutatorParams: { labelField: "name" }, headerFilter: "input" },
        { title: "Bible", field: "biblical_references", mutator: mutateSelectField, headerFilter: "input" },
        { title: "Language", field: "language", mutator: mutateSingleSelectField, headerFilter: "list", headerFilterParams: { valuesLookup: true, clearable: true } },
    ],
    "authors": [
        { title: "ID", field: "jad_id", visible: false },
        { title: "Name", field: "name", headerFilter: "input", minWidth: 400 },
        { title: "GND", field: "gnd_url", headerFilter: "input" },
    ],
    "works": [
        { title: "ID", field: "jad_id", visible: false },
        { title: "Name", field: "name", headerFilter: "input", minWidth: 400 },
        { title: "Author", field: "author", mutator: mutateM2mField, mutatorParams: { labelField: "name" }, headerFilter: "input" },
        { title: "Manuscripts", field: "manuscripts", mutator: mutateM2mField, mutatorParams: { labelField: "value" }, headerFilter: "input" },
    ]
}

var table = new Tabulator("#tabulator-table", {
    ajaxURL: dataUrl,
    ajaxResponse: function (url, params, response) {
        let row_data = [...Object.values(response)];
        return row_data;
    },
    height: 600,
    layout: "fitColumns",
    responsiveLayout: "collapse",
    columns: colConf[configKey]
});

table.on("rowClick", function (e, row) {
    var data = row.getData();
    var url = `${data["jad_id"]}.html`
    window.open(url);
});