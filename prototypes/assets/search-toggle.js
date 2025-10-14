const MarinSearch = {
  init: function () {
      const searchForm = document.getElementById('searchFormBlock');
      const searchButton = document.getElementById('marinSearchToggle');
      let container;

      if (searchForm) {
        container = searchForm.closest('.block-marin-swiftype');
        container.style.display = 'none';
        searchButton.setAttribute('aria-expanded', 'false');
      } else {
        searchButton.removeAttribute('aria-expanded');

        const toggleText = searchButton.querySelector('span.sr-only');

        if (toggleText) {
          toggleText.innerText = 'Focus';
        }

        const closeIcon = searchButton.querySelector('.marin-search-icon-close');

        if (closeIcon) {
          closeIcon.parentNode.removeChild(closeIcon);
        }

        const titleText = searchButton.querySelector('title');

        if (titleText) {
          titleText.innerText = 'Focus Search';
        }
      }

      searchButton.addEventListener('click', function () {
        if (searchForm && container) {
          if (container.style.display === 'none') {
            container.style.display = 'block';
            searchButton.setAttribute('aria-expanded', 'true');
          } else {
            container.style.display = 'none';
            searchButton.setAttribute('aria-expanded', 'false');
          }
        }

        // Find the input element and focus
        const input = document.getElementById('query');
        if (input) {
          input.focus();
        }
      });
  }
};

document.addEventListener("DOMContentLoaded", MarinSearch.init);
