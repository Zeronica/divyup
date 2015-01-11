Template.divyPage.helpers({
	comments: function() {
		return Comments.find({divyId: this._id});
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

});
