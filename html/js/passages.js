const dataUrl = "data/passages.json"

var table = new Tabulator("#tabulator-table", {
    ajaxURL: dataUrl, 
    ajaxResponse:function(url, params, response){
        //url - the URL of the request
        //params - the parameters passed with the request
        //response - the JSON object returned in the body of the response.
        let row_data = [...Object.values(response)];
        return row_data;
    },
    autoColumns:true,
    height:400,
    layout:"fitColumns"
});