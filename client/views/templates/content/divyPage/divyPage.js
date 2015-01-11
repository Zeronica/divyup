Template.divyPage.helpers({
	comments: function() {
		return Comments.find({divyId: this._id});
	},

	'f_departTime': function() {
		time = DeliveryWindows.findOne({divy_id: this._id}).depart_time;
		hour = ~~(time/100);
		minutes = time % 100;
		return hour + ":" + minutes;
	}, 

	'f_arrivalTime': function() {
		time = DeliveryWindows.findOne({divy_id: this._id}).arrival_time;
		hour = ~~(time/100);
		minutes = time % 100;
		return hour + ":" + minutes;
	},

	total: function() {
	return Divys.findOne({_id: this._id}).total;
	},

	quota: function() {
	return Divys.findOne({_id: this._id}).quota;
	},

	title: function() {
	return Divys.findOne({_id: this._id}).title;
	},

	f_hasTitle: function() {
	return Divys.find({store_id: this._id}).title.count() > 0;
	},

	f_deliveryWindow: function() {
	return DeliveryWindows.finOne({divy_id: this._id}) == true;
	}

});