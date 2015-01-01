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
	}, 

	'f_countDown': function() {
		depart_time = DeliveryWindows.findOne({_id: this._id}).depart_time;
		currTime = ~~((Meteor.realServerTime()%86400000)/3600000);
		console.log(currTime);
		difference = depart_time - currTime;
		return ~~(difference/100) + ":" +difference%100; 
	}
})

Template.divyMenu.events({
	'click [name=commitDivy]': function(e) {
		e.preventDefault();
		Router.go('foodMenu', {_id: this.store_id});
	}
})