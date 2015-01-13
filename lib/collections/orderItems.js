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
	
}