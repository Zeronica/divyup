CurrentOrders = new Meteor.Collection("currentOrders");
/*
user_id
order_id
*/

Meteor.methods({
	setCurrentOrder: function(data) {
		return setCurrentOrder(data);
	}
});

var setCurrentOrder = function(data) {
	if (data.user_id === undefined && data.order_id)
		throw new Meteor.Error(422, 'please provide user_id and order_id');

	c = CurrentOrders.find({user_id: data.user_id, order_id:data.order_id});

	if (c === undefined) {
		new_id = CurrentOrders.insert({user_id: data.user_id, order_id: data.order_id});
	}
	else {
		CurrentOrders.remove({_id: c._id});
		new_id = CurrentOrders.insert({user_id: data.user_id, order_id: data.order_id});
	}

	return new_id;
};