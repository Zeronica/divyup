Template.orderList.helpers({
	'f_order': function() {
		divyid = Session.get("divy_id")
		return DivyOrders.find({divy_id: divyid});
	},

	'username': function() {
		divyid = Session.get("divy_id")
		order=DivyOrders.find({divy_id: divyid}).order_id;
		return Orders.findOne({_id: order}).user_id;
	},

	// 'confirmationnumber': function() {
	// 	return DivyOrders.find({divy_id: divyid});
	// },
});

Template.orderList.events({
	'click #proceed': function(e) {
		e.preventDefault();
		Router.go('deliveryTrip');
	}
});