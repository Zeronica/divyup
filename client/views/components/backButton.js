Template.backButton.events({
	'click .btn': function(e) {
		e.preventDefault();
		Router.go(this.to_name);
	}
})