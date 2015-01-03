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
	}
};