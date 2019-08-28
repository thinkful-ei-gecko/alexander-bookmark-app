'use strict';
/* global $ bookmarkList */

const store = (function() {

  const addBookmark = function(bookmark){
    this.bookmarks.push(bookmark);
    bookmarkList.render();
  };

  const findById = function(id) {
    return this.bookmarks.find(bookmark => bookmark.id === id);
  };

  const findAndDelete = function(id) {
    this.bookmarks = this.bookmarks.filter(bookmark => bookmark.id !== id);
  };

  const toggleFormTemplate = function() {
    console.log('addFormTemplate firing up');
    const addFormTemplate = `
      <form id="bookmark-add-form">
        <label for="bookmark-title" class="bookmark-label">Title</label>
        <input id="bookmark-title" name="bookmark-title" class="bookmark-text-input" type="text" placeholder="Title (Valid string)" required>
        
        <label for="bookmark-url" class="bookmark-label">Url</label>
        <input id="bookmark-url" name="bookmark-url" class="bookmark-text-input" type="text" placeholder="Url (Validate string in url format, sanitized)" required>
  
        <fieldset id="bookmark-rating"><legend>Rating</legend>
          <input type="radio" name="bookmark-rating" value="1">1</option>
          <input type="radio" name="bookmark-rating" value="2">2</option>
          <input type="radio" name="bookmark-rating" value="3">3</option>
          <input type="radio" name="bookmark-rating" value="4">4</option>
          <input type="radio" name="bookmark-rating" value="5">5</option>
        </select>
        </fieldset>

        <label for="bookmark-description" class="bookmark-label">Description</label>
        <textarea id="bookmark-description" name="bookmark-description" class="bookmark-text-area" rows="4" cols="50" placeholder="A short description goes here."></textarea>
        
        <button type="submit">Add Bookmark</button>
      </form>
      `;
      //If no form, add; else remove added form.
    if ( $('#bookmark-add-form').length ) {
      $('#bookmark-add-form').remove();
    } else {
      $('#bookmark-add a').after(addFormTemplate);
    }
  };

  const bookmarkAdd = function(newBookmark){
    console.log('bookmarkAdd firing.');
    this.bookmarkList.push(newBookmark);
    console.log('bookmark pushed.');
  };

  const setError= function(error){
    $('main').prepend(`Error message: ${error}`);
  };

  return {
    bookmarks: [],
    ratingFilter: { active: false, ratingMin: 0},
    addBookmark,
    findAndDelete,
    toggleFormTemplate,
    setError
  };
})();