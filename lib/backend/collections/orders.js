Orders = new Meteor.Collection('orders');
/*
user_id
store_id
*/

Meteor.methods({
	setNewOrder: function(data) {
		return setNewOrder(data);
	}
});

var setNewOrder = function(data) {
	if (!data.store_id && !data.user_id && data.user_id != Meteor.userId())
		throw new Meteor.Error(422, 'please provide user_id and store_id.');

	return Orders.insert({user_id: Meteor.userId(), store_id: data.store_id});
};

