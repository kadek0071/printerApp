import InstantSearch from "./instantSearch.js";

const searchContent = document.querySelector("#searchContent");

const instantSearchContent = new InstantSearch(searchContent, {
    searchUrl: new URL("login/DATABASE_HAND/search", window.location.origin),
    queryParam: "search",
    responseParser: (responseData) => {
        return responseData.results;
    },
    templateFunction: (result) => {
        return `
            <div class="instant-search__title">${result[1]}</div>
            <p class="instant-search__paragraph">${result[2]}</p>
        `;
    }
});
