Template.popUpOrder.helpers({
	f_store: function() {
		order = CurrentOrders.findOne({order_id: this._id}).order_id;
		return Orders.findOne({_id: order}).store_id;
	},
});

Template.popUpOrder.events({
	'click #accept': function(e) {
		e.preventDefault();
		Router.go('orderTrip');
	},

	'click #cancel': function(e) {
		e.preventDefault();
		Router.go('driverMenu');
	},
});