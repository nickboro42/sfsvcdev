({
	searchHelper : function(component,event,getInputkeyWord) {
	  // call the apex class method 
     var action = component.get("c.fetchCustomerInstaller");
      // set param to method  
        action.setParams({
            'searchKeyWord': getInputkeyWord
          });
      // set a callBack    
        action.setCallback(this, function(response) {
            var state = response.getState();
            if (state === "SUCCESS") {
                var storeResponse = response.getReturnValue();
              // if storeResponse size is equal 0 ,display No Result Found... message on screen.
                if (storeResponse.length == 0) {
                    component.set("v.Message", $A.get("$Label.c.CC_No_Result_Found"));
                } else {
                    component.set("v.Message", $A.get("$Label.c.CC_PreciseMsg_Search"));
                }
                
                // set searchResult list with return value from server.
                component.set("v.listOfSearchRecords", storeResponse);
            }
 
        });
      // enqueue the Action  
        $A.enqueueAction(action);
    
	},

  clearLookup : function(component,event, helper){

    component.set("v.shippingSelected" , false);
    component.set("v.billingSelected" , false);
    var pillTarget = component.find("lookup-pill");
    var lookUpTarget = component.find("lookupField"); 

    $A.util.addClass(pillTarget, 'slds-hide');
    $A.util.removeClass(pillTarget, 'slds-show');

    $A.util.addClass(lookUpTarget, 'slds-show');
    $A.util.removeClass(lookUpTarget, 'slds-hide');

    component.set("v.SearchKeyWord",null);
    component.set("v.listOfSearchRecords", null );
  },

  handlerComponentEvent : function(component, event, helper){

    // get the selected Account record from the COMPONETN event    
    var selectedCustomerByEvent = event.getParam("customerInstallerByEvent");
    
    component.set("v.selectedRecord" , selectedCustomerByEvent);
    component.set("v.shippingSelected" , true);
    component.set("v.billingSelected" , true);
    component.set("v.shippingValue" , selectedCustomerByEvent.Customer__c);
    component.set("v.shippingValueAdr" , selectedCustomerByEvent.Customer__r.Name);
    component.set("v.billingValue" , selectedCustomerByEvent.Customer__c);
    component.set("v.billingValueAdr" , selectedCustomerByEvent.Customer__r.Name);

    var forclose = component.find("lookup-pill");
    $A.util.addClass(forclose, 'slds-show');
    $A.util.removeClass(forclose, 'slds-hide');


    var forclose = component.find("searchRes");
    $A.util.addClass(forclose, 'slds-is-close');
    $A.util.removeClass(forclose, 'slds-is-open');

    var lookUpTarget = component.find("lookupField");
    $A.util.addClass(lookUpTarget, 'slds-hide');
    $A.util.removeClass(lookUpTarget, 'slds-show');
  }
})