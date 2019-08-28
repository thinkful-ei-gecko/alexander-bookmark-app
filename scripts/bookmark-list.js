'use strict';
/* global $ store api */

//Renders individual bookmark listing in condensed format
const bookmarkList = (function(){

  function render() {
    let bookmarks = [...store.bookmarks];

    if (store.ratingFilter.active && store.ratingFilter.minimum !== 0) {
      bookmarks = bookmarks.filter(bookmark => bookmark.rating >= store.ratingFilter.ratingMin);
    }

    const bookmarkTemplate = generateBookmarkTemplate(bookmarks);
    $('#bookmark-list').remove();
    $('#your-bookmarks h2').after(bookmarkTemplate);
  }

  //Toggles an bookmark view from expanded to not.
  // function handleExpandedView(){
  //   console.log('handleExpandedView listening');
  // }

  //Query list by rating, wash your hands.
  function handleFilterList() {
    console.log('handleFilterList listening');
    $('#bookmark-filter-form').submit( (event)=> {
      event.preventDefault();
      let minimum = $('#bookmark-rating').val();
      console.log('handleFilterList fired');
      if (!store.ratingFilter.active) {
        store.ratingFilter.active = true;
        store.ratingFilter.ratingMin = minimum;
        render();
      } else {
        store.ratingFilter.ratingMin = minimum;
        render();
      }
    });
  }

  function handleFilterCancel() {
    $('#cancel-filter').click( () => {
      store.ratingFilter.active = false;
      render();
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
    const bookmarksHtml = bookmarks.map((bookmark) => generateBookmarkElement(bookmark));
    bookmarksHtml.join('');
    return `
    <ul id="bookmark-list">
    ${bookmarksHtml}
    </ul>
    `;
  }

  function generateBookmarkElement(bookmark) {
    //This is expanded view by default for testing.
    let description = '<p class="bookmark-description">No description.</p>';
    if (bookmark.desc){
      description = `<p class="bookmark-description">${bookmark.desc}</p>`;
    }
    let rating = 'Unrated';
    if (bookmark.rating){
      rating = bookmark.rating;
    }

    return `<li data-bookmark-id="${bookmark.id}" class="bookmark">
    <a href="#" class="expand-bookmark"><h3>${bookmark.title}</h3></a>
      <a href="${bookmark.url}">${bookmark.url}</a>
      ${description}
      <span class="rating-title">Rating</span>
      <span class="bookmark-rating" data-rating="${rating}">${rating}</span>
      <button type="button" class="delete-bookmark">Delete</button>
    </li>`;
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
          newBookmark.displayExtended = false;
          console.log(newBookmark);
          store.addBookmark(newBookmark);
          $('#bookmark-title').val('');
          $('#bookmark-url').val('');
          $('#bookmark-rating').val('');
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
    // handleExpandedView();
  }

  return {
    render,
    bindEventListeners,
  };
})();