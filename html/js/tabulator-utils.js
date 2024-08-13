function mutateSelectField(value, data, type, params, component) {
    let output = value
        .map((item) => {
            return `${item.value}`;
        })
        .join("/");
    return `${output}`;
}

function mutateSingleSelectField(value, data, type, params, component) {
    let output = value.value
    return `${output}`;
}

function mutateM2mField(value, data, type, params, component) {
    let labelField = params.labelField
    console.log(labelField)
    let names = [];

    value.forEach(item => {
        // Add the main name
        if (item[labelField]) {
            names.push(item[labelField]);
        }
    });
    console.log(names)
    return names.join(" ")


}