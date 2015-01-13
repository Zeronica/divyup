Template.storeMenu.helpers({
	'f_stores': function() {
		return Stores.find();
	}
});

Template.storeMenu.events({
	'click [name=storeItem]': function(e) {
		e.preventDefault();
		Router.go('divyMenu', {_id: this._id});
	}
});

Template.storeItem.helpers({
	'f_hasDivy': function() {
		return Divys.findOne({store_id: this._id}) != undefined;
	},

	'f_delivering': function() {
		return Meteor.clientHelpers.currentlyDelivering({
			delivery_start: this.delivery_start,
			delivery_end: this.delivery_end});
	}
});