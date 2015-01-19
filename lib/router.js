Router.configure({
  layoutTemplate: 'layout'
});

Router.map(function() {

  this.route('home', {path: '/'});

  this.route('storeMenu', {path: '/stores'});

  this.route('divyMenu', {
  	path: '/store/:_id',
  	data: function() {
  		return Stores.findOne(this.params._id);
  	}
  });

// if the user is in the current delivery window, calls the server to set up the appropriate
// cart, and then render the food menu.  
  // Router.onBeforeAction(function () {
  //   if (Meteor.myFunctions.InDeliveryWindow()) {
  //     Meteor.call('orderInDeliveryWindow', function(err, result) {
  //       if (err)
  //         return alert(err.reason);
  //       Router.go('foodMenu', {_id: result});
  //     });
  //   } else {
  //     this.next();
  //   }
  // }, {only: ['divyMenu']});

  this.route('foodMenu', {
    path: '/menu/:_id', 
    data: function() {
      return Stores.findOne(this.params._id);
    }
  });

  this.route('statusMenu', {path: '/status'});

  this.route('orderMenu', {
    path: '/orders/:_id',
    data: function() {
      return Stores.findOne(this.params._id);
    }
  });

  this.route('divyPage', {
    path: '/divys/:_id',
    data: function() { return Divys.findOne(this.params._id); 
    }
  });

  this.route('checkout', {path: '/checkout'});

  Router.onBeforeAction(function () {
    if (CurrentOrders.findOne({user_id: Meteor.userId()}) === undefined) {
      console.log("iron router working");
      this.render('StoreMenu');
    } else {
      this.next();
    }
  }, {only: ['checkout', 'foodMenu']});

  this.route('login', {path: '/login'});

  this.route('createAccount', {path: '/createAccount'});

  this.route('driverMenu', {path: '/driver'});

  this.route('myDivys', {path: '/mydivys'});

  this.route('newDivy', {path: '/new'});

  this.route('settingMenu', {path: '/settings'});
});