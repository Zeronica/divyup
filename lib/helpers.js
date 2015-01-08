Meteor.myFunctions = {

	// get data of an order from an entry in the Orders collection
	totalInOrder: function(order_id) {

		o = Orders.find({_id: order_id});
		if (o === undefined)
			return alert("No order was found for the id provided");

		order_items = OrderItems.find({order_id: order_id}).fetch();

		count = 0.0	;
		for (i=0; i < order_items.length; i++) {
			menu_item = MenuItems.findOne(order_items[i].menu_item_id);
			count = count + menu_item.price;
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
	},

	getCurrentOrder: function() {
		console.log(CurrentOrders.findOne({user_id: Meteor.userId()}));
		m = CurrentOrders.findOne({user_id: Meteor.userId()});
		if (m === undefined) {
			// this will probably never happen
			Router.go("storeMenu");
		}
		return m;
	},

	checkoutCurrentOrder: function(divy_id, order_id) {
		d = Divys.findOne(divy_id);
		if (!d) {
			return alert("wrong divy id fnut");
		}
		o = Orders.findOne(order_id);
		if (!d) {
			return alert("wrong order id fnut");
		}

		r = DivyOrders.insert({
			divy_id: divy_id,
			order_id: order_id
		})

		if (!r) {
			return alert("something went wrong with the checkout");
		}

		m = CurrentOrders.findOne({user_id: Meteor.userId()})
		CurrentOrders.remove(m._id);
		return r;
	}
};