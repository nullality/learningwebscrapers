var Nightmare = require('nightmare');
var fs = require('fs');
var http = require('http');
require('nightmare-download-manager')(Nightmare);
var nightmare = Nightmare();

nightmare.on('download', function(state, downloadItem){
  if(state == 'started'){
    nightmare.emit('download', 'thatnewdownload.zip', downloadItem);
  }
});

nightmare
    .downloadManager()
    .viewport(1000, 1000)
    .goto('http://music.businesscasual.biz/album/1995')
    .wait(5500)
    .click('h4.ft button.download-link')
    .wait(1500)
    .type('#userPrice', '0')
    .wait(1500)
    .click('#downloadButtons_download button')
    .wait(5500)
    //starthavingissue
    .click('.download-title')
    .wait(5500)
    .click('.download-title .item-button')
    //.click('.download-title')
    //.click('.item-button')
    .wait(5500)
    //.screenshot('bandcampenter.png')
    .evaluate(
        function () {
            return {
              name: $('.download .title').text(),
              href: $('.download-title .item-button').prop('href')
            };
        },
        function (value) {
        var filename = './' + value.name + '.zip';
        var file = fs.createWriteStream(filename);
        var request = http.get(value.href, function (response) {
          response.pipe(file);
        });
      }
    )
    .wait(8000)
    .waitDownloadsComplete()
    .screenshot('bandcampexit.png')
    // .then(() => {
    //   console.log('done');
    // });
    .run(function (err, nightmare) {
     if (err) return console.log(err);
     console.log('Done!');
    });
