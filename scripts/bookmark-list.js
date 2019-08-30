'use strict';
/* global $ store api */

//Renders individual bookmark listing in condensed format
const bookmarkList = (function(){

  function render() {
    let bookmarks = [...store.bookmarks];

    //filter to minimum value
    if (store.ratingFilter.active && store.ratingFilter.ratingMin >= 1) {
      console.log(store.ratingFilter.ratingMin);
      bookmarks = bookmarks.filter(bookmark => bookmark.rating >= store.ratingFilter.ratingMin);
      console.log(bookmarks);
    }

    //filter to unrated bookmarks
    if (store.ratingFilter.active && store.ratingFilter.ratingMin === 'unrated') {
      console.log('unrated rating select working!');
      bookmarks = bookmarks.filter(bookmark => bookmark.rating === null);
    }

    const bookmarkTemplate = generateBookmarkTemplate(bookmarks);
    $('#bookmark-list').remove();
    $('#your-bookmarks h2').after(bookmarkTemplate);
  }

  //Query list by rating, wash your hands.
  function handleFilterList() {
    console.log('handleFilterList listening');
    $('#bookmark-filter-form').submit( (event)=> {
      event.preventDefault();
      let minimum = $('#bookmark-rating').val();
      console.log(minimum);
      //When minimum is set and filter isn't already active, activate filter and set minimum, then render.
      if ( ( minimum >= 1 || minimum ==='unrated') && store.ratingFilter.active === false) {
        store.ratingFilter.active = !store.ratingFilter.active;
        store.ratingFilter.ratingMin = minimum;
        render();
      }
      //When minimum is set and filter is active, don't touch filter activation but reset minimum, then render.
      if (store.ratingFilter.active && minimum !== store.ratingFilter.ratingMin) {
        store.ratingFilter.ratingMin = minimum;
        render();
      }
      //When minimum is unset and filter is active, change filter activation and unset minimum in store, then render.
      if (store.ratingFilter.active && minimum === 'reset'){
        store.ratingFilter.active = !store.ratingFilter.active;
        store.ratingFilter.ratingMin = minimum;
        render();
      }
      //initial fire condition when minimum isn't set
      if (store.ratingFilter.active) {
        $('option[value="reset"]').html('Unset Filter');
      }
      if (!store.ratingFilter.active) {
        $('option[value="reset"]').html('Set Filter Here');
      }

    });
  }

  //Toggle bookmark form, add bookmark from form, wash your hands.
  function handleAddBookmark() {
    $('#bookmark-add a').click( () => {
      store.toggleFormTemplate();
      //Listens for bookmark submit.
      handleSubmitAddBookmark();
    });
  }

  function getIdFromElement(bookmark) {
    return $(bookmark)
      .closest('.bookmark')
      .data('bookmark-id');
  }

  function handleExpandedView() {
    $('#your-bookmarks').on('click', '.toggle-expand', event => {
      console.log('I work!');
      const id = getIdFromElement(event.currentTarget);
      const bookmark = store.findById(id);
      store.toggleExpandedView(bookmark);
      render();
    });
  }


  function handleDeleteBookmark() {
    console.log('handleDeleteBookmark listening');
    $('#your-bookmarks').on('click', '.delete-bookmark', event => {
      // get the index of the item in store.items
      console.log('delete bookmark firing');
      const id = getIdFromElement(event.currentTarget);
      // delete the item
      api.deleteBookmark(id)
        .then(() => {
          store.findAndDelete(id);
          // render the updated bookmark list
          render();
        })
        .catch(err => {
          store.setError(err);
          render();
        });
    });
  }

  function generateBookmarkTemplate(bookmarks) {
    if (!bookmarks.length) {
      $('#empty-list').remove();
      return '<p id="empty-list">There are no bookmarks. Add one to get started!</p>';
    } else {
      $('#empty-list').remove();
      const bookmarksHtml = bookmarks.map((bookmark) => generateBookmarkElement(bookmark));
      bookmarksHtml.join(' ');
      return `
    <ul id="bookmark-list">
    ${bookmarksHtml}
    </ul>
    `;
    }
  }

  //This could be configured DRYer...
  function generateBookmarkElement(bookmark) {
    if (bookmark.expanded) {
      let description = '<p class="bookmark-description">No description.</p>';
      if (bookmark.desc){
        description = `<p class="bookmark-description">${bookmark.desc}</p>`;
      }
      let rating = 'Unrated';
      if (bookmark.rating){
        rating = bookmark.rating;
      }
      return `<li data-bookmark-id="${bookmark.id}" class="bookmark">
      <a class="toggle-expand"><img src="images/expanded.svg"><h3>${bookmark.title}</h3></a>
        <a href="${bookmark.url}" class="bookmark-url">${bookmark.url}</a>
        ${description}
        <span class="rating-title">
          Rating:
          <span class="bookmark-rating" data-rating="${rating}">${rating}</span>
        </span>
        <button type="button" class="delete-bookmark">Delete</button>
      </li>`;
    } else {
      let rating = 'Unrated';
      if (bookmark.rating){
        rating = bookmark.rating;
      }
      return `<li data-bookmark-id="${bookmark.id}" class="bookmark">
      <a class="toggle-expand"><img src="images/condensed.svg"><h3>${bookmark.title}</h3></a>
      <span class="rating-title">
      Rating:
      <span class="bookmark-rating" data-rating="${rating}">${rating}</span>
    </span>
        <button type="button" class="delete-bookmark">Delete</button>
      </li>`;
    }
  }

  //Renders add form
  function handleSubmitAddBookmark() {
    $('#bookmark-add-form').submit( (event) => {
      event.preventDefault();
      let newTitle = $('#bookmark-title').val();
      let newLinkUrl = $('#bookmark-url').val();
      let newRating = $('input[name=bookmark-rating]:checked').val();
      let newDescription = $('#bookmark-description').val();
      let newBookmark = {
        title: newTitle,
        url: newLinkUrl,
        desc: newDescription,
        rating: newRating,
      };

      //create bookmark method
      api.createBookmark(newBookmark)
        .then( (newBookmark) => {
          console.log(newBookmark);
          store.addBookmark(newBookmark);
          $('#bookmark-title').val('');
          $('#bookmark-url').val('');
          $('input[name=bookmark-rating]:checked').prop('checked', false);
          $('#bookmark-description').val('');
          render();
        })
        .catch(error => {
          console.log('the error is: ' + error);
          store.setError(error);
          // renderList();
        });

      console.log('bookmark submitted!(in theory)');
    });
  }

  function bindEventListeners() {
    handleAddBookmark();
    handleFilterList();
    handleDeleteBookmark();
    handleExpandedView();
  }

  return {
    render,
    bindEventListeners,
  };
})();