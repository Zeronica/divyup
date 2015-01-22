Divys = new Meteor.Collection('divys');
/*
store_id
created_at
locked #boolean value: whether users can still add to this divy
*/

Meteor.methods({
	'setDivy': function(data) {
		return setDivy(data);
	}
});

var setDivy = function(data) {
	if (!data.store_id)
		throw new Meteor.Error(422, 'please provide store_id');

	return Divys.insert({store_id: data.store_id, locked: false, created_at: new Date().valueOf()});
};