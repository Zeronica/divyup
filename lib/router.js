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

  this.route('statusMenu', {path: '/status'});

  this.route('orderMenu', {path: '/orders'});

  this.route('storeMenu', {path: '/stores'});

  this.route('driverMenu', {path: '/driver'});
});


//Router.onBeforeAction(requireLogin, {only: ['chatInterface']});