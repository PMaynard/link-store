# link-store
A Place To Store Links

    curl -F 'url=https://duckduckgo.com/' https://port22.co.uk/links

Bash shorthand create **~/plink.sh**:

    #!/bin/bash
    curl -F "url=$1" https://port22.co.uk/links

Add an alias to your **~/.bashrc**

    alias plink='sh ~/Dropbox/plink.sh'

Now you can add links by running: 

    plink https://matrix.ac

# Bookmarklet

	(function(){
	  var post_to_url = function(path, params, method) {
	    var openWindow = window.open(path);
	    method = method || "post"; 
	    var form = openWindow.document.createElement("form");
	    form.setAttribute("method", method);
	    form.setAttribute("action", path);
	    for(var key in params) {
		var hiddenField = document.createElement("input");
		hiddenField.setAttribute("type", "hidden");
		hiddenField.setAttribute("name", key);
		hiddenField.setAttribute("value", params[key]);
		form.appendChild(hiddenField);
	    }
	    openWindow.document.body.appendChild(form);
	    form.submit();
	  };
	post_to_url(
	  'https://port22.co.uk/links', 
	  {url: window.location.href });
	})()

URL

	javascript:(function(){var%20post_to_url=function(path,params,method){var%20openWindow=window.open(path);method=method||"post";var%20form=openWindow.document.createElement("form");form.setAttribute("method",method);form.setAttribute("action",path);for(var%20key%20in%20params){var%20hiddenField=document.createElement("input");hiddenField.setAttribute("type","hidden");hiddenField.setAttribute("name",key);hiddenField.setAttribute("value",params[key]);form.appendChild(hiddenField);}openWindow.document.body.appendChild(form);form.submit();};post_to_url('https://port22.co.uk/links',{url:window.location.href});})()

Click [here](javascript:(function(){var%20post_to_url=function(path,params,method){var%20openWindow=window.open(path);method=method||"post";var%20form=openWindow.document.createElement("form");form.setAttribute("method",method);form.setAttribute("action",path);for(var%20key%20in%20params){var%20hiddenField=document.createElement("input");hiddenField.setAttribute("type","hidden");hiddenField.setAttribute("name",key);hiddenField.setAttribute("value",params[key]);form.appendChild(hiddenField);}openWindow.document.body.appendChild(form);form.submit();};post_to_url('https://port22.co.uk/links',{url:window.location.href});})())
