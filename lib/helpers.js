Meteor.myFunctions = {

	// get data of an order from an entry in the Orders collection
	totalInOrder: function(data) {
		if (!data.order_id)
			return alert("No order id was given to totalInOrder");

		o = Orders.find({_id: data.order_id});
		if (o === undefined)
			return alert("No order was found for the id provided");

		order_items = OrderItems.find({order_id: o._id}).fetch();

		count = 0;
		for (i=0; i<order_items.length; i++) {
			count = count + order_items[i];
		}
		return count;
	},

	logout: function() {
		Meteor.logout();
		Router.go('home');
	},

	// create a new currentOrder
	createCurrentOrder: function(store_id) {
		// create blank order
		order_id = Orders.insert({user_id: Meteor.userId(), store_id: store_id});

		Meteor.call('setCurrentOrder', {user_id: Meteor.userId(), order_id: order_id});

		return order_id;
	},

	// add a new orderItem
	createOrderItem: function(order_id, menu_item_id) {
		return OrderItems.insert({order_id: order_id, menu_item_id: menu_item_id});
	}
};