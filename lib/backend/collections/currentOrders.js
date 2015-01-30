CurrentOrders = new Meteor.Collection("currentOrders");
/*
user_id
order_id
divy_id
*/

Meteor.methods({
	// given divy_id, sets the current order
	setCurrentOrder: function(data) {
		return setCurrentOrder(data);
	},

	// checks out the current order
	checkoutCurrentOrder: function() {
		return checkoutCurrentOrder();
	}
});

var setCurrentOrder = function(data) {
	if (!data.divy_id)
		throw new Meteor.Error(422, 'please provide divy_id.');

	d = Divys.findOne(data.divy_id);
	if (!d) 
		throw new Meteor.Error(422, 'wrong divy id.');

	c = CurrentOrders.findOne({user_id: Meteor.userId()});
	if (c) 
		CurrentOrders.remove({_id: c._id});
	
	order_id = Meteor.call('setNewOrder', {store_id: d.store_id, user_id: Meteor.userId()});
	new_id = CurrentOrders.insert({user_id: Meteor.userId(), order_id: order_id, divy_id: data.divy_id});
	
	return d.store_id; // since everytime this is called we want to go to foodmenu
};

var checkoutCurrentOrder = function() {
	c = CurrentOrders.findOne({user_id: Meteor.userId()});
	if (!c)
		throw new Meteor.Error(400, 'no current order found for this user.');

	d = Meteor.call("setDivyOrder", {order_id: c.order_id, divy_id:c.divy_id});

	// delete currentOrder if checkout was successful
	if (d)
		CurrentOrders.remove(c._id);
}