Template.driverfooter.events({
	'click #stores': function() {
		Router.go('driverMenu');
	},
	// 'click #my_orders': function() {
	// 	Router.go('myDivys');
	// },
	'click #settings': function() {
		Router.go('settingMenuDriver');
	},

})