/**
 * Created by PE_LE on 09-Jun-17.
 */
({
    openModelRequestExchange: function(component, event, helper) {
        component.set("v.isOpen", true);
        component.set("v.requestExchange", true);
        component.set("v.modalTitle", $A.get("$Label.c.CC_Request_Exchange"));
    },

    openModelRequestSparePart: function(component, event, helper) {
        component.set("v.isOpen", true);
        component.set("v.modalTitle", $A.get("$Label.c.CC_Request_Spare_Part"));
    },

    closeModel: function(component, event, helper) {
        component.set("v.isOpen", false);
        helper.resetAttributes(component, event);
    },

    typeValueSelected: function(component, event, helper) {
        // console.log("typeValueSelected triggered");
        var typeValue = component.get("v.typeValue");
        // console.log(typeValue);
        if (typeValue == "Choose One"){
            component.set("v.typeSelected", false);
        } else {
            component.set("v.typeSelected", true);
        }
        helper.checkSubmit(component, event);
    },

    termsAccepted: function(component, event, helper){
        var termsAccepted = component.get("v.termsAccepted");

        if(termsAccepted) {
            component.set("v.termsAccepted", false);
        } else {
            component.set("v.termsAccepted", true);
        }
        helper.checkSubmit(component, event);
    },

    priorityValueSelected: function(component, event, helper) {
          // console.log("priorityValueSelected triggered");
          var priorityValue = component.get("v.priorityValue");
          // console.log(priorityValue);
          if (priorityValue == "--None--"){
              component.set("v.prioritySelected", false);
          } else {
              component.set("v.prioritySelected", true);
          }
          helper.checkSubmit(component, event);
    },

    submitRequest: function(component, event, helper) {
        
        component.set("v.isOpen", false);

        var shippingAddressValue = component.get("v.shippingAddressValue");
        var billingAddressValue = component.get("v.billingAddressValue"); 
        var useShippingAddressAccount = component.get("v.useShippingAddressAccount");
        
        if(useShippingAddressAccount){
            
            shippingAddressValue = component.get("v.shippingAddressAccount");
            
            if(shippingAddressValue.indexOf("error") !== -1 || typeof(shippingAddressValue) == "undefined") {
                
                shippingAddressValue = "N/A";
            
            } else {

                shippingAddressValue = $A.get("$Label.c.CC_Use_Account_Address");
            }

        }else{
            
            helper.updateCaseForCustomer(component,event,helper);
            shippingAddressValue = component.get("v.addShipping");
        }

        var useBillingAddressAccount = component.get("v.useBillingAddressAccount");
         
        if(useBillingAddressAccount){
            
            billingAddressValue = component.get("v.billingAddressAccount");
            
            if(billingAddressValue.indexOf("error") !== -1 || typeof(billingAddressValue) == "undefined") {
                
                billingAddressValue = "N/A";
            
            } else {
                
                billingAddressValue = $A.get("$Label.c.CC_Use_Account_Address");
            }

        }else{
            
            helper.updateCaseForCustomer(component,event,helper);
            billingAddressValue = component.get("v.addBilling");
        }

        var userDescription = component.get("v.commentsValue");

        if(userDescription == null || userDescription == "") {
            // console.log("userDescription null empty or undefined");
            userDescription = "N/A"
        }

        var textComment =
            "Type: \n" + component.get("v.typeValue") + "\n \n" +
            "Priority: \n" + component.get("v.priorityValue") + "\n \n" +
            "Shipping Address: \n" + shippingAddressValue + "\n \n" +
            "Billing Address: \n" + billingAddressValue + "\n \n" +
            "Description: \n" + userDescription + "\n \n";

        component.set("v.commentTotal", textComment);
        helper.addCommentTrigger(component,event);
        //helper.resetAttributes(component, event);
        //helper.refresher(component,event);
       
    },

    ShipAddressCheck: function(component, event, helper) {

        // console.log('ShipAddressCheck triggered');
        component.set("v.shippingAddressValue", "");

        var useShippingAddressAccount = component.get("v.useShippingAddressAccount");
        if(useShippingAddressAccount){
            component.set("v.useShippingAddressAccount", false);
            component.set("v.shippingAddressSelected", false);
        } else {
            component.set("v.useShippingAddressAccount", true);
            component.set("v.shippingAddressSelected", true);
        }
        helper.checkSubmit(component, event);
    },

    inputShippingAddress: function(component, event, helper) {
      // console.log('inputShippingAddress triggered');
      var shippingAddressValue = component.get("v.shippingAddressValue");
      // console.log(shippingAddressValue);

      if(shippingAddressValue != null && shippingAddressValue != "") {
          component.set("v.useShippingAddressAccount", false);
          component.set("v.shippingAddressSelected", true);
      } else {
          component.set("v.shippingAddressSelected", false);
      }
        helper.checkSubmit(component, event);
    },

    BillAddressCheck: function(component, event, helper) {
        //console.log('BillAddressCheck triggered');
        component.set("v.billingAddressValue", "");

        var useBillingAddressAccount = component.get("v.useBillingAddressAccount");
        if(useBillingAddressAccount){
            component.set("v.useBillingAddressAccount", false);
            component.set("v.billingAddressSelected", false);
        } else {
            component.set("v.useBillingAddressAccount", true);
            component.set("v.billingAddressSelected", true);
        }
        helper.checkSubmit(component, event);
    },

    inputBillingAddress: function(component, event, helper) {
      // console.log('inputBillingAddress triggered');
      var billingAddressValue = component.get("v.billingAddressValue");
      // console.log(billingAddressValue);

      if(billingAddressValue != null && billingAddressValue != "") {
          component.set("v.useBillingAddressAccount", false);
          component.set("v.billingAddressSelected", true);
      } else {
          component.set("v.billingAddressSelected", false);
      }
        helper.checkSubmit(component, event);
    },

    displayTerms: function(component, event, helper){
        // console.log('controller.displayTerms');
        component.set("v.showTermsAndConditions",true);
    },

   hideTerms: function(component, event, helper){
        // console.log('controller.hideTerms');
        component.set("v.showTermsAndConditions",false);
    },

    doInit : function(component, event, helper) {
        // console.log('doInit Request Exchange triggered');
        helper.checkCommentHelper(component, event, helper);
        helper.resetAttributes(component, event);
        

        var action = component.get("c.validateCase");
        action.setParams({
            "caseId": component.get("v.recordId")
        });
        action.setCallback(this, function(response) {
            var state = response.getState();
            if(state === "SUCCESS"){
                var returnedData = response.getReturnValue();
                component.set("v.validationResult", returnedData);
                if(returnedData == 'OK'){
                } else if(returnedData == 'NoInstalledBase') {
                    component.set("v.validationError", true);
                    component.set("v.validationErrorMessage", $A.get("$Label.c.CC_NoInstalledBase"));
                } else if(returnedData == 'NoWarranty') {
                    component.set("v.validationError", true);
                    component.set("v.validationErrorMessage", $A.get("$Label.c.CC_NoWarranty"));
                }
                //console.log('calling getTypePicklist');
            }
            else if (state === "INCOMPLETE") {
                // do something
            }
            else if (state === "ERROR") {
                var errors = response.getError();
                if (errors) {
                    if (errors[0] && errors[0].message) {
                        // console.log("Error message: " +
                        //          errors[0].message);
                    }
                } else {
                    // console.log("Unknown error");
                }
            }
        });
        
        helper.getPrioritiesPicklist(component, event);
        component.set("v.billingAddressAccount", '');
        component.set("v.shippingAddressAccount", '');
    }

})