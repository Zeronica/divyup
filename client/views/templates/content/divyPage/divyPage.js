Template.divyPage.helpers({
	comments: function() {
		return Comments.find({divyId: this._id});
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

	total: function() {
	return Divys.findOne({_id: this._id}).total;
	},

	quota: function() {
	return Divys.findOne({_id: this._id}).quota;
	}
});