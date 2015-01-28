Template.settingMenu.events({
	'click #logout': function() {
		Meteor.logout();
		Router.go('home');
	}
})