Meteor.methods({
	'checkStatus': function() {
		console.log("checking");
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
		kDivys = KickstarterDivys.find({locked: false, store_id: store._id}).fetch();
		for (divy in kDivys) {
			// check if quota was met
			if (Meteor.myFunctions.divyQuotaMet(divy._id, store.quota)) {
				//PTNS
				console.log("proceeding");
			}

			// check if time has run out
			deliverTime = Meteor.myFunctions.utcToMinutes(divy.deliver_time);
			if (serverTime > deliverTime + 2*w8_time) {
				// not PTNS
				console.log("not so");
			}
		}
	} 
	else {
		dDivys = DeliveryDivys.find({locked: false, store_id: store._id}).fetch();
		for (divy in dDivys) {
			// check if quota was met
			if (Meteor.myFunctions.divyQuotaMet(divy._id, store.quota)) {
				console.log("proceeding");
			}

			// check if time has run out
			deliverTime = Meteor.myFunctions.utcToMinutes(divy.deliver_time);
			if (serverTime > deliverTime + w8_time) {
				console.log("proceeding");
			}
		}
	}
};
