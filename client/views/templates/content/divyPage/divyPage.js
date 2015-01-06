Template.divyPage.helpers({
	comments: function() {
		return Comments.find({divyId: this._id});
	}
});