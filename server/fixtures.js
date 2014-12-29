// Users
if (Meteor.users.find().count() === 0) {
  var user_id = Accounts.createUser({
      username: "Tony",
      password: "password"
    });
  var user_driver_id = Accounts.createUser({
  	username: "TheCourier",
  	password: "password"
  })
}


//Stores
var stores = [
	{
		storename: 'In-n-Out',
		distance: '10',
		distance_unit: 'mi',
		open: true
	},
	{
		storename: 'Wendys',
		distance: '7',
		distance_unit: 'mi',
		open: true
	},
	{
		storename: 'Jack-in-the-box',
		distance: '6',
		distance_unit: 'mi',
		open: false
	},
	{
		storename: 'Mcdonalds',
		distance: '8',
		distance_unit: 'mi',
		open: true
	}
];

if (Stores.find().count() === 0) {
	var store_id = Stores.insert(stores[0]);
	Stores.insert(stores[1]);
	Stores.insert(stores[2]);
	Stores.insert(stores[3]);
}


//Divys
var divys = [
	{
		title: "omfg i'm so hungry",
		quota: 200,
		total: 185,
		store_id: store_id
	},{
		title: "lets get this quick",
		quota: 200,
		total: 75,
		store_id: store_id
	}
];
if (Divys.find().count() === 0) {
	var divy_id = Divys.insert(divys[0]);
	Divys.insert(divys[1]);
}

/*reference table for status of the driver*/
/*array implementation leaves potential for server error*/
if (DriverStatus.find().count() === 0) {
	DriverStatus.insert({
		reference: ["Inactive", "Going", "Returning", "Delivering"]
	});
}

if (Drivers.find().count() === 0) {
	var driver_id = Drivers.insert({
		user_id: user_driver_id,
		driverName: "Courier",
		store_id: store_id,
		status: 0
	});
}

if (Orders.find().count() === 0) {
	var order_id = Orders.insert({
		divy_id: divy_id
	});
}

if (MenuItems.find().count() === 0) {
	var menu_item_id = MenuItems.insert({
		store_id: store_id,	
		name: "Triple Cheese and meat burger",
		price: 6.99
	});
}

if (OrderItems.find().count() === 0) {
	OrderItems.insert({
		order_id: order_id,
		menu_item_id: menu_item_id
	});
}