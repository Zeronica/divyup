Template.foodMenu.helpers({
	'f_menuItems': function() {
		// kind of ugly code, fix later
		menu_id = Menus.findOne({store_id: this._id})._id;
		return MenuItems.find({menu_id: menu_id});
	}
});

Template.foodMenu.events({
	'click #foodItem': function(){
		m = CurrentOrders.findOne({user_id: Meteor.userId()});
		if (m) {
			console.log("already exists");
			order_id = m._id;
		} else {
			// get store_id from menu_id
			store_id = Menus.findOne(this.menu_id).store_id;
			order_id = Meteor.myFunctions.createCurrentOrder(store_id);
		}
		r = Meteor.myFunctions.createOrderItem(order_id, this._id);
		console.log(r);
	}
})