({
	searchHelper : function(component,event,getInputkeyWord) {
	  // call the apex class method 
     var action = component.get("c.fetchAccount");
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

    listCountryObjects: function (component, event, helper){

        //console.log('listCountryObjects');

        var action = component.get("c.listCountries");
        action.setStorable();

        action.setCallback(this, function(response){

            var state = response.getState();

            if(component.isValid() && state === "SUCCESS"){
                var countries = response.getReturnValue();
                component.set('v.countries', countries);

            }

        });

        $A.enqueueAction(action);
    }
})