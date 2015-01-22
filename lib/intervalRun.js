Meteor.methods({
	'checkDivyStatus': function() {
		// potential issue with divys not being locked for days. Implement a datestamp security measure
		// later
		serverTime = Meteor.myFunctions.serverTime();
		w8_time = Meteor.myFunctions.getWaitTime();

		kDivys = KickstarterDivys.find({locked: false}).fetch();
		for (divy in kDivys) {
			// check if quota was met
			if (Meteor.myFunctions.divyQuotaMet(divy._id, divy.store_id)) {
				//PTNS
			}

			// check if time has run out
			deliverTime = Meteor.myFunctions.utcToMinutes(divy.deliver_time);
			if (serverTime > deliverTime + 2*w8_time) {
				// not PTNS
			}
		}

		dDivys = DeliveryDivys.find({locked: false}).fetch();
		for (divy in dDivys) {
			// check if quota was met
			if (Meteor.myFunctions.divyQuotaMet(divy._id, divy.store_id)) {
				//PTNS
			}

			// check if time has run out
			deliverTime = Meteor.myFunctions.utcToMinutes(divy.deliver_time);
			if (serverTime > deliverTime + w8_time) {
				// PTNS
			}
		}
	}
})
