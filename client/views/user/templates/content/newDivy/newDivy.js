Template.newDivy.helpers({
	'f_pickupStores': function() {
		return PickupStores.find({pickup_id: Meteor.user().profile.pickup_id});
	}
});

Template.storeItem.helpers({
	'f_storename': function() {
		s = Stores.findOne(this.store_id);
		return s.storename;
	},

	'f_deliveryType': function(){
		if (this.deliver_type === 2)
			return "Driver delivery";
		return "Walker delivery";
	}
})

Template.storeItem.events({
	'click #item': function() {
			Meteor.call("orderToNewDivy", {pickupStore_id: this._id}, function(err,result){
				if (err)
					return alert(err.reason);
				Router.go("foodMenu", {_id: result});
			});
		}
})
