'use strict';
/* global $ */

const store = (function() {
  const bookmarkList = [
    {
      id: 'someuniqueid1',
      title: 'Example 1',
      urlLink: 'http://example1.com',
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
      rating: 3
    },
    { 
      id: 'someuniqueid3',
      title: 'Example 2',
      urlLink: 'http://example2.com',
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
      rating: 3
    },
    {
      id: 'someuniqueid2',
      title: 'Example 3',
      urlLink: 'http://example3.com',
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
      rating: 3
    }
  ];  

  const noBookmarks = function() {
    // if this.bookmarkList: false;
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
          <input type="radio" name="bookmark-rating" value="1" required>1</option>
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

  return {
    toggleFormTemplate
  };
})();