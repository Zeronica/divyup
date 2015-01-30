Template.newDivy.helpers({
	'f_pickupStores': function() {
		return PickupStores.find({pickup_id: Meteor.user().profile.pickup_id});
	}
});

Template.storeItem.helpers({
	'f_storename': function() {
		s = Stores.findOne(this.store_id);
		return s.storename;
	}
})