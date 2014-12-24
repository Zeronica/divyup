Template.divyMenu.helpers({
	'f_drivers': function() {
		return Drivers.find({store_id: this._id});
	}
})