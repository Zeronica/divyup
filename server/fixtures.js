// Users
if (Meteor.users.find().count() === 0) {
  var user_id = Accounts.createUser({
      username: "Tony",
      password: "password",
      profile: {
      	pickup_id: undefined
      }
    });

  var driver_user_id = Accounts.createUser({
  	username: "Driver",
  	password: "password",
      profile: {
      	pickup_id: undefined
      }
  });
}

if (Constants.find().count() === 0) {
  Constants.insert({
  		name: "max_wait_time",
  		value: 900000
   });
}

if (Drivers.find().count() === 0) {
	Drivers.insert({
		user_id: driver_user_id,
		online: true
	});
}

//Stores
var stores = [
	{
		storename: 'In-n-Out',
		estimated_time: 3600000,
		delivery_start: 64800000,
		delivery_end: 90000000,
		quota: 120,
		address: "8300+Oakport+Street,Oakland,CA"
	},
	{
		storename: 'Wendys',
		estimated_time: 3600000,
		delivery_start: 64800000,
		delivery_end: 90000000,
		quota: 100,
		address: "5211+Broadway,Oakland,CA"
	},
	{
		storename: 'Jack-in-the-box',
		estimated_time: 3600000,
		delivery_start: 64800000,
		delivery_end: 90000000,
		quota: 100,
		address: "4425+Telegraph+Avenue,Oakland,CA"
	},
	{
		storename: 'Mcdonalds',
		estimated_time: 3600000,
		delivery_start: 64800000,
		delivery_end: 90000000,
		quota: 100,
		address: "4514+Telegraph+Avenue,Oakland,CA"
	}
];
if (Stores.find().count() === 0) {
	var store_id = Stores.insert(stores[0]);
	Stores.insert(stores[1]);
	Stores.insert(stores[2]);
	Stores.insert(stores[3]);
}

//Menus
if (Menus.find().count() === 0) {
	var menu_id = Menus.insert({
		store_id: store_id
	});
}

//MenuItems
if (MenuItems.find().count() === 0) {
	var menuItems = [
		{
			menu_id: menu_id,
			name: "Double Meat",
			price: 4.99
		},
		{
			menu_id: menu_id,
			name: "3 x 3",
			price: 5.99
		},
		{
			menu_id: menu_id,
			name: "4 x 4",
			price: 6.99
		},
		{
			menu_id: menu_id,
			name: "Protein Style (for mad gains yo)",
			price: 5.99
		}
	];
	for (i=0; i<menuItems.length; i++) {
		MenuItems.insert(menuItems[i]);
	}
};

// pickup
if (Pickups.find().count() === 0) {
	Pickups.insert({
		name: "Unit 1",
		description: "inside Unit 1",
		address: "2650+Durant+Avenue,Berkeley,CA"
	});
	Pickups.insert({
		name: "Unit 2",
		description: "inside Unit 2",
		address: "2650+Haste+Avenue,Berkeley,CA"
	});
	Pickups.insert({
		name: "Unit 3",
		description: "inside Unit 3",
		address: "2400+Durant+Avenue,Berkeley,CA"
	});
	Pickups.insert({
		name: "Foothill",
		description: "inside Foothill",
		address: "2700+Hearst,Berkeley,CA"
	});
	Pickups.insert({
		name: "Clark Kerr",
		description: "inside Clark Kerr",
		address: "2601+Warring+Street,Berkeley,CA"
	});
	Pickups.insert({
		name: "Stern Hall",
		description: "inside Stern Hall",
		address: "Hearst+Avenue+and+Highland+Place,Berkeley,CA"
	});
}

// //pickupStores
// if (PickupStores.find().count() === 0) {
// 	PickupStores.insert({
// 		pickup_id: Pickups.findOne({name: "Unit 3"})._id,
// 		store_id: Stores.findOne({storename: "In-n-Out"})._id,
// 		distance: 12,
// 		quota: 120,
// 		delivery_type: 2
// 	});
// }

if (PickupStores.find().count() === 0) {
	stores = Stores.find().fetch();
	pickups = Pickups.find().fetch();


	for (s in stores) {
		for (p in pickups) {
			getURL = "https://maps.googleapis.com/maps/api/directions/json?origin="
			+ stores[s].address + "&destination=" + pickups[p].address + "&key=" +
			"AIzaSyCIy_5Gn9SFxHI4bNTveFGOFjVYW2OX35M";

			// error check
			response = Meteor.http.get(getURL);
			data = JSON.parse(response.content);
			distance = data.routes[0].legs[0].distance; // distance obj
			if (distance.value > 1607) {
				shared = true;
			} else {
				shared = false;
			}

			PickupStores.insert({
				pickup_id: pickups[p]._id,
				store_id: stores[s]._id,
				distance: distance,
				quota: stores[s].quota,
				shared: shared
			});
		}
	// }
	}
}

// Divys
s = Stores.findOne()

if (Divys.find().count() === 0) {
	var divy_id = Divys.insert({
		store_id : s._id,
		archived: false
	});
}

// ProcessingDivys
if (ProcessingDivys.find().count() === 0) {
	ProcessingDivys.insert({
		divy_id: divy_id,
		driver_id: Drivers.findOne()._id,
		status: 1
	});
}

