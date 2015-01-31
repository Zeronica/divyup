DivyOrders = new Meteor.Collection('divyOrders');
/*
divy_id
order_id
archived
*/

Meteor.methods({
	'setDivyOrder': function(data) {
		return setDivyOrder(data);
	},

	'updateDivyOrder': function(data) {
		return updateProcessingDivy(data);
	}
});

// expected to be called upon checkout. create a divyorder, which essentially adds an order to a divy
setDivyOrder = function(data) {
	if (!data.divy_id && !data.order_id)
		throw new Meteor.Error(422, 'please provide divy_id and order_id.');

	// check the divy
	d = Divys.findOne(data.divy_id);
	if (!d)
		throw new Meteor.Error(400, 'no divy found for provided id');
	else if (d.archived)
		throw new Meteor.Error(400, 'this divy has been archived');

	return DivyOrders.insert({
		divy_id: data.divy_id,
		order_id: data.order_id,
		archived: false
	});
};

var updateDivyOrder = function(data) {
	if (!data._id && !data.status) {
		throw new Meteor.Error(422, 'please provide _id and status.');
	}
	DivyOrders.update({_id: data._id}, {status: data.status});	
};