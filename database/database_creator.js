//provide the interface in terminal enter the youtube url
const readline = require("readline").createInterface({
  input: process.stdin,
  output: process.stdout,
});

function videoID() {
  return new Promise((resolve) => {
    readline.question("\nEnter the youtube url: \n", (url) => {
      var videoID = new URL(url).pathname.split("/")[1];
      readline.close();
      resolve(videoID);
    });
  });
}

//use https node module to get the video title and thumbnail via YT Data API v3
videoID().then((urlID) => {
  const apiKey = YT_API_Key;
  getVideoInfo(urlID, apiKey);
});

function getVideoInfo(urlID, apiKey) {
  const https = require("https");

  var options = {
    hostname: "www.googleapis.com",
    path: `/youtube/v3/videos?id=${urlID}&key=${apiKey}&part=snippet`,
    method: "GET",
  };

  var req = https.request(options, (res) => {
    res.setEncoding("utf8");
    let rawData = "";
    res.on("data", (chunk) => {
      rawData += chunk;
    });
    res.on("end", () => {
      try {
        const parsedData = JSON.parse(rawData);
        var videoInfo = {
          VideoID: urlID,
          Thumbnail: parsedData.items[0].snippet.thumbnails.default.url,
          Title: parsedData.items[0].snippet.title,
        };
        console.log("\n" + JSON.stringify(videoInfo, null, 2));
      } catch (e) {
        console.error(e.message);
      }
    });
  });

  req.on("error", (error) => {
    console.error(error);
  });

  req.end();
}
