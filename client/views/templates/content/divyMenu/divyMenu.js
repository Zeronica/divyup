var getKickstarterDivy = function(store_id) {
	return KickstarterDivys.findOne({store_id: store_id, locked: false});
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
		return Meteor.clientHelpers.displayTimeFromMinutes(this.delivery_start);
	},

	'f_totalPlacedAlready': function() {
		// find the first delivery divy, or return 0 if it exists. 
		d = DeliveryDivys.find({store_id: this._id}, {sort: {deliver_time: 1}}, {limit: 1});
		if (d.count() === 0)
			return 0;
		d = d.fetch()[0];
		return Meteor.myFunctions.totalInDivy(d.divy_id);
	}
})

Template.currentKickstarter.helpers({
	'f_amountNeeded': function() {
		return Stores.findOne(this.store_id).quota;
	},
	'f_amountPresent': function() {
		return Meteor.myFunctions.totalInDivy(this._id);
	}
});
/*Event handler*/
/*-----------------------------------------------------------------------------------------------*/

// add to a current kickstarter
Template.currentKickstarter.events({
	'click a': function() {
		alert("you have chosen to contribute to an existing divy.");
		Meteor.call('orderCurrentKickstarter', {divy_id: this._id}, function(error, result) {
			if (error)
				return alert(error.reason);
			Router.go('foodMenu', {_id: result});
		});
	}
});

// create a new kickstarter
Template.kickstartNewDivy.events({
	'click a': function() {
		alert("you have chosen to start a new divy");
		Meteor.call('orderNewKickstarter', {store_id: this._id}, function(error, result) {
			if (error)
				return alert(error.reason);
			Router.go('foodMenu', {_id: result});
		});
	}
});

// preorder for a delivery window.
Template.preorder.events({
	'click a': function() {
		alert("you have chosen to preorder for delivery hours.");
		Meteor.call('orderDeliveryWindow', {store_id: this._id}, function(error, result) {
			if (error)
				return alert(error.reason);
			Router.go('foodMenu', {_id: result});
		});
	}
});