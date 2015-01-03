Template.login.events({
    'submit form': function(event, template){
        event.preventDefault();
        var emailVar = template.find('#login-email').value;
        var passwordVar = template.find('#login-password').value;
        Meteor.loginWithPassword(emailVar, passwordVar);
    }
});

Template.register.events({
	'submit form': function(event, template){
	    event.preventDefault();
	    var emailVar = template.find('#register-email').value;
	    var passwordVar = template.find('#register-password').value;
	    var passwordVarConfrim = template.find('#register-password-confirm').value;

	    if (passwordVar === passwordVarConfrim) {
		    Accounts.createUser({
		        email: emailVar,
		        password: passwordVar
		    });
	    } else {
	    	return alert("password does not match dumbass.")
	    }
	}
});