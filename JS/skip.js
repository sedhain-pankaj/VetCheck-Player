//skip song function
function skipVideo() {
  document.getElementById("skip_button").addEventListener("click", function () {
    if (
      $("video").attr("src") != "" &&
      dir_msg_collection.some((item) => $("#video_title").text().includes(item))
    ) {
      jquery_modal({
        message:
          "This skips the playing video. Next item will be from the " +
          (queue_array.length == 0 ? "shuffle." : "queue."),
        title: "Skip this Shuffle",
        dialogClass: "show-closer",
        buttonText: "Skip",
        buttonAction: skipRandomizer,
      });
      return;
    }

    if ($("video").attr("src") == "") {
      jquery_modal({
        message:
          "Nothing is playing right now. Unable to skip. Restart the player.",
        title: "No Video Playing (ERROR)",
      });
      return;
    }

    if (queue_array.length == 0) {
      jquery_modal({
        message:
          "No items in queued section. Previous shuffle will resume if you skip.",
        title: "Queue is Empty",
        dialogClass: "show-closer",
        buttonText: "Force Skip",
        buttonAction: skipRandomizer,
      });
      return;
    }
    
    jquery_modal({
      message:
        "This skips the current video and plays the next one in the queue.",
      title: "Skip the Queue",
      buttonText: "Skip",
      dialogClass: "show-closer",
      buttonAction: function () {
        play_Queue();
      },
    });
  });
}

//skip randomizer by video end event
function skipRandomizer() {
  var video = document.getElementById("video");
  video.pause();
  var event = new Event("ended");
  video.dispatchEvent(event);
}
