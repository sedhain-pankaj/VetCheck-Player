//array to hold the shuffled songs
let shuffleArrays = { shuffle_category: [] };

//message to show shuffle is on. Very important for skip.js
const dir_msg_collection = [`(Shuffle ON): `];

//logic for ajax call to get the shuffled songs from their JSON
function shuffleAjaxCall() {
  var dataPromise;

  if (!cache) {
    dataPromise = fetchData();
  } else {
    // If the cache is not empty, use a resolved promise
    dataPromise = $.Deferred().resolve().promise();
  }

  dataPromise.then(function () {
    shuffleArrays["shuffle_category"] = cache.response.map(
      (song) =>
        `https://www.youtube.com/embed/${
          song.VideoID
        }?title=${encodeURIComponent(song.Title)}`
    );

    shuffleArrays["shuffle_category"].sort(function () {
      return 0.5 - Math.random();
    });

    shuffler(shuffleArrays["shuffle_category"], dir_msg_collection[0]);
  });
}

function shuffler(array, dir_msg) {
  if (array.length == 0) {
    // Refresh #video
    $("#video_title").load(" #video_title");
    $("#video_container").empty();
    // Create a new media element in the video container
    $("#video_container").html(
      "<video id='video' src='' autoplay preload='auto'></video>"
    );
    // Video dimensions scale to fit the container
    video_scaler();

    //Jquery modal to show user, shuffle auto-started
    jquery_modal({
      message:
        "Shuffle triggers automatically when queued items or previous shuffle ends.",
      title: "Shuffle Started",
      closeTime: 5000,
    });

    //a random click on DOM element to trigger autoshuffle => checkActivity()
    //triggers 80s shuffle when previous shuffle ends
    $("#queue_header").click();
    return;
  }

  //destroy mejs if title doesnt contains dir_msg_collection
  if (
    !dir_msg_collection.some((item) =>
      $("#video_title").text().includes(item)
    ) &&
    !$("#video_title").text().includes("Video Title")
  ) {
    $("#video_container").empty();
    //create a new media element in the video container
    $("#video_container").html(
      "<video id='video' src='' autoplay preload='auto'></video>"
    );
    //video dimensions scale to fit the container
    video_scaler();

    //clear any previous interval amd 0.5 sec delay to avoid cleared pswd timer affecting new modal
    clearInterval(countdownInterval);
    $("#dialog-confirm").dialog("close");
    setTimeout(function () {
      jquery_modal({
        message:
          "Queued songs have finished. The last played randomizer will resume.",
        title: "Resuming Previous Randomizer",
        closeTime: 5000,
      });
    }, 500);
  }

  //if queue_array is not empty, play_Queue()
  function relooper_shuffle() {
    if (queue_array.length > 0) {
      play_Queue();
    } else {
      shuffler(array, dir_msg);
    }
  }

  //get the video element
  var video = document.getElementById("video");
  //set the source of the video element
  video.src = array[0];

  //mejs player
  mejs_media_Player(relooper_shuffle);

  //append video title to div with id="video_title"
  var video_title = document.getElementById("video_title");
  video_title.innerHTML = dir_msg + decodeURIComponent(array[0].split("=")[1]);

  //remove first element from array
  array.shift();
}
