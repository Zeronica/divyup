Template.storeMenu.helpers({
	'f_stores': function() {
		return Stores.find();
	}
})

Template.storeMenu.events({
	'click .list-group-item': function(e) {
		e.preventDefault();
		Router.go('divyMenu', {_id: this._id});
	}
})