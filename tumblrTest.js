var tumblr = require('tumblr.js');
// Authenticate via OAuth
var tumblr = require('tumblr.js');
var client = tumblr.createClient({
  consumer_key: 'XXXXXXX',
  consumer_secret: 'XXXXXXXXX',
  token: 'XXXXXXXXXX',
  token_secret: 'XXXXXXXXXX'
});

client.posts( 'antiquecodeshow.tumblr.com', function(err, blog) {
	console.log(blog);
})

var date = Date.now();
console.log(date);
