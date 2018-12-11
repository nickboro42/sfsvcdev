({
  
  keyPressController : function(component, event, helper) {
      // get the search Input keyword   
    var getInputkeyWord = component.get("v.SearchKeyWord");
      // check if getInputKeyWord size id more then 0 then open the lookup result List and 
      // call the helper 
      // else close the lookup result List part.   
        if( getInputkeyWord.length > 0 ){
             var forOpen = component.find("searchRes");
               $A.util.addClass(forOpen, 'slds-is-open');
               $A.util.removeClass(forOpen, 'slds-is-close');
            helper.searchHelper(component,event,getInputkeyWord);
        }
        else{  
            component.set("v.listOfSearchRecords", null ); 
             var forclose = component.find("searchRes");
               $A.util.addClass(forclose, 'slds-is-close');
               $A.util.removeClass(forclose, 'slds-is-open');
          }
         
  },
  
  // function for clear the Record Selaction 
    clear :function(component,event,helper){
      
      helper.clearLookup(component, event, helper);
    },
    
  // This function call when the end User Select any record from the result list.   
    handleComponentEvent : function(component, event, helper) {
     
    helper.handlerComponentEvent(component, event, helper);  

  },

  // automatically call when the component is done waiting for a response to a server request.  
    hideSpinner : function (component, event, helper) {
      var spinner = component.find('spinner');
      var evt = spinner.get("e.toggle");
      evt.setParams({ isVisible : false });
      evt.fire();    
    },
 // automatically call when the component is waiting for a response to a server request.
    showSpinner : function (component, event, helper) {
      var spinner = component.find('spinner');
      var evt = spinner.get("e.toggle");
      evt.setParams({ isVisible : true });
      evt.fire();    
    },

    handleValueChange : function(component, event, helper){

      var getCust = component.get("v.useCustomLookup");

      if(getCust){
        
        helper.clearLookup(component, event, helper);
      
      }

    }
})