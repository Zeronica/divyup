Meteor.methods({
	'checkStatus': function() {
		stores = Stores.find().fetch();
		for (s in stores) {
			checkStoreStatus(stores[s]);
		}
	}
});

var checkStoreStatus = function(store) {
	// potential issue with divys not being locked for days. Implement a datestamp security measure
	// later
	serverTime = Meteor.myFunctions.serverTime();
	w8_time = Meteor.myFunctions.getWaitTime();
	// if outside window, check the kickstarter divys
	if (!Meteor.myFunctions.currentlyDelivering(store._id)) {
		driver_id = Drivers.findOne()._id;
		kDivys = KickstarterDivys.find({locked: false, store_id: store._id, deliver_time: {$lt: (new Date()).getTime()}}).fetch();
		for (i in kDivys) {
			console.log("in loop");
			// check if quota was met
			if (Meteor.myFunctions.divyQuotaMet(kDivys[i].divy_id, store.quota)) {
				sendKickstarterDivy(kDivys[i].divy_id, kDivys[i]._id);
			} else { // check if time has run out
				deliverTime = Meteor.myFunctions.utcToMinutes(kDivys[i].deliver_time);
				if (serverTime > deliverTime + 2*w8_time) {
					// not PTNS
					console.log("not so");
				}
			}
		}
	}
	else {
		dDivys = DeliveryDivys.find({locked: false, store_id: store._id, deliver_time: {$lt: (new Date()).getTime()}}).fetch();
		for (divy in dDivys) {
			driver_id = Drivers.findOne();
			// check if quota was met
			if (Meteor.myFunctions.divyQuotaMet(divy._id, store.quota)) {
				sendDeliverDivy(dDivys[i].divy_id, dDivys[i]._id);
			} else { // check if time has run out
				deliverTime = Meteor.myFunctions.utcToMinutes(divy.deliver_time);
				if (serverTime > deliverTime + w8_time) {
					sendDeliverDivy(dDivys[i].divy_id, dDivys[i]._id);
				}
			}
		}
	}
};

var sendKickstarterDivy = function(divy_id, kDivy_id, store_id) {
	// find closest online driver for this store
	driver_id = Meteor.myFunctions.findClosestDriverToStore(store_id);

	p = Meteor.call("setProcessingDivy", {driver_id: driver_id, divy_id: divy_id});
	// lock the kickstarter
	Meteor.call("lockKickstarterDivy", {_id: kDivy_id});
};

var sendDeliverDivy = function(divy_id, dDivy_id, store_id) {
	// find closest online driver for this store
	driver_id = Meteor.myFunctions.findClosestDriverToStore(store_id);

	p = Meteor.call("setProcessingDivy", {driver_id: driver_id, divy_id: divy_id});
	// lock the kickstarter
	Meteor.call("lockDeliverDivy", {_id: dDivy_id});
};