// Users
if (Meteor.users.find().count() === 0) {
  var user_id = Accounts.createUser({
      username: "Tony",
      password: "password"
    });
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


Divys
var divys = [
	{
		store_id: store_id,
		title: "omfg i'm so hungry",
		quota: 200
	},{
		store_id: store_id,
		title: "lets get this quick",
		quota: 200
	}
];
if (Divys.find().count() === 0) {
	var divy_id = Divys.insert(divys[0]);
	Divys.insert(divys[1]);
}


// //Orders
// if (Orders.find().count() === 0) {
// 	var order_id = Orders.insert({
// 		user_id: user_id,
// 		store_id: store_id
// 	});
// }


// //DivyOrders
// if (DivyOrders.find().count() === 0) {
// 	var divy_order_id = DivyOrders.insert({
// 		divy_id:divy_id,
// 		order_id:order_id
// 	});
// }


// //OrderItems
// if (OrderItems.find().count() === 0) {
// 	var order_item_id = OrderItems.insert({
// 		order_id: order_id
// 	});
// }

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

// No fixture data for OrderItems

// All delivery data
if (DeliveryWindows.find().count() === 0) {

	store_a = Stores.find().fetch();
  
  	for (i=0; i<store_a.length; i++) {
  		a = Divys.insert({
  			title: "Delivery Window",
  			store_id: store_a[i]._id,
  			quota: 0
  		});
		w = DeliveryWindows.insert({
			depart_time: 2000,
			arrival_time: 2045,
			divy_id: a
		});
		d = Accounts.createUser({
	      	username: "Driver" + (1 + i),
	      	password: "password"
	    });
	  	Drivers.insert({
	    	user_id: d,
	    	delivery_window: w
	  	});

  		a = Divys.insert({
  			title: "Delivery Window",
  			store_id: store_a[i]._id,
  			quota: 0
  		});
		w = DeliveryWindows.insert({
			depart_time: 2100,
			arrival_time: 2145,
			divy_id: a
		});
		d = Accounts.createUser({
	      	username: "Driver" + (2 + i),
	      	password: "password"
	    });
	  	Drivers.insert({
	    	user_id: d,
	    	delivery_window: w
	  	});

  		a = Divys.insert({
  			title: "Delivery Window",
  			store_id: store_a[i]._id,
  			quota: 0
  		});
		w = DeliveryWindows.insert({
			depart_time: 2200,
			arrival_time: 2245,
			divy_id: a
		});
		d = Accounts.createUser({
	      	username: "Driver" + (3 + i),
	      	password: "password"
	    });
	  	Drivers.insert({
	    	user_id: d,
	    	delivery_window: w
	    });

  		a = Divys.insert({
  			title: "Delivery Window",
  			store_id: store_a[i]._id,
  			quota: 0
  		});
		w = DeliveryWindows.insert({
			depart_time: 2300,
			arrival_time: 2345,
			divy_id: a
		});
		d = Accounts.createUser({
	      	username: "Driver" + (4 + i),
	      	password: "password"
	    });
	 	Drivers.insert({
	    	user_id: d,
	    	delivery_window: w
	    });

  		a = Divys.insert({
  			title: "Delivery Window",
  			store_id: store_a[i]._id,
  			quota: 0
  		});
		w = DeliveryWindows.insert({
			depart_time: 0000,
			arrival_time: 0045,
			divy_id: a
		});
		d = Accounts.createUser({
	      	username: "Driver4",
	      	password: "password"
	    });
	  	Drivers.insert({
	    	user_id: d,
	    	delivery_window: w
	    });
	}
}
