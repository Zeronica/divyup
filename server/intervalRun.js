Meteor.startup(function() {
	Meteor.setInterval(function() {
		Meteor.call("checkDivyStatus");
	}
	, 5000);
});

var test = function() {
	console.log("in test");
}