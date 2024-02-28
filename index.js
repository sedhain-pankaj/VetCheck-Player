//show or hide different search options
$(document).ready(function () {
  fetchData();
  displayContent();
  video_scaler();
  autoShuffle();
  skipVideo();
  queue_scroll_top();
});

//function to scale down video to fit within video_container and pointer events to auto
function video_scaler() {
  $("video").css("width", $("#video_container").width());
  $("video").css("height", $("#video_container").height());
  $("video").attr("width", $("video").width());
  $("video").attr("height", $("video").height());
}

//run the shuffle function if no songs are playing
function autoShuffle() {
  var timeout = false;
  function checkActivity() {
    clearTimeout(timeout);
    timeout = setTimeout(function () {
      if ($("video").attr("src") == "" && queue_array.length == 0) {
        shuffleAjaxCall();
      }
    }, 1);
  }
  document.addEventListener("mousedown", checkActivity);
  document.addEventListener("mousemove", checkActivity);
  document.addEventListener("click", checkActivity);
  checkActivity();
}

//mejs player
function mejs_media_Player(func_restarter) {
  $("video").mediaelementplayer({
    iconSprite: "/CSS/mejs.svg",
    success: function (mediaElement, DOMObject, player) {
      mediaElement.addEventListener("ended", function (e) {
        func_restarter();
      });

      //fullscreen the video afters 8s of inactivity if not already fullscreen
      var timeout2 = false;
      function checkActivity2() {
        clearTimeout(timeout2);
        timeout2 = setTimeout(function () {
          if (
            $("video").attr("src") != "" &&
            !player.isFullScreen &&
            !player.paused &&
            !player.error &&
            player.readyState == 4
          ) {
            player.enterFullScreen();
            $("video").attr("width", $("video").width());
            $("video").attr("height", $("video").height());
          }
        }, 8000);
      }

      document.addEventListener("mousedown", checkActivity2);
      document.addEventListener("mousemove", checkActivity2);
      document.addEventListener("click", checkActivity2);
      checkActivity2();
    },

    error: function (e) {
      console.log("media element error:" + e);
      $("#video_container").empty();
      //create a new media element in the video container
      $("#video_container").html(
        "<video id='video' src='' autoplay preload='auto'></video>"
      );
      //video dimensions scale to fit the container
      video_scaler();
      //if queue_array is not empty, play_Queue()
      func_restarter();
      jquery_modal({
        message:
          "Error usually comes via YouTube's content restrictions. Skipping to next song.",
        title: "An Error was Detected",
      });
    },

    clickToPlayPause: true,
    features: ["playpause", "progress", "current", "duration", "fullscreen"],
    enableKeyboard: true,
    useFakeFullscreen: true,
    enableAutosize: true,
  });
}

//function to move queue scrollbar to the top of the queue after 5 seconds of inactivity
function queue_scroll_top() {
  var timeout3 = false;
  function checkActivity3() {
    clearTimeout(timeout3);
    timeout3 = setTimeout(function () {
      $("#right-block-down").animate({ scrollTop: 0 }, 500);
    }, 10000);
  }
  document.addEventListener("mousedown", checkActivity3);
  document.addEventListener("mousemove", checkActivity3);
  document.addEventListener("click", checkActivity3);
  checkActivity3();
}
