//variables to cache the song categories data
var cache = null;

// Fetches the data and stores it in the cache
function fetchData() {
  return $.getJSON("/database/category.json").then(function (data) {
    //json has a list of songs dictionary with fields: VideoID, Thumbnail and Title
    cache = { response: data };
  });
}

//reads the category.json file and displays the content
function displayContent() {
  var dataPromise;

  if (!cache) {
    dataPromise = fetchData();
  } else {
    // If the cache is not empty, use a resolved promise
    dataPromise = $.Deferred().resolve().promise();
  }

  $("#div_img_video_loader").html(
    `<div id='search_results'></div>`
 );

  dataPromise.then(function () {
    //for each item in the cache array, create search_result_table and append to the search_results div
    cache.response.forEach((item, i) => {
      const search_result = `
        <table class='search_result_table'>
          <th id='index'>${i + 1}.</th>
          <th class='search_result_img'>
            <img src='${item.Thumbnail}'>
          </th>
          <td class='yt_video_title'>${item.Title}</td>
          <td class='yt_video_id' style='display:none;'>${item.VideoID}</td>
        </table>`;

        $("#search_results").append(search_result);
      });

    //these 2 functions are present in youtube.js
    loadYoutubeIframeAPI();
    $(".search_result_table").click(handleSearchResultClick);
  });
}