CurrentOrders = new Meteor.Collection("currentOrders");
/*
user_id
order_id
*/

Meteor.methods({
	// given divy_id, sets the current order
	setCurrentOrder: function(data) {
		return setCurrentOrder(data);
	},

	// checks out the current order
	checkoutCurrentOrder: function(data) {
		return checkoutCurrentOrder(data);
	}
});

var setCurrentOrder = function(data) {
	if (!data.divy_id && !data.user_id && data.user_id != Meteor.userId())
		throw new Meteor.Error(422, 'please provide divy_id and user_id.');

	d = Divys.findOne(data.divy_id);
	if (!d) 
		throw new Meteor.Error(422, 'wrong divy id.');

	c = CurrentOrders.findOne({user_id: Meteor.userId()});
	if (c) 
		CurrentOrders.remove({_id: c._id});
	
	order_id = setNewOrder({store_id: d.store_id, user_id: Meteor.userId()});
	new_id = CurrentOrders.insert({user_id: data.user_id, order_id: data.order_id});

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