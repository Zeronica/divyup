Template.orderTrip.events({
	'click #pickedup': function(e) {
		e.preventDefault();

		p = ProcessingDivys.findOne({divy_id: this._id});
		// change the status of the processing divy
		Meteor.call("updateProcessingDivy", {_id: p._id, status: 3}, function(err, result){
			if (err)
				return alert(err.reason);
		    Router.go('deliveryTrip', {_id: this._id});
		});
	},
});