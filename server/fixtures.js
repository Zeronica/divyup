if (Meteor.users.find().count() === 0) {
  var user_id = Accounts.createUser({
      username: "Tony",
      password: "password"
    });
}

if (Stores.find().count() === 0) {
	var store_id = Stores.insert({
		storeName: "In-n-Out"
	});
}

if (Menus.find().count() === 0) {
	var menu_id = Menus.insert({
		store_id: store_id
	});
}

if (MenuItems.find().count() === 0) {
	var menu_item_id = MenuItems.insert({
		menu_id: menu_id,
		name: "Triple Cheese and meat burger",
		price: 6.99
	});
}

if (Drivers.find().count() === 0) {
	var driver_id = Drivers.insert({
		storeName: "In-n-Out",
		store_id: store_id
	});
}

if (Orders.find().count() === 0) {
	var order_id = Orders.insert({
		store_id: store_id,
		driver_id: driver_id
	});
}

if (OrderUsers.find().count() === 0) {
	var order_user_id = OrderUsers.insert({
		order_id: order_id,
		user_id: user_id
	});
}

if (OrderUserItems.find().count() === 0) {
	OrderUserItems.insert({
		order_id: order_id,
		menu_item_id: menu_item_id
	});
}


