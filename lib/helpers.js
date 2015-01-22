// Meteor.collectionHelpers = {
// 	'currentServerTime': function(order_id) {

// 	}
// }

Meteor.myFunctions = {
	'totalInOrder': function(order_id) {
		return totalInOrder(order_id);
	},

	'totalInDivy': function(divy_id) {
		return totalInDivy(divy_id);
	},

	'divyQuotaMet': function(divy_id, store_id) {
		return divyQuotaMet(divy_id, store_id);
	},

	'currentlyDelivering': function(store_id) {
		store = Stores.findOne(store_id);
		d = new Date();
		return this.withinDeliveryWindow(
			this.utcToMinutes(d),
			store.delivery_start,
			store.delivery_end
		);
	},

	'utcToMinutes': function(time) {
		var d = new Date(time);
		return d.getHours() * 60 + d.getMinutes();
	},

	// all three times in minutes
	'withinDeliveryWindow': function(currentTime, deliveryStart, deliveryEnd) {
		m = currentTime > deliveryStart && currentTime < deliveryEnd;
		return m;
	},

	'getWaitTime': function() {
		c = Constants.findOne({name: "max_wait_time"});
		return c.value;
	}
};

var totalInOrder = function(order_id) {
		orderItems = OrderItems.find({order_id: order_id}).fetch();

		price = 0.00;
		for (o in orderItems) {
			price = price + MenuItems.findOne(orderItems[o].menu_item_id).price;
		}
		return price;
};

var totalInDivy = function(divy_id) {
		divyOrders = DivyOrders.find({divy_id: divy_id}).fetch();
		price = 0.00;
		for (d in divyOrders) {
			price = price + totalInOrder(divyOrders[d].order_id);
		}
		return price; 
};

var divyQuotaMet = function(divy_id, store_id) {
	s = Stores.findOne(store_id);
	return totalInDivy(divy_id) >= s.quota;
}