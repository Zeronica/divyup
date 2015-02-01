Template.deliveryTrip.events({
	'click #arriving': function(e) {
		e.preventDefault();

		p = ProcessingDivys.findOne({divy_id: this._id});
		// change the status of the processing divy
		Meteor.call("updateProcessingDivy", {_id: p._id, status: 4}, function(err, result){
			if (err)
				return alert(err.reason);
		    Router.go('orderList', {_id: this._id});
		});
	}
});