Template.divyMenu.helpers({
	// kickStart divys
	'f_divys': function() {
		return Divys.find({store_id: this._id});
	},

	'f_hasDivys': function() {
		return Divys.find({store_id: this._id}).count() > 0;
	},

	'f_noDivyMessage': function() {
		return "Looks like no one has kickstarted a divy yet. You can start one by touching the button on the right hand corner."
	},

	'f_stores': function() {
		return Stores.findOne({_id: this._id});
	},



	// delivery windows
	'f_deliveryWindows': function() {
		return DeliveryWindows.find();
	},

	'f_departTime': function() {
		time = DeliveryWindows.findOne({_id: this._id}).depart_time;
		hour = ~~(time/100);
		minutes = time % 100;
		return hour + ":" + minutes;
	}, 

	'f_arrivalTime': function() {
		time = DeliveryWindows.findOne({_id: this._id}).arrival_time;
		hour = ~~(time/100);
		minutes = time % 100;
		return hour + ":" + minutes;
	},

	commentsCount: function() {
    return Comments.find({postId: this._id}).count();
  }
})

Template.divyMenu.events({
	'click [name=commitDivy]': function(e) {
		e.preventDefault();
		m = CurrentOrders.findOne({user_id: Meteor.userId()});
		if (m) {
			Router.go('checkoutMenu', {_id: m._id});
		}
		else if (Orders.find({user_id: Meteor.userId(), store_id: this.store_id}).count() === 0) {
			Router.go('foodMenu', {_id: this.store_id});
		}
		else {
			Router.go('orderMenu', {_id: this.store_id});
		}
	}
})