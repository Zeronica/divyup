Template.login.events({
    'submit form': function(event, template){
        event.preventDefault();
        var usernameVar = template.find('#login-username').value;
        var passwordVar = template.find('#login-password').value;
        login(usernameVar, passwordVar);
    }
});

Template.createAccount.events({
	'submit form': function(event, template){
	    event.preventDefault();
	    var usernameVar = template.find('#register-username').value;
	    var passwordVar = template.find('#register-password').value;
	    var passwordVarConfirm = template.find('#register-password-confirm').value;

	    if (passwordVar === passwordVarConfirm) {
		    Accounts.createUser({
		        username: usernameVar,
		        password: passwordVar
		    }, function(err, username, password) {
		          if (err) {
		            alert(err);
		          } else {
		          	Router.go('home'); // bad code
		          }
		    });
	    } else {
	    	return alert("password does not match dumbass.")
	    }
	}
});

var login = function(usernameVar, passwordVar) {
	Meteor.loginWithPassword(usernameVar, passwordVar, function(err){
	    if (err)
	        alert(err);
     });
}