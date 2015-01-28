Template.deliveryTrip.events({
	'click #arriving': function(e) {
		e.preventDefault();
		Router.go('orderList');
	}
});