CurrentOrders = new Meteor.Collection("currentOrders");
/*
user_id
order_id
*/

Meteor.methods({

	// given user_id, and order_id, set new current order.
	setCurrentOrder: function(data) {
		return setCurrentOrder(data);
	},

	// checks out the current order
	checkoutCurrentOrder: function(data) {
		return checkoutCurrentOrder(data);
	}
});

var setCurrentOrder = function(data) {
	if (!data.user_id && !data.order_id)
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

var checkoutCurrentOrder = function(data) {
	if (!data.user_id && !data.divy_id)
		throw new Meteor.Error(422, 'please provide user_id and divy_id');

	if (data.user_id != Meteor.userId()) {
		throw new Meteor.Error(422, 'sorry, we got confused. Please logout and log back in.');
	}

	c = CurrentOrders.findOne({user_id: Meteor.userId()})
	if (!c) {
		throw new Meteor.Error(422, 'currentOrder does not exist');
	}

	if (CurrentOrders.find({user_id: Meteor.userId()}).count() > 1) {
		CurrentOrders.remove({user_id: Meteor.userId()});
		throw new Meteor.Error(422, 'multiple currentOrders for a user. All have been removed.');
	}

	r = DivyOrders.insert({
			divy_id: data.divy_id,
			order_id: c.order_id
		})

	CurrentOrders.remove(c._id);
}