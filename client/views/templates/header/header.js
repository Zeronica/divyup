Template.header.events({
	'click [name=menuToggle]': function(e) {
		e.preventDefault();
        $("#wrapper").toggleClass("toggled");
	},

	'click #back': function(e) {
		eval(this.back_route);
	}
});

Template.header_stealth.events({
	'click [name=new]': function(e) {
		e.preventDefault();
		Router.go('newDivy');
	}
});