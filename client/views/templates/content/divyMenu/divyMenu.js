Template.divyMenu.helpers({
	'f_divys': function() {
		return Divys.find({store_id: this._id});
	},

	'f_stores': function() {
		return Stores.findOne({_id: this._id});
	}
})