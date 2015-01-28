Router.configure({
  layoutTemplate: 'layout'
});

Router.map(function() {
  var checkLoginStatus = function() {
    console.log("in status");
    if (!Meteor.user()) {
      this.render('login');
    } else if (Drivers.findOne({user_id: Meteor.userId()})) {
      console.log("in check");
      this.render('driverMenu');
    } else {
      this.next();
    }
  };
  Router.onBeforeAction(checkLoginStatus, {only: ['home', 'storeMenu']});


  this.route('home', {path: '/'});

  this.route('storeMenu', {path: '/stores'});

  this.route('divyMenu', {
  	path: '/store/:_id',
  	data: function() {
  		return Stores.findOne(this.params._id);
  	}
  });

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