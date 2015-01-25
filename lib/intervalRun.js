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
		kDivys = KickstarterDivys.find({locked: false, store_id: store._id}).fetch();
		for (i in kDivys) {
			console.log("in loop");

			// check if quota was met
			if (Meteor.myFunctions.divyQuotaMet(kDivys[i].divy_id, store.quota)) {
				p = Meteor.call("setProcessingDivy", {driver_id: driver_id, divy_id: kDivys[i].divy_id});
				// lock the kickstarter
				Meteor.call("lockKickstarterDivy", kDivys[i]._id);
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
		dDivys = DeliveryDivys.find({locked: false, store_id: store._id}).fetch();
		for (divy in dDivys) {
			driver_id = Drivers.findOne();
			// check if quota was met
			if (Meteor.myFunctions.divyQuotaMet(divy._id, store.quota)) {
				p = Meteor.call("setProcessingDivy", {driver_id: driver_id, divy_id: dDivys[i].divy_id});
				if (!p)
					throw new Meteor.Error(422, "");
				// lock the kickstarter
				Meteor.call("lockDeliverDivy", dDivys[i]._id);
			} else { // check if time has run out
				deliverTime = Meteor.myFunctions.utcToMinutes(divy.deliver_time);
				if (serverTime > deliverTime + w8_time) {
					p = Meteor.call("setProcessingDivy", {driver_id: driver_id, divy_id: dDivys[i].divy_id});
					if (!p)
						throw new Meteor.Error(422, "");
					// lock the kickstarter
					Meteor.call("lockDeliverDivy", dDivys[i]._id);
				}
			}
		}
	}
};

