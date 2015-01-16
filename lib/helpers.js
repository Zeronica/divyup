Meteor.myFunctions = {
	'totalInOrder': function(order_id) {
		return totalInOrder(order_id);
	},

	'totalInDivy': function(divy_id) {
		return totalInDivy(divy_id);
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

// Meteor.totalInOrder = function(order_id) {
// 	orderItems = OrderItems.find({order_id: order_id}).fetch();

// 	price = 0.00;
// 	for (i=0; i<orderItems.length; i++) {
// 		price = price + MenuItems.findOne(orderItems[i].menu_item_id).price;
// 	}

// 	return price;
// };

// Meteor.totalInDivy = function(divy_id) {
// 	divyOrders = DivyOrders.find({divy_id: divy_id}).fetch();
	
// 	price = 0.00;
// 	for (i=0; i<divyOrders.length; i++) {
// 		price = price + Meteor.totalInOrder(divyOrders[i]._id);
// 	}

// 	return price; 
// };

	/*
	'currentDivy': function() {
		s = Session.get("currentDivy");
		if (!s) {
			c = CurrentOrders.findOne({user_id: Meteor.userId()});
			if (!c)
				return alert("cannot find current order");
			Session.set("currentDivy", c.divy_id);
			s = c.divy_id;
		}
		return s;
	},

	'currentOrder': function() {
		s = Session.get("currentOrder");
		if (!s) {
			c = CurrentOrders.findOne({user_id: Meteor.userId()});
			if (!c)
				return alert("cannot find current order");
			Session.set("currentOrder", c.order_id);
			s = c.order_id;
		}
		return s;
	}
	*/