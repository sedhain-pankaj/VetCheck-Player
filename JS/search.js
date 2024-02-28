//search on the cache for the searchValue
$(function () {
  $("#search").keyup(function () {
    var searchValue = $("#search").val();
    var filteredResults = [];

    // Guard clause for empty input field
    if (searchValue == "") {
      displayContent();
      return;
    }

    //search on the cache for the searchValue
    if (cache && cache.response) {
      cache.response.forEach((item, i) => {
        // Compare the title's text content in lowercase with the search value
        if (item.Title.toLowerCase().includes(searchValue.toLowerCase())) {
          var regex = new RegExp(searchValue, "gi");
          var highlightedTitle = item.Title.replace(
            regex,
            (match) =>
              `<span style="background-color: #ffff99;">${match}</span>`
          );
          filteredResults.push({
            index: i + 1,
            Thumbnail: item.Thumbnail,
            Title: highlightedTitle,
            VideoID: item.VideoID,
          });
        }
      });
    }

    // Guard clause for no results
    if (filteredResults.length === 0) {
      $("#div_img_video_loader").html(
        "<h3>No results found for your search <br>" +
          "'" +
          searchValue +
          "'. <br><br>" +
          "<button id='youtube_search' onclick='load_youtube(\"" +
          searchValue +
          "\")'>Try YouTube Search</button>"
      );
      return; // Exit function early
    }

    // Display the filtered results
    $("#div_img_video_loader").html(
      `<h3> Results for : ' ${searchValue} '</h3><br>` +
        `<div id='search_results'></div>`
    );

    filteredResults.forEach((item) => {
      const search_result = `
        <table class='search_result_table'>
          <th id='index'>${item.index}.</th>
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
});
