Template.orderList.helpers({
	'f_order': function() {
		return DivyOrders.find({divy_id: this._id, status: {$in: [2, 3]}});
	},

	'username': function() {
		order = DivyOrders.find({divy_id: this._id}).order_id;
		return Orders.findOne({_id: order}).user_id;
	},

	// 'confirmationnumber': function() {
	// 	return DivyOrders.find({divy_id: divyid});
	// },
});

Template.orderList.events({
	'click #proceed': function(e) {
		e.preventDefault();
		Router.go('deliveryTrip', {_id: this._id}); 
	},

	'click #boxchecked': function(e){
		if (document.getElementById("deliveredbox").checked == true) { //this.checked
         	Meteor.call("updateDivyOrder", {_id: this._id, status: 1}, function(err, result){
			if (err)
				return alert(err.reason);
			});
        }
        else { 
        	Meteor.call("updateDivyOrder", {_id: this._id, status: 3}, function(err, result){
			if (err)
				return alert(err.reason);
			});
        }
	},

	'click #end': function(e) {
		e.preventDefault();
		Router.go('driverMenu');
	}
});