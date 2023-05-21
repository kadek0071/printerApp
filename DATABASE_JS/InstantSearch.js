/**
 * @typedef {Object} InstantSearchOptions
 * @property {URL} searchUrl URL z którego pobrane zostaną wyniki
 * @property {string} queryParam Nazwa parametru wyszukiwania
 * @property {Function} responseParser Zbiera wyniki wyszukiwania
 * @property {Function} templateFunction Bierze wyniki wyszukiwania i umieszcza w HTML
 */

class InstantSearch {

    /**
     * Inicjalizuje pasek wyszukiwania. Zwraca i tworzy elementy.
     * 
     * @param {HTMLElement} instantSearch Kontener elementów HTML do szybkiego wyszukiwania 
     * @param {InstantSearchOptions} options Lista opcji konfiguracyjnych
     */

    constructor(instantSearch, options){
        this.options = options;
        this.elements = {
            main: instantSearch,
            input: instantSearch.querySelector("#search-input"),
            resultContainer: document.createElement("div")
        };

        this.elements.resultContainer.classList.add("instant-search__results-container");
        this.elements.main.appendChild(this.elements.resultContainer);

        this.addListeners();

    }

    /**
     * Dodaje event listeners dla elementów szybkiego wyszukiwania
     */

    addListeners(){
        let delay;

        this.elements.input.addEventListener("input", () => {
            clearTimeout(delay);
            
            const query = this.elements.input.value;
            
            delay = setTimeout(() => {
                if(query.length < 3){
                    this.populateResults([]);
                    return;
                }

                this.performSearch(query).then(results => {
                    this.populateResults(results);
                });
                
            }, 500);
        });

        this.elements.input.addEventListener("focus", () => {
            this.elements.resultContainer.classList.add("instant-search__results-container--visible");
        });

        this.elements.input.addEventListener("blur", () => {
            this.elements.resultContainer.classList.remove("instant-search__results-container--visible");
        });

    }

    

    /**
     * Aktualizuje HTML, by wyświetlał wyniki
     * 
     * @param {Object[]} results 
     */

    populateResults(results){

        //Wyczyść istniejące elementy

        while(this.elements.resultContainer.firstChild){
            this.elements.resultContainer.removeChild(this.elements.resultContainer.firstChild);
        }

        //Zaaktualizuj listę wyników pod paskiem wyszukiwania

        for(const result of results){
            this.elements.resultContainer.appendChild(this.createResultElement(result));
        }

    }

    /**
     * Tworzy HTML w celu wyświetlenia pojedynczego wyniku
     * 
     * @param {Object} result natychmiastowy wynik wyszukiwania
     * @returns {HTMLAnchorElement}
     */

     createResultElement(result){
        const anchorElement = document.createElement("a");
        anchorElement.classList.add("instant-search__result");
        anchorElement.addEventListener("click", () => {
            load_specific_content(result[0]);
        });
        anchorElement.insertAdjacentHTML("afterbegin", this.options.templateFunction(result));

        // Jeśli jest, dodaj link do elementu

        if("href" in result){
            anchorElement.setAttribute("href", result.href);
        }

        return anchorElement;
    }

    /**
     * Tworzy zapytanie i zbiera wyniki
     * 
     * @param {string} query Search query
     * @returns {Promise<Object[]>}
     */

    performSearch(query){

        const url = new URL(this.options.searchUrl.toString());

       // url.searchParams.set(this.options.queryParam, query);

        this.setLoading(true);

        ///////One way of sending vars

        /*
        const data = {
			action: "instant_search",
            search: query
		};

        const options = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        };


        return fetch(url, options)
        .then(response => {

            if(response.status !== 200){
                throw new Error("Wystąpił błąd wyszukiwania.");
            }
            return response.json();

        }).then(responseData => {           
            //console.log('Success:', responseData);

            return this.options.responseParser(responseData);

        }).catch((error) => {
            console.error('Error:', error);
            return [];
        }).finally(results => {
            this.setLoading(false);

            return results;
        });
        */

        let formData = new FormData();

        formData.append("action", "instant_search");
        formData.append("search", query);

        const options = {
            method: 'POST',
            mode: 'cors',
            body: formData
        };

        let req = new Request(url, options);

        return fetch(req)
        .then(response => {
            if(response.status !== 200){
                throw new Error("Wystąpił błąd wyszukiwania.");
            }
            return response.json();

        }).then(responseData => {           
            //console.log('Success:', responseData);

            return this.options.responseParser(responseData);

        }).catch((error) => {
            console.error('Error:', error);
            return [];
        }).finally(results => {
            this.setLoading(false);

            return results;
        });

    }

    /**
     * Pokazuje lub chowa pasek ładowania
     * 
     * @param {boolean} b True zainicjuje pasek ładowania, false nie
     */

    setLoading(b){
        this.elements.main.classList.toggle("search-wrap--loading", b);
    }

}

export default InstantSearch;