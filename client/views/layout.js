Template.sideBar.helpers({
	'username': function() {
		m = Meteor.user().username;
		console.log(m);
		return Meteor.user().username;
	}
});