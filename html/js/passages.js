const dataUrl = "data/passages.json"

const colConf = [
    { title: "ID", field: "jad_id", visible: false },
    { title: "Quote", field: "passage", formatter: "textarea", headerFilter: "input", minWidth: 400 },
    { title: "Work", field: "work", mutator:mutateM2mField, mutatorParams: {labelField: "name"}, headerFilter: "input" } ,
    { title: "Bible", field: "biblical_references", mutator: mutateSelectField, headerFilter: "input" },
    { title: "Language", field: "language", mutator: mutateSingleSelectField, headerFilter: "list", headerFilterParams: { valuesLookup: true, clearable: true } },
]

var table = new Tabulator("#tabulator-table", {
    ajaxURL: dataUrl,
    ajaxResponse: function (url, params, response) {
        let row_data = [...Object.values(response)];
        return row_data;
    },
    height: 600,
    layout: "fitColumns",
    responsiveLayout:"collapse",
    columns: colConf
});

table.on("rowClick", function(e, row){
    var data = row.getData();
    var url = `${data["jad_id"]}.html`
    window.open(url);
});