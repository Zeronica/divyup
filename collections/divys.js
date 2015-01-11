Divys = new Meteor.Collection('divys');
/*
store_id
created_at
locked #boolean value: whether users can still add to this divy
*/

Meteor.methods({
	'setNewDivy': function(data) {
		return setNewDivy(data);
	}
});

var setNewDivy = function(data) {
	// given a store_id, creates a new divy, with locked set to false;

	// data checking here.

	// store_id validity check here

	return Divys.insert({store_id: data.store_id, locked: false, created_at: new Date().valueOf()});
}