// Users
if (Meteor.users.find().count() === 0) {
  var user_id = Accounts.createUser({
      username: "Tony",
      password: "password"
    });

  var driver_user_id = Accounts.createUser({
  	username: "Driver",
  	password: "password"
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

// // Orders
// if (Orders.find().count() === 0) {
// 	var order_id = Orders.insert({
// 		user_id : user_id,
// 		store_id : s._id
// 	});
// }