'use strict';
/* global bookmarkList, store, api $ */

$(document).ready(function() {
  bookmarkList.render();
  bookmarkList.bindEventListeners();

  api.getList().then(bookmarks => {
    bookmarks.forEach(bookmark => store.addBookmark(bookmark));
    bookmarkList.render();
  });

});