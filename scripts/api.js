'use strict';

const api = (function(){
  const baseUrl = 'https://thinkful-list-api.herokuapp.com/fukui';

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

  function getList(){
    return listApiFetch(`${baseUrl}/bookmarks`);
  }

  function createBookmark(bookmark) {
    let newBookmark = JSON.stringify(bookmark);
    console.log(newBookmark);
    // console.log(newBookmark);
    return listApiFetch( 'https://thinkful-list-api.herokuapp.com/fukui/bookmarks', {
      method: 'POST',
      headers: {
        'Content-Type':'application/json'
      },
      body: newBookmark
    });
  }

  function deleteBookmark(id) {
    return listApiFetch( `https://thinkful-list-api.herokuapp.com/fukui/bookmarks/${id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type':'application/json'
      }
    });
  }


  return {
    getList,
    createBookmark,
    deleteBookmark
  };
})();