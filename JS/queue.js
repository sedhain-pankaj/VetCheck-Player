//array to hold songs that are queued
var queue_array = [];

function play_Queue() {
  // Guard clause: if queue_array is empty, display message and return
  if (queue_array.length == 0) {
    //refresh #video
    $("#video_title").load(" #video_title");

    $("#video_container").empty();
    //create a new media element in the video container
    $("#video_container").html(
      "<video id='video' src='' autoplay preload='auto'></video>"
    );

    //video dimensions scale to fit the container
    video_scaler();

    jquery_modal({
      message:
        "No more items left in the queue. Click on the thumbnail to add a video in the queue.",
      title: "Queue is Empty",
    });
    return;
  }

  //set the source of the video element
  var video = document.getElementById("video");
  video.src = queue_array[0];

  //mejs player
  mejs_media_Player(play_Queue);

  //append video title to div with id="video_title"
  var video_title = document.getElementById("video_title");
  video_title.innerHTML = $(".queue_div").first().find(".queue_name").text();

  //remove first element from queue_array
  queue_array.shift();
  $(".queue_div").first().remove();
}
