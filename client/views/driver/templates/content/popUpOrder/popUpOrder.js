Template.popUpOrder.helpers({
	f_store: function() {
		return Stores.findOne(this.store_id).storename;
	},
});

Template.popUpOrder.events({
	'click #accept': function(e) {
		e.preventDefault();

		p = ProcessingDivys.findOne({divy_id: this._id});
		// change the status of the processing divy
		Meteor.call("updateProcessingDivy", {_id: p._id, status: 2}, function(err, result){
			if (err)
				return alert(err.reason);
		    Router.go('orderTrip', {_id: this._id});
		});
	},

	'click #cancel': function(e) {
		e.preventDefault();
		Router.go('driverMenu');
	},
});