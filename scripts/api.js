'use strict';

const api = (function(){
  const baseUrl = 'http://thinkful-list-api.herokuapp.com/fukui';

  function listApiFetch(...args){
    let error = false;
    return fetch(...args)
      .then(results => {
        if (!results.ok) {
          error = true;
        }
        return results.json();
      })
      .then( data => {
        if (error) {
          return Promise.reject(data.message);
        }
        return data;
      })
      .catch( error => {
        return Promise.reject(error);
      });
  }

  // function getList(){
  //   return listApiFetch(`${baseUrl}/bookmarks`);
  // }

  function createBookmark(newTitle, newUrlLink, newDescription, newRating) {
    const newBookmark = {
      title: newTitle,
      urlLink: newUrlLink,
      description: newDescription,
      rating: newRating
    };
    console.log(newBookmark);
    return listApiFetch( `${this.baseURL}/bookmarks`, {
      method: 'POST',
      headers: {'Content-Type':'application/json'},
      body: newBookmark
    });
  }

  return {
    // getList,
    createBookmark
  };
})();