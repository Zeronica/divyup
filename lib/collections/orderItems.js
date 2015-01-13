OrderItems = new Meteor.Collection('orderItems');
/*
order_id
menu_item_id
*/

Meteor.methods({
	setOrderItems: function(data) {
		return setOrderItems(data);
	}
});

var setOrderItems = function(data){
	if (!data.menu_item_id && !data.order_id)
		throw new Meteor.Error(422, 'please provide menu_item_id and order_id.');

	OrderItems.insert({menu_item_id: data.menu_item_id, order_id: data.order_id});
};