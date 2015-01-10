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

	'f_deliveryStatus': function() {
		return Meteor.clientHelpers.deliveryStatusForStore(this._id);
	},

	'f_currentTime': function() {
		d = new Date(TimeSync.serverTime());
		return d.getHours() + " " + d.getMinutes() + " " + d.getSeconds();
	}
});