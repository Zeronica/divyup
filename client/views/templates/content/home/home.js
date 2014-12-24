Template.home.helpers({
	'userIsLoggedIn': function() {
		return Meteor.user() != undefined;
	}
})