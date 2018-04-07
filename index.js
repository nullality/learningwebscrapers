//nightmarte
let Nightmare = require('nightmare');
let num = Math.floor(Math.random(2000)*2000)


let grabImage = new Nightmare()
  .viewport(1000, 1000)
  .goto('https://www.onanon.xyz')
  .wait(4000)
  .screenshot('screenshot' + num + '.png')
	.run(function(err, nightmare) {
    if (err)
    return console.log(err);
    console.log('Success!');
    console.log('IMG: screenshot' + num + '.png created in' + __dirname + '!');
  })
  .end();
