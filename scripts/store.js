'use strict';
/* global $ bookmarkList */

const store = (function() {

  function _decorateBookmark( bookmark ) {
    return Object.assign( bookmark, { expanded: false });
  }

  const addBookmark = function(bookmark){
    this.bookmarks.push(_decorateBookmark(bookmark));
  };

  const toggleExpandedView = function(bookmark) {
    return bookmark.expanded = !bookmark.expanded;
  };

  const findById = function(id) {
    return this.bookmarks.find(bookmark => bookmark.id === id);
  };

  const findAndDelete = function(id) {
    this.bookmarks = this.bookmarks.filter(bookmark => bookmark.id !== id);
  };

  const ratingActiveToggle = function() {
    console.log('rating toggle firing!');
    return this.ratingFilter.active = !this.ratingFilter.active;
    // console.log(this.ratingFilter.active);
  };

  const ratingMinimumReset = function(newMinimum) {
    this.ratingFilter.ratingMin = newMinimum;
  };

  const toggleFormTemplate = function() {
    this.showAddFormTemplate = !this.showAddFormTemplate;
  };

  const setError= function(error){
    $('.error').remove();
    $('main').prepend(`<p class="error">Error: ${error}</p>`);
  };

  return {
    bookmarks: [],
    ratingFilter: { active: false, ratingMin: 0},
    ratingActiveToggle,
    ratingMinimumReset,
    showAddFormTemplate: false,
    toggleFormTemplate,
    addBookmark,
    findAndDelete,
    toggleExpandedView,
    setError,
    findById
  };
})();