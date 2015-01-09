Template.checkoutMenu.helpers({
	'f_itemsInCart': function() {
		order_id = CurrentOrders.findOne({user_id: Meteor.userId()}).order_id;
		return OrderItems.find({order_id: order_id});
	},
	'f_name': function() {
		return MenuItems.findOne(this.menu_item_id).name;
	},
	'f_price': function() {
		return MenuItems.findOne(this.menu_item_id).price;
	},
	'f_currentOrderTotal': function() {
		order_id = CurrentOrders.findOne({user_id: Meteor.userId()}).order_id;
		return Meteor.myFunctions.totalInOrder(order_id);
	}
});

Template.checkoutMenu.events({
	'click #checkout': function(e) {
		e.preventDefault();
		Meteor.call('checkoutCurrentOrder', {user_id: Meteor.userId(), divy_id: this._id}, function(e) {
			if (e) {
				return alert(e);
			} else {
				Router.go("storeMenu");
			}
		});
	}
});