Divys = new Meteor.Collection('divys');
/*
store_id
quota
locked: #whether users can add to;
*/

Meteor.methods({
	'setDivy': function(data) {
		return setDivy(data);
	}
});

var setDivy = function(data) {
	if (!data.store_id && !data.quota)
		throw new Meteor.Error(422, 'please provide store_id and quota');

	return Divys.insert({store_id: data.store_id, quota: data.quota, archived: false});
};