// remove songs from queue and from queue_array
function queue_array_remove(element, dir) {
  jquery_modal({
    message: "This removes selected item from queue. Do you want to proceed?",
    title: "Delete Item from Queue",
    dialogClass: "show-closer",
    closeTime: 30000,
    buttonId: "delete_song_button",
    buttonIcon: "ui-icon-closethick",
    buttonText: "Remove Song",
    buttonColor: "#fd5c63",
    buttonAction: function () {
      var queue_array_index = queue_array.indexOf(dir);
      queue_array.splice(queue_array_index, 1);
      $(element).closest('table.queue_div').remove();
    },
  });
}
