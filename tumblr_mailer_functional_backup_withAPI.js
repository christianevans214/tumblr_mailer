//setup and pulling data from CSV and HTML files
var fs = require('fs');
var ejs = require('ejs');
var csvFile = fs.readFileSync("friend_list.csv", "utf8");
var emailTemplate = fs.readFileSync("email_template.html", "utf8");


// Authenticate via OAuth for tumblr API
var tumblr = require('tumblr.js');
var client = tumblr.createClient({
  consumer_key: 'Gvsni1sh0FRDrcbQcHZX106IK948nsVyN4JIEKc1ClqZ8cHVgG',
  consumer_secret: 'T6LbF17i6e9oGFDEEpOiZpHrCoYcyzpVbUAeKb9sunFATINwcY',
  token: 'MFjRxFyYQGtSLwShPOUNiXwzOqwpF6G7cGkxJwef7wwbLnld3n',
  token_secret: 'c1KkpYe7mcpfQSxdxsqqa3Nf5ERH2Zrjek6rWr83cGAFtIF9mf'
});

var mandrill = require('mandrill-api/mandrill');
var mandrill_client = new mandrill.Mandrill('7H8y_XdYZEBKzYu65-KZ-g');

//function that that will generate an array of objects, with each object containing information on contacts.
var csvParse = function(file){
	var contactFile = file.split("\n");
	for (i in contactFile) contactFile[i] = contactFile[i].split(',');
	contactFile.shift()
	var contactArrArr = contactFile;
	var contactList = [];

	//constructor function that makes an object with contact keys
	function contactObject(firstName, lastName, numMonthsSinceContact, email){
		this.firstName = firstName;
		this.lastName = lastName;
		this.numMonthsSinceContact = numMonthsSinceContact;
		this.email = email;
	};

	//creates array of objects with each contact being a new array index
	for (i in contactArrArr){
		var contact = new contactObject(contactArrArr[i][0], contactArrArr[i][1], contactArrArr[i][2], contactArrArr[i][3]);
		contactList.push(contact);
	};
	return contactList;
};

//tumblr API method to call blog posts from mentioned blog in function, check if those blogs are new (within a week), and then generate
// personalized emails to everyone in my friends list telling them hi and 

client.posts('antiquecodeshow.tumblr.com', function(err, blog){
	var postArr = [];
	var currentTimeSecs = Date.now()/1000;
	for (i in blog.posts){ 
		if (currentTimeSecs - blog.posts[i].timestamp < 604800) postArr.push(blog.posts[i]);
	};

	var friendsList = csvParse(csvFile);

	var personalizedEmail = function(friendObj){
		friendObj.latestPosts = postArr;
		var customizedTemplate = ejs.render(emailTemplate,friendObj);
		return customizedTemplate;
	};

	for (i in friendsList) sendEmail(friendsList[i].firstName, friendsList[i].email, "Christian", "christian.evans214@gmail.com","test email", personalizedEmail(friendsList[i]));
});

//function utilizing Mandrill API to send the customized e-mails after they've been made.
function sendEmail(to_name, to_email, from_name, from_email, subject, message_html){
    var message = {
        "html": message_html,
        "subject": subject,
        "from_email": from_email,
        "from_name": from_name,
        "to": [{
                "email": to_email,
                "name": to_name
            }],
        "important": false,
        "track_opens": true,    
        "auto_html": false,
        "preserve_recipients": true,
        "merge": false,
        "tags": [
            "Fullstack_Tumblrmailer_Workshop"
        ]    
    };
    var async = false;
    var ip_pool = "Main Pool";
    mandrill_client.messages.send({"message": message, "async": async, "ip_pool": ip_pool}, function(result) {
        // console.log(message);
        // console.log(result);   
    }, function(e) {
        // Mandrill returns the error as an object with name and message keys
        console.log('A mandrill error occurred: ' + e.name + ' - ' + e.message);
        // A mandrill error occurred: Unknown_Subaccount - No subaccount exists with the id 'customer-123'
    });
 }




