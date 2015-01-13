KickstarterDivys = new Meteor.Collection("kickstarterDivys");
/*
divy_id
*/


Meteor.methods({
	'setKickstarterDivy': function(data) {
		return setNewKickstarterDivy(data);
	}
});

var setKickstarterDivy = function(data) {
	// no error checking necessary
	divy_id = Meteor.call("setNewDivy", data);
	KickstarterDivys.insert({divy_id: divy_id});

	return divy_id;
}