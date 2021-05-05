import SearchPopup from '../../components/SearchPopup/SearchPopup.pug';
import SearchItem from '../../components/SearchItem/SearchItem.pug';
import { getSearchResults } from '../../modules/http.js';

export class SearchPopupComponent {
    constructor(root) {
        this.render(root);
        this.setEventListeners(root);
        const body = document.body;
        body.style.overflow = 'hidden';
    }

    render = (root) => {
        const template = SearchPopup();
        root.innerHTML = template;
    }

    setEventListeners = (root) => {
        root.addEventListener(('click'), (event) => {
            event.stopPropagation();
        });

        const popupClose = document.querySelector('.popup__close');
        popupClose.addEventListener(('click'), (event) => {
            event.preventDefault();
            document.body.style.overflow = 'visible';
            root.firstChild.remove();
        });

        const searchInput = document.querySelector('.search-wrapper__input');
        searchInput.addEventListener(('input'), (event) => {
            const searchInputValue = event.target.value.trim();
            if (searchInputValue.length > 0) {
                getSearchResults(searchInputValue).then((results) => {
                    const searchResultBody = document.querySelector('.search-results__body');
                    searchResultBody.innerHTML = '';
                    results.movies?.forEach((searchItem) => {
                        searchItem.isMovie = true;
                        searchResultBody.innerHTML += SearchItem(searchItem);
                    });
                    results.actors?.forEach((searchItem) => {
                        searchItem.isMovie = false;
                        searchResultBody.innerHTML += SearchItem(searchItem);
                    });
                });
            }
        });
    }
}