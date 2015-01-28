Template.orderTrip.events({
	'click #pickedup': function(e) {
		e.preventDefault();
		Router.go('deliveryTrip');
	}
});