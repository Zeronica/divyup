Template.divyMenu.helpers({
	'f_hasDivys': function() {
		return Divys.findOne({store_id: this._id, locked: false}) != undefined;
	},

	'f_divys': function() {
		return Divys.find({store_id: this._id, locked: false});
	},

	/*temp functions*/
	/*--------------------------------------------*/
	'f_beginTime': function() {
		return "5:00 PM";
	},

	'f_timeFromNow': function() {
		return "70 minutes";
	}
});

Template.existingDivy.helpers({
	'f_amountNeeded': function() {
		return 200;
	},
	'f_amountPresent': function() {
		return 0;
	}
});

Template.existingDivy.events({
	'click li': function() {
		alert("you have chosen to contribute to an existing divy.");
		Meteor.call('setCurrentOrder', {divy_id: this._id, user_id: Meteor.userId()});
		Router.go('foodMenu', {_id: this.store_id});
	}
});

Template.kickstartNewDivy.events({
	'click li': function() {
		alert("you have chosen to start a new divy");
		Meteor.call('setNewDivy', {user_id: Meteor.userId(), store_id: this._id}, function(error, result) {
			if (error)
				return alert(error.reason);
			console.log(result);
		});
		// Meteor.call('setCurrentOrder', {divy_id: this._id, user_id: Meteor.userId()});
		// Router.go('foodMenu', {_id: this.store_id});
	}
});












// Template.divyMenu.helpers({
// 	// kickStart divys
// 	'f_divys': function() {
// 		return Divys.find({store_id: this._id, quota: {$gt: 0}});
// 	},

// 	'f_hasDivys': function() {
// 		return Divys.findOne({store_id: this._id}) != undefined;
// 	},

// 	'f_noDivyMessage': function() {
// 		return "Looks like no one has kickstarted a divy yet. You can start one by touching the button on the right hand corner."
// 	},

// 	'f_stores': function() {
// 		return Stores.findOne({_id: this._id});
// 	},


// 	// delivery windows
// 	'f_deliveryWindows': function() {
// 		return DeliveryWindows.find();
// 	},

// 	'f_departTime': function() {
// 		time = DeliveryWindows.findOne({_id: this._id}).depart_time;
// 		hour = ~~(time/100);
// 		minutes = time % 100;
// 		return hour + ":" + minutes;
// 	}, 

// 	'f_arrivalTime': function() {
// 		time = DeliveryWindows.findOne({_id: this._id}).arrival_time;
// 		hour = ~~(time/100);
// 		minutes = time % 100;
// 		return hour + ":" + minutes;
// 	},

// 	commentsCount: function() {
//     return Comments.find({divyId: this._id}).count();
//   }
// })

// Template.divyMenu.events({
// 	'click [name=commitDivy]': function(e) {
// 		e.preventDefault();
// 		m = CurrentOrders.findOne({user_id: Meteor.userId()});
// 		console.log(this);
// 		if (m) {
// 			Router.go('checkoutMenu', {_id: this.divy_id});
// 		}
// 		else if (Orders.find({user_id: Meteor.userId(), store_id: this.store_id}).count() === 0) {
// 			Router.go('foodMenu', {_id: Divys.findOne(this.divy_id).store_id});
// 		}
// 		else {
// 			Router.go('orderMenu', {_id: this.store_id});
// 		}
// 	}
// })