var Nightmare = require('nightmare');
var fs = require('fs');
var http = require('http');
require('nightmare-download-manager')(Nightmare);
var nightmare = Nightmare();

nightmare.on('download', function(state, downloadItem){
  if(state == 'started'){
    nightmare.emit('download', 'the-download.zip', downloadItem);
  }
});

nightmare
  .downloadManager()
  .viewport(1000, 1000)
  .goto('https://nullality.bandcamp.com/album/duke-of-noise-ii')
  .wait(5500)
  .click('button.download-link')
  .wait(5500)
  .click('.download-title')
  .wait(5500)
  .click('.download-title .item-button')
  .wait(5500)
  .evaluate(
        function () {
  	          return {
  			          name: $('.download .title').text().trim(),
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
  .then(() => {
    console.log('done');
  });



// var bandcamp = new Nightmare()
//     .viewport(1000, 1000)
//     .useragent("Mozilla/5.0 (Windows NT 6.3; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/38.0.2125.111 Safari/537.36")
//     .goto('https://nullality.bandcamp.com/album/duke-of-noise-ii')
//     .wait()
//     .screenshot('bandcamp01.png')
//     .click('button.download-link')
//     .screenshot('bandcamp02.png')
//     //.type('#userPrice', '0')
//     //.wait(5500)
//     //.screenshot('bandcamp3.png')
//     .click('.download-title')
//     //.wait()
//     .wait(8000)
//     .click('.download-title')
//     .screenshot('bandcamp03.png')
//     .evaluate(
//       function () {
// 	          return {
// 			          name: $('.download .title').text().trim(),
// 			          href: $('.download-title .item-button').prop('href')
// 			        };
//   	        },
//             function (value) {
//   			        var filename = './' + value.name + '.zip';
//   			        var file = fs.createWriteStream(filename);
//   			        var request = http.get(value.href, function (response) {
// 					          response.pipe(file);
// 					        });
// 			      }
// 	        )
//     .run(function (err, nightmare) {
// 	          if (err) return console.log(err);
// 	          console.log('Done!');
// 	        })
//     .end()
