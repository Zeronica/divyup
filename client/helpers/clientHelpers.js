Meteor.clientHelpers = {
	currentlyDelivering: function(data) {
		d = new Date(TimeSync.serverTime());
		return d.getHours()*100 >= data.delivery_start && d.getHours()*100 <= data.delivery_end;
	}
}