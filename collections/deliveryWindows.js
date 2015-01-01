DeliveryWindows = new Meteor.Collection("deliveryWindows");
/*
depart_time: #int, military time
arrival_time: 
*/

Meteor.methods ({
	'getServerTime': function() {
		return Date.now();
	}
})
