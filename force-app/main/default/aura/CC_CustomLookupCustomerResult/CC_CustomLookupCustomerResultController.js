({
   selectCustomerInstaller : function(component, event, helper){      
    // get the selected Account from list  
      var getSelectCustomerInstaller = component.get("v.oCustomerInstaller");
    // call the event   
      var compEvent = component.getEvent("oSelectedCustomerInstallerEvent");
    // set the Selected Account to the event attribute.  
         compEvent.setParams({"customerInstallerByEvent" : getSelectCustomerInstaller });  
    // fire the event  
         compEvent.fire();
    }
})