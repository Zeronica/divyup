Template.divyMenu.helpers({
	'f_hasDivys': function() {
		Meteor.call('getKickstarterDivy', {store_id: this._id}, function(err, result) {
			if (err)
				return alert(err.reason);
			Session.set("r_hasDivys", result);
		});
		return Session.get("r_hasDivys", result) === undefined;
	},

	'f_divy': function() {
		return Divys.findOne({store_id: this._id, locked: false});
	},
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

Template.existingDivy.helpers({
	'f_amountNeeded': function() {
		return 200;
	},
	'f_amountPresent': function() {
		return 0;
	}
});

Template.existingDivy.events({
	'click a': function() {
		alert("you have chosen to contribute to an existing divy.");
		// set current order with the existing divy
		Meteor.call('setCurrentOrder', {divy_id: this._id, user_id: Meteor.userId()}, function(err, result) {
			if (err)
				return alert(err);
			// get store_id due to callback scope.
			store_id = Orders.findOne(CurrentOrders.findOne(result).order_id).store_id;
			Router.go('foodMenu', {_id: store_id});
		});
	}
});

Template.kickstartNewDivy.events({
	'click a': function() {
		alert("you have chosen to start a new divy");
		// creates a new divy and sets current order to the existing divy
		Meteor.call('setNewDivy', {user_id: Meteor.userId(), store_id: this._id}, function(error, result) {
			if (error)
				return alert(error.reason);

			Meteor.call('setCurrentOrder', {divy_id: result, user_id: Meteor.userId()});
			Router.go('foodMenu', {_id: this.store_id});	
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
			Meteor.call('setCurrentOrder', {divy_id: result, user_id: Meteor.userId()});
			console.log(result);	
		})
	}
});