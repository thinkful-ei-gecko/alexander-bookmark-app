'use strict';

let store = {
  bookmarkList: [
    {
      title: 'Example 1',
      url_link: 'http://example1.com',
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
      rating: 3
    },
    {
      title: 'Example 2',
      url_link: 'http://example2.com',
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
      rating: 3
    },
    {
      title: 'Example 3',
      url_link: 'http://example3.com',
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
      rating: 3
    }
  ],  
  /* Default state on index.html
  * 
  * - detailed:
  * Whether or not the 'condensed' or 'detailed' view is
  * displayed on the DOM.
  * 
  * When true (from false):
  *  - Pulls 'description' & 'url_link' from store.bookmarkList.
  *  - Feeds into html template; returned
  *  - Template inserted into correct list item on DOM.
  */
  detailed: false,
};