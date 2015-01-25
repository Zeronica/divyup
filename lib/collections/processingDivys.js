ProcessingDivys = new Meteor.Collection('processingDivys');
// driver_id
// divy_id
// status

Meteor.methods({
	'setProcessingDivy': function(data) {
		return setProcessingDivy(data);
	}
});

var setProcessingDivy = function(data) {
	if (!data.driver_id && !data.divy_id)
		throw new Meteor.Error(422, 'please provide driver_id and divy_id.');

	// check if the driver is online
	d = Drivers.findOne(data.driver_id);
	if (!d.online)
		throw new Meteor.Error(422, 'Please provide the id of a driver that is online and available');

	// check if a processing divy exists already for the driver
	p = ProcessingDivys.findOne({driver_id: data.driver_id});
	if (p) {
		throw new Meteor.Error(422, 'this driver already has a processingdivy');
	}

	return ProcessingDivys.insert({driver_id: data.driver_id, divy_id: data.divy_id, status: 1});
};

