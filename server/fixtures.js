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
		quota: 120
	},
	{
		storename: 'Wendys',
		estimated_time: 3600000,
		delivery_start: 64800000,
		delivery_end: 90000000,
		quota: 100
	},
	{
		storename: 'Jack-in-the-box',
		estimated_time: 3600000,
		delivery_start: 64800000,
		delivery_end: 90000000,
		quota: 100
	},
	{
		storename: 'Mcdonalds',
		estimated_time: 3600000,
		delivery_start: 64800000,
		delivery_end: 90000000,
		quota: 100	
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
		description: "inside Unit 1"
	});
	Pickups.insert({
		name: "Unit 2",
		description: "inside Unit 2"
	});
	Pickups.insert({
		name: "Unit 3",
		description: "inside Unit 3"
	});
	Pickups.insert({
		name: "Foothill",
		description: "inside Foothill"
	});
	Pickups.insert({
		name: "Clark Kerr",
		description: "inside Clark Kerr"
	});
}
