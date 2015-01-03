Template.storeMenu.helpers({
	'f_stores': function() {
		return Stores.find();
	}
})

Template.storeMenu.events({
	'click [name=storeItem]': function(e) {
		e.preventDefault();
		Router.go('divyMenu', {_id: this._id});
	}
})