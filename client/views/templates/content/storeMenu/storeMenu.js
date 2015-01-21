Template.storeMenu.helpers({
	'f_stores': function() {
		return Stores.find();
	}
});

Template.storeMenu.events({
	'click [name=storeItem]': function(e) {
		e.preventDefault();
		if (Meteor.clientHelpers.currentlyDelivering(this._id)) {
			Meteor.call('orderDeliveryWindow', {store_id: this._id}, function(err, result) {
			  if (err)
			    return alert(err.reason);
			  Router.go('foodMenu', {_id: result});
			});
		}
		else {
			Router.go('divyMenu', {_id: this._id});
		}
	}
});

Template.storeItem.helpers({
	'f_hasDivy': function() {
		return Divys.findOne({store_id: this._id}) != undefined;
	},

	'f_delivering': function() {
		return Meteor.clientHelpers.currentlyDelivering(this._id);
	}
});