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

if (Stores.find().count() === 0) {
	var store_id = Stores.insert({
		storeName: "In-n-Out"
	});
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

if (Divys.find().count() === 0) {
	var divy_id = Divys.insert({
		store_id: store_id,
		driver_id: driver_id
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