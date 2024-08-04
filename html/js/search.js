const project_collection_name = "JAD"
const main_search_field = "full_text"
const search_api_key = "nxZkKN7Jphnp1mUFjataIhbKzdxEtd1Y"  // custom search only key

const DEFAULT_CSS_CLASSES = {
    searchableInput: "form-control form-control-sm m-2 border-light-2",
    searchableSubmit: "d-none",
    searchableReset: "d-none",
    showMore: "btn btn-secondary btn-sm align-content-center",
    list: "list-unstyled",
    count: "badge m-2 badge-secondary",
    label: "d-flex align-items-center text-capitalize",
    checkbox: "m-2",
}

const typesenseInstantsearchAdapter = new TypesenseInstantSearchAdapter({
    server: {
        apiKey: search_api_key,
        nodes: [
            {
                host: "typesense.acdh-dev.oeaw.ac.at",
                port: "443",
                protocol: "https",
            },
        ],
    },
    additionalSearchParameters: {
        query_by: main_search_field,
    },
});

const searchClient = typesenseInstantsearchAdapter.searchClient;
const search = instantsearch({
    searchClient,
    indexName: project_collection_name,
    routing: {
        router: instantsearch.routers.history(),
        stateMapping: instantsearch.stateMappings.simple(),
      },
});

search.addWidgets([
    instantsearch.widgets.searchBox({
        container: "#searchbox",
        autofocus: true,
        placeholder: 'Search',
        cssClasses: {
            form: "form-inline",
            input: "form-control col-md-11",
            submit: "btn",
            reset: "btn",
        },
    }),

    instantsearch.widgets.hits({
        container: "#hits",
        cssClasses: {
            item: "w-100"
        },
        templates: {
            empty: "No results for <q>{{ query }}</q>",
            item(hit, { html, components }) {
                return html` 
            <h3><a href="${hit.rec_id}">${hit.title}</a></h3>
            <p>${hit._snippetResult.full_text.matchedWords.length > 0 ? components.Snippet({ hit, attribute: 'full_text' }) : ''}</p>`;
            },
        },
    }),

    instantsearch.widgets.pagination({
        container: "#pagination",
    }),

    instantsearch.widgets.clearRefinements({
        container: "#clear-refinements",
        templates: {
            resetLabel: "Reset filters",
        },
        cssClasses: {
            button: "btn",
        },
    }),


    instantsearch.widgets.currentRefinements({
        container: "#current-refinements",
        cssClasses: {
            delete: "btn",
            label: "badge",
        },
    }),

    instantsearch.widgets.stats({
        container: "#stats-container",

    }),


    instantsearch.widgets.panel({
        collapsed: ({ state }) => {
            return state.query.length === 0;
        },
        templates: {
            header: 'Work',
        },
    })(instantsearch.widgets.refinementList)({
        container: "#refinement-list-work ",
        attribute: "work.name",
        searchable: true,
        showMore: true,
        showMoreLimit: 50,
        limit: 10,
        searchablePlaceholder: "Search for works",
        cssClasses: DEFAULT_CSS_CLASSES,
    }),

    instantsearch.widgets.panel({
        collapsed: ({ state }) => {
            return state.query.length === 0;
        },
        templates: {
            header: 'Author',
        },
    })(instantsearch.widgets.refinementList)({
        container: "#refinement-list-author ",
        attribute: "work.author.name",
        searchable: true,
        showMore: true,
        showMoreLimit: 50,
        limit: 10,
        searchablePlaceholder: "Search for authors",
        cssClasses: DEFAULT_CSS_CLASSES,
    }),

    instantsearch.widgets.panel({
        collapsed: ({ state }) => {
            return state.query.length === 0;
        },
        templates: {
            header: 'Date of origin',
        },
    })(instantsearch.widgets.refinementList)({
        container: "#refinement-list-workdate ",
        attribute: "work.written_date",
        searchable: true,
        showMore: true,
        showMoreLimit: 50,
        limit: 10,
        searchablePlaceholder: "Search for dates",
        cssClasses: DEFAULT_CSS_CLASSES,
    }),

    instantsearch.widgets.panel({
        collapsed: ({ state }) => {
            return state.query.length === 0;
        },
        templates: {
            header: 'Manuscript',
        },
    })(instantsearch.widgets.refinementList)({
        container: "#refinement-list-manuscript ",
        attribute: "manuscript.name.value",
        searchable: true,
        showMore: true,
        showMoreLimit: 50,
        limit: 10,
        searchablePlaceholder: "Search for manuscripts",
        cssClasses: DEFAULT_CSS_CLASSES,
    }),

    

    instantsearch.widgets.panel({
        collapsed: ({ state }) => {
            return state.query.length === 0;
        },
        templates: {
            header: 'Language',
        },
    })(instantsearch.widgets.refinementList)({
        container: "#refinement-list-language ",
        attribute: "language.value",
        searchable: true,
        showMore: true,
        showMoreLimit: 50,
        limit: 10,
        searchablePlaceholder: "Search for Languages",
        cssClasses: DEFAULT_CSS_CLASSES,
    }),
    


    instantsearch.widgets.configure({
        hitsPerPage: 10,
        //attributesToSnippet: [main_search_field],
        attributesToSnippet: ["full_text"],
    }),

]);

search.start();