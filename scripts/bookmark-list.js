'use strict';
/* global $ store api */

//Renders individual bookmark listing in condensed format
function listRender() {
  console.log('listRender firing up');
  let bookmarks = [...store.bookmarkList()];
}

/* Handlers */
//Renders bookmark list
// function bookmarkListRender() {
//   console.log('listRender firing');
// }

//Toggles an bookmark view from expanded to not.
// function handleExpandedView(){
//   console.log('handleExpandedView listening');
// }

//Query list by rating, wash your hands.
// function handleFilterList() {
//   console.log('handleFilterList listening');
// }

//Toggle bookmark form, add bookmark from form, wash your hands.
function handleAddBookmark() {
  $('#bookmark-add a').click( () => {
    console.log('addBookmark listening');
    store.toggleFormTemplate();
    submitAddBookmark();
  });
}

//Renders add form
function submitAddBookmark() {
  $('#bookmark-add-form').submit(function(event) {
    event.preventDefault();
    let title = $('#bookmark-title').val();
    let linkUrl = $('#bookmark-url').val();
    let rating = $('input[name=bookmark-rating]:checked').val();
    let description = $('#bookmark-description').val();

    //test read okay
    // console.log(title, linkUrl, rating, description);

    //create bookmark method
    api.createBookmark(title, linkUrl, description, rating)
      .then(res => res.json())
      .then( (newItem) => {
        store.addItem(newItem);
        $('#bookmark-title').val('');
        $('#bookmark-url').val('');
        $('#bookmark-rating').val('');
        $('#bookmark-description').val('');
        // renderList();
      })
      .catch(err => {
        //console.log(err);
        store.setError(err);
        // renderList();
      });

    console.log('bookmark submitted!(in theory)');
  });
}

//Removes a bookmark, wash your hands.
// function handleDeleteBookmark(){
//   console.log('handleDeleteBookmark is listening');
// }

function handleEvents() {
  handleAddBookmark();
  // handleFilterList();
  // handleExpandedView();
  // handleDeleteBookmark();
}

$(handleEvents());