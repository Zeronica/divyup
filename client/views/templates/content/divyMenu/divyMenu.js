var getKickstarterDivy = function(store_id) {
	d = Divys.find({store_id: store_id}).fetch();
	for (i=0; i<d.length; i++) {
		k = KickstarterDivys.findOne({divy_id: d[i]._id});
		if (k)
			return d[i] //return the divy
	}
	return undefined;
};

Template.divyMenu.helpers({
	'f_hasKickstarter': function() {
		return getKickstarterDivy(this._id) != undefined;
	},

	'f_kickstarter': function() {
		return getKickstarterDivy(this._id);
	}
});

Template.preorder.helpers({
	/*temp functions*/
	/*--------------------------------------------*/
	'f_beginTime': function() {
		return "5:00 PM";
	},

	'f_timeFromNow': function() {
		return "70 minutes";
	}
})

Template.currentKickstarter.helpers({
	'f_amountNeeded': function() {
		return Stores.findOne(this.store_id).quota;
	},
	'f_amountPresent': function() {
		// return Meteor.myFunctions.totalInDivy(this._id);
		return 0;
	}
});
/*Event handler*/
/*-----------------------------------------------------------------------------------------------*/

// add to an existing kickstarterDivy/divy, set currentOrder to that divy_id
Template.currentKickstarter.events({
	'click a': function() {
		alert("you have chosen to contribute to an existing divy.");

		// set current order with the existing divy
		Meteor.call('setCurrentOrder', {divy_id: this._id, user_id: Meteor.userId()}, function(err, result) {
			if (err)
				return alert(err);

			Router.go('foodMenu', {_id: result});
		});
	}
});

// create a new kickstarterDivy/divy, set currentOrder to that divy_id
Template.kickstartNewDivy.events({
	'click a': function() {
		alert("you have chosen to start a new divy");

		// creates a new divy and sets current order to the existing divy
		Meteor.call('setKickstarterDivy', {user_id: Meteor.userId(), store_id: this._id}, function(error, result) {
			if (error)
				return alert(error.reason);
			Meteor.call('setCurrentOrder', {divy_id: result, user_id: Meteor.userId()}, function(err, result) {
				if (err)
					return alert(error.reason);
				Router.go('foodMenu', {_id: result});
			});	
		});
	}
});

Template.preorder.events({
	'click a': function() {
		alert("you have chosen to preorder for delivery hours.");
		// either creates a new deliverydivy or finds an existing one to add to, then gets a divy_id
		// in return, then sets the currentOrder
		Meteor.call('setDeliveryDivy', {user_id: Meteor.userId(), store_id: this._id}, function(err, result) {
			if (err)
				return alert(err.reason)
			Meteor.call('setCurrentOrder', {divy_id: result, user_id: Meteor.userId()}, function(err, result) {
				if (err)
					return alert(error.reason);
				Router.go('foodMenu', {_id: result});
			});		
		})
	}
});