var tumblr = require('tumblr.js');
// Authenticate via OAuth
var tumblr = require('tumblr.js');
var client = tumblr.createClient({
  consumer_key: 'Gvsni1sh0FRDrcbQcHZX106IK948nsVyN4JIEKc1ClqZ8cHVgG',
  consumer_secret: 'T6LbF17i6e9oGFDEEpOiZpHrCoYcyzpVbUAeKb9sunFATINwcY',
  token: 'MFjRxFyYQGtSLwShPOUNiXwzOqwpF6G7cGkxJwef7wwbLnld3n',
  token_secret: 'c1KkpYe7mcpfQSxdxsqqa3Nf5ERH2Zrjek6rWr83cGAFtIF9mf'
});

client.posts( 'antiquecodeshow.tumblr.com', function(err, blog) {
	console.log(blog);
})

var date = Date.now();
console.log(date);