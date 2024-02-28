//function to load youtube video
const load_youtube = (search_query) => {
  const search_query_url = `https://www.googleapis.com/youtube/v3/search?part=snippet&q=${search_query}&type=video&maxResults=10&key=${YT_API_Key}`;

  $.ajax({
    url: search_query_url,
    method: "GET",
    dataType: "json",
    success: (data) => {
      $("#div_img_video_loader").html(
        `<h3> Top 10 YouTube Results for : ' ${search_query} ' </h3><br>
        <div id='search_results'></div>`
      );

      data.items.forEach((item, i) => {
        const search_result = `
          <table class='search_result_table'> 
            <th id='index'>${i + 1}.</th>
            <th class='search_result_img'>
              <img src='${item.snippet.thumbnails.default.url}'>
            </th>
            <td class='yt_video_title'>${item.snippet.title}</td>
            <td class='yt_video_id' style='display:none;'>${
              item.id.videoId
            }</td>
          </table>`;

        $("#search_results").append(search_result);
      });

      loadYoutubeIframeAPI();

      $(".search_result_table").click(handleSearchResultClick);
    },
    error: (error) => {
      console.log(error);
      $("#div_img_video_loader").html(`<h3>Error: ${error.statusText}</h3>`);
    },
  });
};

const loadYoutubeIframeAPI = () => {
  const tag = document.createElement("script");
  tag.src = "https://www.youtube.com/iframe_api";
  const firstScriptTag = document.getElementsByTagName("script")[0];
  firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
};

const handleSearchResultClick = function () {
  const yt_dir = `https://www.youtube.com/embed/${$(this)
    .find(".yt_video_id")
    .text()}`;

  if (queue_array.includes(yt_dir)) {
    jquery_modal({
      message:
        "This item exists already in queue. Once it is played from the queue, it can be added again.",
      title: "Video Already Queued",
    });
    return;
  }

  if (video.src.includes($(this).find(".yt_video_id").text())) {
    jquery_modal({
      message:
        "This video is being played currently. Once it ends completely, it can be re-added to queue.",
      title: "Video Being Played Currently",
    });
    return;
  }

  queue_array.push(yt_dir);

  $("#right-block-down").append(
    `<table class='queue_div'>
        <th id='index'> • </th>
        <th> 
          <img src='${$(this)
            .find(".search_result_img img")
            .attr("src")}'> 
        </th>
        <td class='queue_name'>
          ${$(this).find(".yt_video_title").text()}
        </td>
        <td class='queue_remove_button' onclick='queue_array_remove(this, "${yt_dir}")'>
          <i class='material-icons'>delete_sweep</i>
        </td>
    </table>`
  );

  $("#right-block-down").animate(
    { scrollTop: $("#right-block-down").prop("scrollHeight") },
    500
  );

  if (queue_array.length === 1 && $("video").attr("src") === "") {
    play_Queue();
  }
};
