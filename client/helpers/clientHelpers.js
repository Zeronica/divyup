Meteor.clientHelpers = {
	currentlyDelivering: function(data) {
		d = new Date(TimeSync.serverTime());
		return d.getHours()*100 >= data.delivery_start && d.getHours()*100 <= data.delivery_end;
	},

	displayTimeFromMinutes: function(minutes) {
		hours = ~~(minutes / 60);
		minutes = minutes % 60;

		if (minutes < 10)
			minutes = "0" + minutes; 

		return hours + ":" + minutes;
	}
}