Meteor.startup(function() {
	Meteor.setInterval(function() {
		Meteor.call("checkStatus");
	}
	, 5000);
});