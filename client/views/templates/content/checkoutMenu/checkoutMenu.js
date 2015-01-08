Template.checkoutMenu.helpers({
	'f_itemsInCart': function() {
		console.log('before render');
		m = Meteor.myFunctions.getCurrentOrder();
		return OrderItems.find({order_id: m.order_id});
	},
	'f_name': function() {
		return MenuItems.findOne(this.menu_item_id).name;
	},
	'f_price': function() {
		return MenuItems.findOne(this.menu_item_id).price;
	},
	'f_currentOrderTotal': function() {
		m = CurrentOrders.findOne({user_id: Meteor.userId()});
		return Meteor.myFunctions.totalInOrder(m.order_id);
	}
});

Template.checkoutMenu.events({
	'click #checkout': function(e) {
		e.preventDefault();
		console.log('before m');
		m = Meteor.myFunctions.getCurrentOrder();

		return Meteor.myFunctions.checkoutCurrentOrder(this._id, m.order_id);
	}
});
