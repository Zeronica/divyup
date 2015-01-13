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
	}
});

Template.orderTotal.helpers({
	'totalInOrder': function() {
		return 0.00;
	}
})