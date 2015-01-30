Router.configure({
  layoutTemplate: 'layout'
});

Router.map(function() {
// ===============================================================================================
// Hooks
// ===============================================================================================

  // login checking
  var checkLoginStatus = function() {
    if (!Meteor.user()) {
      this.render('login');
    } else if (Drivers.findOne({user_id: Meteor.userId()})) {
      this.render('driverMenu');
    } else {
      this.next();
    }
  };
  Router.onBeforeAction(checkLoginStatus, {only: [
    'pickupMenu',
    'userHome',
    'newDivy',
    'foodMenu',
    'checkout'
    ]});

  // pickup checking
  var checkLoginStatus = function() {
    if (!Meteor.user().profile.pickup_id) {
      this.render('pickupMenu');
    } else {
      this.next();
    }
  };
  Router.onBeforeAction(checkLoginStatus, {only: [
    'userHome',
    'newDivy',
    'foodMenu',
    'checkout'
    ]});

  // check if cart/currentOrder has been set up before showing menu and checkout
  Router.onBeforeAction(function () {
    if (CurrentOrders.findOne({user_id: Meteor.userId()}) === undefined) {
      this.render('userHome');
    } else {
      this.next();
    }
  }, {only: ['checkout', 'foodMenu']});

// ===============================================================================================
// End of hooks
// ===============================================================================================


// ===============================================================================================
// Route Paths
// ===============================================================================================

  // user flow routes
  this.route('userHome', {path: '/'});

  this.route('newDivy', {path: '/newDivy'});

  this.route('foodMenu', {
    path: '/menu/:_id',
    data: function() {
      return Stores.findOne(this.params._id);
    }
  });

  this.route('checkout', {path: '/checkout'});

  this.route('login', {path: '/login'});

  this.route('createAccount', {path: '/createAccount'});

  this.route('settingMenu', {path: '/settings'});

  // driver flow routes
  this.route('driverMenu', {path: '/driver'});
});

  // this.route('divyMenu', {
  //  path: '/store/:_id',
  //  data: function() {
  //    return Stores.findOne(this.params._id);
  //  }
  // });

  // this.route('home', {path: '/'});

  // this.route('storeMenu', {path: '/'});

  // this.route('statusMenu', {path: '/status'});

  // this.route('orderMenu', {
  //   path: '/orders/:_id',
  //   data: function() {
  //     return Stores.findOne(this.params._id);
  //   }
  // });

  // this.route('divyPage', {
  //   path: '/divys/:_id',
  //   data: function() { return Divys.findOne(this.params._id); 
  //   }
  // });

  // this.route('myDivys', {path: '/mydivys'});

  // this.route('newDivy', {path: '/new'});