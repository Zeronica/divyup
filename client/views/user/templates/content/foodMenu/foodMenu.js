Template.foodMenu.helpers({
	'f_menuItems': function() {
		// kind of ugly code, fix later
		menu_id = Menus.findOne({store_id: this._id})._id;
		return MenuItems.find({menu_id: menu_id});
	}
});

Template.foodMenu.events({
	'click #foodItem': function(){
		r = confirm("Add " + this.name + " to cart?");
		if (r) {
			store_id = Menus.findOne(this.menu_id).store_id;
			c = CurrentOrders.findOne({user_id: Meteor.userId()});
			r = Meteor.call('setOrderItems', {order_id: c.order_id, menu_item_id: this._id}, function(err) {
				if (err)
					throw (err);
			});
		}
	},

	'click #testButton': function() {
	foodItem = MenuItems.findOne();
		store_id = Menus.findOne(foodItem.menu_id).store_id;
		c = CurrentOrders.findOne({user_id: Meteor.userId()});
		for (i in [1, 2, 3, 4, 5]) {
			r = Meteor.call('setOrderItems', {order_id: c.order_id, menu_item_id: foodItem._id}, function(err) {
				if (err)
					throw (err);
			});
		}
	}
});

Template.orderTotal.helpers({
	'f_totalInOrder': function() {
		c = CurrentOrders.findOne({user_id: Meteor.userId()});
		return Meteor.myFunctions.totalInOrder(c.order_id);
	}
});

Template.orderTotal.events({
	'click #checkout': function() {
		Router.go('checkout');
	}
})