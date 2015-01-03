Template.divyMenu.helpers({
	// kickStart divys
	'f_divys': function() {
		return Divys.find({store_id: this._id});
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
	}
})

Template.divyMenu.events({
	'click [name=commitDivy]': function(e) {
		e.preventDefault();
		console.log(this);
		if (CurrentOrders.findOne(Meteor.userId())) {
			Router.go('checkoutMenu');
		}
		else if (Orders.find({user_id: Meteor.userId(), store_id: this.store_id}).count() === 0) {
			Router.go('foodMenu', {_id: this.store_id});
		}
		else {
			Router.go('orderMenu', {_id: this.store_id});
		}
	}
})