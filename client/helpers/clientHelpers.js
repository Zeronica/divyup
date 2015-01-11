Meteor.clientHelpers = {
	currentlyDelivering: function(store_id) {
		d = new Date(TimeSync.serverTime());
		store = Stores.findOne(store_id);
		return d.getHours()*100 >= store.delivery_start && d.getHours()*100 <= store.delivery_end;
	}
}