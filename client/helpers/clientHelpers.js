Meteor.clientHelpers = {

	currentlyDelivering: function(store_id) {
		store = Stores.findOne(store_id);
		currentTime = TimeSync.serverTime();

		return Meteor.myFunctions.withinDeliveryWindow(
			Meteor.myFunctions.utcToMinutes(currentTime),
			store.delivery_start,
			store.delivery_end
		);
	},

	displayTimeFromMinutes: function(minutes) {
		hours = ~~(minutes / 60);
		minutes = minutes % 60;

		if (minutes < 10)
			minutes = "0" + minutes; 

		return hours + ":" + minutes;
	}
}