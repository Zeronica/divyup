Template.foodMenu.helpers({
	'f_menuItems': function() {
		// kind of ugly code, fix later
		return MenuItems.find({menu_id: Menus.findOne({store_id: this._id})._id});
	}
})