Template.userHome.helpers({
	'f_pickupDivys': function(){
		pickup_id = Meteor.user().profile.pickup_id;

		return PickupDivys.find({pickup_id: pickup_id});
	}
});

Template.divyItem.helpers({
	'f_storename': function() {
		d = Divys.findOne(this.divy_id);
		s = Stores.findOne();
		return s.storename;
	},

	'f_totalInDivy': function() {
		return Meteor.myFunctions.totalInDivy(this.divy_id);
	}
});