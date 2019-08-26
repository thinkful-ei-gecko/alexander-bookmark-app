'use strict';

let store = {
  bookmarkList: [
    {
      id: 
      title: 'Example 1',
      urlLink: 'http://example1.com',
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
      rating: 3
    },
    {
      title: 'Example 2',
      urlLink: 'http://example2.com',
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
      rating: 3
    },
    {
      title: 'Example 3',
      urlLink: 'http://example3.com',
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
      rating: 3
    }
  ],  

  noBookmarks: function() {
    if this.bookmarkList: false;
  }
  bookmarkAdd: function(bookmarkTitle, bookmarkUrl, bookmarkDescription, bookmarkRating){
    let newBookmark = {
      id: function(){
        //code that prints a unique ID
      }
      title: bookmarkTitle,
      urlLink: bookmarkUrl,
      description: bookmarkDescription,
      rating: bookmarkRating
    }

    this.bookmarkList[]
  },
  detailed: { //changes view of an element when 'expand' button clicked.
    detailedView: false, //false for all items initially.
    toggleDetailed: id //toggle detailedView by id of bookmark whose expand button was clicked.
  },
  ratingFilter: ratingNumber, //Number passed from filter input.
  error: errorCode, errorMessage //Messages passed from error.
};