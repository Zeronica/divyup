Template.pickupMenu.helpers({
	'f_pickupLocations': function(){
		return Pickups.find();
	}
});

Template.pickupMenu.events({
	'click #pickupItem': function() {
		r = confirm("select " + this.name + " as your dropoff location?");
		if (r) {
			Meteor.call("setPickupForUser", {pickup_id: this._id}, function(err){
				if (err)
					return alert(err.reason);
				Router.go("userHome");
			});
		}
	},
})