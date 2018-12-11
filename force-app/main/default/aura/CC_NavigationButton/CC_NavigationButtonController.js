({
	navigateToPage : function(component, event, helper) {
        //console.log('navigateToPage');
		var urlEvent = $A.get("e.force:navigateToURL");
        //console.log("event created");
    	urlEvent.setParams({
      		"url": "/contactsupport"
    	});
        //console.log("params set");
    	urlEvent.fire();
        //console.log("fired");
	}
})