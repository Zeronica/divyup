Template.backButton.events({
	'click .btn': function(e) {
		e.preventDefault();
		// big sin in coding
		eval(this.router_code);
	}
})