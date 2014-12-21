Router.configure({
  layoutTemplate: 'layout'
});

Router.map(function() {
  this.route('home', {path: '/'});
});


//Router.onBeforeAction(requireLogin, {only: ['chatInterface']});