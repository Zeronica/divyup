Meteor.methods({
	'orderDeliveryWindow': function(data) {
		return orderDeliveryWindow(data);
	},
	'orderCurrentKickstarter': function(data) {
		return orderCurrentKickstarter(data);
	},
	'orderNewKickstarter': function(data) {
		return orderNewKickstarter(data);
	}
});

// store_id
var orderDeliveryWindow = function(data) {
	if (!data.store_id)
		throw new Meteor.Error(422, 'please provide store_id');

	// get the store
	s = Stores.findOne(data.store_id);
	if (!s) 
		throw new Meteor.Error(422, 'the provided store_id is not valid');
	
	w8_time = Meteor.myFunctions.getWaitTime();

	// if arrival time is defined
	if (data.arrival_time) {
		arrival_time = data.arrival_time;

	} 
	else {	// else determine whether the currenttime is inside delivery window for the store
		currentTime = Meteor.myFunctions.utcToMinutes((new Date()).getTime());
		// if within delivery window, set the arrival time to if the order was sent out at this minute
		if (Meteor.myFunctions.withinDeliveryWindow(currentTime, s.delivery_start, s.delivery_end)) {
			arrival_time = currentTime + s.estimated_time;
		} 
		else {	// set it to when delivery hours start.
			arrival_time = s.delivery_start;
		}
	}
	deliver_time = arrival_time - s.estimated_time;
	d = DeliveryDivys.findOne({store_id: data.store_id, "deliver_time": {$gt: deliver_time - w8_time, $lt: deliver_time + w8_time}});

	if (!d) {	// if no deliverydivy could be found for this window, we create one
		divy_id = Meteor.call("setDivy", {store_id: s._id});
		r = Meteor.call("setDeliveryDivy", {divy_id: divy_id, deliver_time: deliver_time, store_id: s._id});
	}
	else {
		divy_id = d.divy_id;
	}
	Meteor.call('setCurrentOrder', {divy_id: divy_id});
	return data.store_id;
};

// divy_id
var orderCurrentKickstarter = function(data) {
	if (!data.divy_id)
		throw new Meteor.Error(422, 'please provide divy_id');

	d = Divys.findOne(data.divy_id);
	if (!d)
		throw new Meteor.Error(422, 'the divy_id provided is invalid');

	// set current order with the existing divy
	Meteor.call('setCurrentOrder', {divy_id: data.divy_id, user_id: Meteor.userId()});

	return d.store_id;
}

// store_id
var orderNewKickstarter = function(data) {
	if (!data.store_id)
		throw new Meteor.Error(422, 'please provide store_id');

	divy_id = Meteor.call('setDivy', {store_id: data.store_id});
	Meteor.call('setKickstarterDivy', {store_id: data.store_id, divy_id: divy_id});

	Meteor.call('setCurrentOrder', {divy_id: divy_id})

	return data.store_id;
}