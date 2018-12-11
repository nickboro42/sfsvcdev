({
    openmodal: function(component,event,helper) {

        var urlEvent = $A.get("e.force:navigateToURL");
          
          //console.log("event created");
          urlEvent.setParams({
            "url": "/newinstaller"
          });
          
          //console.log("params set");
          urlEvent.fire();
        // var cmpTarget = component.find('Modalbox');
        // var cmpBack = component.find('Modalbackdrop');
        // $A.util.addClass(cmpTarget, 'slds-fade-in-open');
        // $A.util.addClass(cmpBack, 'slds-backdrop--open'); 
    }

})