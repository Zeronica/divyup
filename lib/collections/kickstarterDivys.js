KickstarterDivys = new Meteor.Collection("kickstarterDivys");
/*
divy_id
*/

Meteor.methods({
	'setKickstarterDivy': function(data) {
		return setKickstarterDivy(data);
	}
});

var setKickstarterDivy = function(data) {
	if (!data.divy_id)
		throw new Meteor.Error(422, 'please provide divy_id');

	KickstarterDivys.insert({divy_id: data.divy_id});
	return divy_id;
}