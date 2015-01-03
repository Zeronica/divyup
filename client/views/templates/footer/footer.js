Template.footer.events({
	'click #stores': function() {
		Router.go('storeMenu');
	},
	'click #my_orders': function() {
		Router.go('myDivys');
	},
	'click #settings': function() {
		Router.go('settingMenu');
	},

})