Meteor.methods({
	'setPickupForUser': function(data) {
		if (!data.pickup_id)
			throw new Meteor.Error(422, 'please provide pickup_id');

		Meteor.users.update({_id:Meteor.userId()}, {$set:{"profile.pickup_id": data.pickup_id}});
	},

	'orderToExistingDivy': function(data) {
		if (!data.pickupDivy_id)
			throw new Meteor.Error(422, 'please provide pickupDivy_id');

		// data validity check
		p = PickupDivys.findOne(data.pickupDivy_id);
		if (!p)
			throw new Meteor.Error(422, 'the pickupDivy_id provided is invalid'+ data.pickupDivy_id);

		// set current order with the existing divy
		store_id = Meteor.call('setCurrentOrder', {divy_id: data.divy_id});

		return store_id;
	},

	'orderToNewDivy': function(data) {
		if (!data.pickupStore_id)
			throw new Meteor.Error(422, 'please provide pickupStore_id');

		// data validity check
		p = PickupStores.findOne(data.pickupStore_id);
		if (!p)
			throw new Meteor.Error(422, 'the pickupStore_id provided is invalid'+ data.pickupStore_id);

		// set current order with the existing divy
		store_id = Meteor.call('setCurrentOrder', {store_id: p.store_id});

		return store_id;		
	},

	'addItemsToCart': function(data) {
		if (!data.menu_item_id)
			throw new Meteor.Error(422, 'please provide menu_item_id.');

		c = CurrentOrders.findOne({user_id: Meteor.userId()});
		if (!c)
			throw new Meteor.Error(422, 'currentOrder has not been defined.');

		// data validity check
		if (!MenuItems.findOne(data.menu_item_id))
			throw new Meteor.Error(422, 'menu_item_id is not valid');

		return OrderItems.insert({menu_item_id: data.menu_item_id, order_id: c.order_id});
	},

	'checkoutCurrentOrder': function(data) {
		c = CurrentOrders.findOne({user_id: Meteor.userId()});
		if (!c)
			throw new Meteor.Error(400, 'no current order found for this user.');

		// no existing divy_id, create a new divy and associated pickup divys for the store
		if (!c.divy_id) {
			divy_id = createDivyForStoreAndPickup(c);
		} else {
			divy_id: c.divy_id
		}

		d = Meteor.call("setDivyOrder", {order_id: c.order_id, divy_id: divy_id, pickup: Meteor.user().profile.pickup_id});

		// delete currentOrder if checkout was successful
		if (d)
			CurrentOrders.remove(c._id);
	}
});

// takes in a currentOrder object as c
var createDivyForStoreAndPickup = function(c) {
	pickupStore = PickupStores.findOne({store_id: c.store_id, pickup_id: Meteor.user().profile.pickup_id});
	divy_id = Divys.insert({
		store_id: c.store_id,
		quota: pickupStore.quota
	});

	if (pickupStore.shared) {
		// temporary, create for all pickup locations
		pickups = Pickups.find().fetch();
		for (p in pickups) {
			PickupDivys.insert({
				divy_id: divy_id,
				pickup_id: pickups[p]._id
			});
		}
	} else {
		PickupDivys.insert({
			divy_id: divy_id,
			pickup_id: pickupStores._id
		});
	}

	return divy_id;
}

		// // create a new divy with the store_id
		// divy_id = Divys.insert({
		// 	store_id: p.store_id,
		// 	quota: p.quota
		// });

		// // case: if driver, then 
		// if (p.shared) {
		// 	// temporary code for now, assume all pickups share same the area
		// 	pickups = PickupStores.find().fetch();
		// 	// end of temporary code

		// 	for (i in pickups) {
		// 		PickupDivys.insert({
		// 			pickup_id: pickups[i]._id,
		// 			divy_id = divy_id 
		// 		});
		// 	}
		// } else {
		// 	PickupDivys.insert({
		// 		pickup_id: p.pickup_id,
		// 		divy_id: divy_id
		// 	});
		// }

		// // set current order with the existing divy
		// store_id = Meteor.call('setCurrentOrder', {divy_id: divy_id, user_id: Meteor.userId()});

		// return store_id;