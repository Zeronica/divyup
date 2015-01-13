KickstarterDivys = new Meteor.Collection("kickstarterDivys");
/*
divy_id
*/


Meteor.methods({
	'setNewKickstarterDivy': function(data) {
		return setNewKickstarterDivy(data);
	},
	'getKickstarterDivy': function(data) {
		return setNewKickstarterDivy(data);
	}
});

var setNewKickstarterDivy = function(data) {
	
}

var getNewKickstarterDivy = function(data) {
	if (!data.store_id)
		throw new Meteor.Error(422, 'please provide store_id.');

	d = Divys.find({store_id: data.store_id}).fetch();

	for (i=0; i<d.length; i++) {
		k = KickstarterDivys.findOne({divy_id: d[i]._id});
		if (k)
			return k
	}

	return undefined;
};