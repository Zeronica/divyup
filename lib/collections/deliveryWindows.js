DeliveryWindows = new Meteor.Collection("deliveryWindows");
/*
divy_id: a delivery window is a manual divy set up by us.
depart_time: #int, military time
arrival_time: 
*/

Meteor.methods ({
	'getServerTime': function() {
		return Date.now();
	}
})
