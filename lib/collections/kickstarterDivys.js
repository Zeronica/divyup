KickstarterDivys = new Meteor.Collection("kickstarterDivys");
/*
divy_id
deliver_time #keep consistent with deliverydivy, but now deliver_time is ASAP, so the time of creation.
store_id
locked
*/

Meteor.methods({
	'setKickstarterDivy': function(data) {
		return setKickstarterDivy(data);
	}
});

var setKickstarterDivy = function(data) {
	if (!data.divy_id && !data.deliver_time && !data.store_id)
		throw new Meteor.Error(422, 'please provide divy_id, store_id, and deliver_time.');

	// deliver time should be in minutes, convert to utc date
	deliver_time = Meteor.myFunctions.minutesToUTC(data.deliver_time);

	KickstarterDivys.insert({divy_id: data.divy_id, 
		deliver_time: deliver_time, 
		store_id: data.store_id,
		locked: false
	});
};