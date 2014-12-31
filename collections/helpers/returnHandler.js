 return_handler = function(status, message, result) {
	if (!status)
		status = 0;
	if (!message)
		message = "";
	if (!result)
		result = undefined;

	var r_obj = {status: status, message: message, result: result};

	return r_obj;
};