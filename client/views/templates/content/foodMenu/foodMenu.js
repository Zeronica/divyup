Template.foodMenu.helpers({
	'f_menuItems': function() {
		// kind of ugly code, fix later
		menu_id = Menus.findOne({store_id: this._id})._id;
		return MenuItems.find({menu_id: menu_id});
	}
});

Template.foodMenu.events({
	'click #foodItem': function(){
		// m = CurrentOrders.findOne({user_id: Meteor.userId()});
		// if (m) {
		// 	order_id = m.order_id;
		// } else {
		// 	order_id = Meteor.myFunctions.createCurrentOrder(store_id);
		// }
		store_id = Menus.findOne(this.menu_id).store_id;
		r = Meteor.call('setOrderItems', {user_id: userId(), menu_item_id: this._id});
	}
})