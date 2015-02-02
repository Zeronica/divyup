CurrentOrders = new Meteor.Collection("currentOrders");
/*
order_id
divy_id	#may be null, indicating currentOrder also creates a new divy when checked out.
store_id
*/

Meteor.methods({
	// given divy_id, sets the current order
	setCurrentOrder: function(data) {
		return setCurrentOrder(data);
	}
});

var setCurrentOrder = function(data) {
	if (!data.divy_id && !data.store_id)
		throw new Meteor.Error(422, 'please provide either store_id or divy_id.');

	// check if currentOrders already exists for user, if yes delete
	c = CurrentOrders.findOne({user_id: Meteor.userId()});
	if (c)
		CurrentOrders.remove({_id: c._id});

	// if store_id provided
	if (data.store_id) {
		store_id = data.store_id;
	} else {
		store_id = Divys.findOne(data.divy_id).store_id;
	}
	
	order_id = Meteor.call('setNewOrder', {store_id: store_id, user_id: Meteor.userId()});

	new_id = CurrentOrders.insert({user_id: Meteor.userId(), order_id: order_id, divy_id: data.divy_id, store_id: store_id});
	
	return d.store_id; // since everytime this is called we want to go to foodmenu
};

// var checkoutCurrentOrder = function() {
// 	c = CurrentOrders.findOne({user_id: Meteor.userId()});
// 	if (!c)
// 		throw new Meteor.Error(400, 'no current order found for this user.');

// 	d = Meteor.call("setDivyOrder", {order_id: c.order_id, divy_id:c.divy_id});

// 	// delete currentOrder if checkout was successful
// 	if (d)
// 		CurrentOrders.remove(c._id);
// }