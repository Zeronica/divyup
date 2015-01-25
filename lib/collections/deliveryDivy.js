DeliveryDivys = new Meteor.Collection('deliveryDivys');
/*
divy_id
deliver_time #this is the time past which the delivery is available be sent to a driver
store_id
locked
*/

Meteor.methods ({
	'setDeliveryDivy': function(data) {
		return setDeliveryDivy(data);
	}, 
	'lockDeliveryDivy': function(data) {
		return lockDeliveryDivy(data);
	}
});

var setDeliveryDivy = function(data) {
	if (!data.divy_id && !data.deliver_time && !data.store_id)
		throw new Meteor.Error(422, 'please provide divy_id and deliver_time.');

	// deliver time should be in minutes, convert to utc date
	deliver_time = Meteor.myFunctions.minutesToUTC(data.deliver_time);

	DeliveryDivys.insert({divy_id: data.divy_id, 
		deliver_time: deliver_time, 
		store_id: data.store_id,
		locked: false
	});
};

var lockDeliveryDivy = function(data) {
	if (!data._id)
		throw new Meteor.Error(422, 'please provide _id.');

	return DeliveryDivys.update({_id: data._id}, {locked: true});
}