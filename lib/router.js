Router.configure({
  layoutTemplate: 'layout'
});

Router.map(function() {

  this.route('home', {path: '/'});

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
  
  this.route('checkoutMenu', {
    path: '/checkout/:_id',
    data: function() { return OrderItems.findOne(this.params._id); 
    } 
  });

  this.route('login', {path: '/login'});

  this.route('createAccount', {path: '/createAccount'});

  this.route('storeMenu', {path: '/stores'});

  this.route('driverMenu', {path: '/driver'});

  this.route('myDivys', {path: '/mydivys'});

  this.route('newDivy', {path: '/new'});

  this.route('settingMenu', {path: '/settings'});
});