/**
 * Created by PE_LE on 12-Jun-17.
 */
({
    getPrioritiesPicklist : function(component, event) {
      //console.log('getPrioritiesPicklist function triggered');

      var action = component.get("c.getPriorities");

      action.setCallback(this, function(response) {
          var state = response.getState();
          if(state === "SUCCESS"){
              //console.log('callback successful');
              var returnedData = response.getReturnValue();
              //console.log(returnedData);
              component.set("v.priorities", returnedData);
          }
          else if (state === "INCOMPLETE") {
              // do something
          }
          else if (state === "ERROR") {
              var errors = response.getError();
              if (errors) {
                  if (errors[0] && errors[0].message) {
                      /*console.log("Error message: " +
                               errors[0].message);*/
                  }
              } else {
                  //console.log("Unknown error");
              }
          }
      });

      $A.enqueueAction(action);
    },

    addCommentTrigger : function(component, event) {
      //console.log('addCommentTrigger function triggered');

      var action = component.get("c.addComment");
      action.setParams({
          "caseId": component.get("v.recordId"),
          "commentText": component.get("v.commentTotal")
      });

      var that = this;

      action.setCallback(this, function(response) {
          //console.log('addCommentTrigger call back');
          //console.log(response);
          var state = response.getState();
          if(state === "SUCCESS"){
              var returnedData = response.getReturnValue();
              //that.document.getElementByClass("slds-button slds-button--icon-border cuf-refresh uiButton").click();
              //that.resetAttributes(component, event);
              that.refresher(component, event);
          }
          else if (state === "INCOMPLETE") {
              // do something
          }
          else if (state === "ERROR") {
              var errors = response.getError();
              if (errors) {
                  if (errors[0] && errors[0].message) {
                      /*console.log("Error message: " +
                               errors[0].message);*/
                  }
              } else {
                  //console.log("Unknown error");
              }
          }
      });

      $A.enqueueAction(action);

    },
    
    checkSubmit: function(component, event){

        var termsAccepted = component.get("v.termsAccepted");
        var submitButtonDisabled = document.getElementById("submitButton").disabled;
        var typeSelected = component.get("v.typeSelected");
        var prioritySelected = component.get("v.prioritySelected");
        var shippingAddressSelected = component.get("v.shippingAddressSelected");
        var billingAddressSelected = component.get("v.billingAddressSelected");

        if(termsAccepted && submitButtonDisabled && typeSelected && prioritySelected && prioritySelected && shippingAddressSelected && billingAddressSelected) {
            document.getElementById("submitButton").disabled = false;
        } else {
            document.getElementById("submitButton").disabled = true;
        }
    },

    resetAttributes: function(component, event) {
      //console.log("resetAttributes triggered");
      component.set("v.typeValue", "Choose One");
      component.set("v.priorityValue", "Choose One");
      component.set("v.shippingAddressValue", "");
      component.set("v.billingAddressValue", "");
      component.set("v.commentsValue", "");
      component.set("v.commentsValue", "");
      component.set("v.typeSelected", false);
      component.set("v.prioritySelected", false);
      component.set("v.shippingAddressSelected", false);
      component.set("v.billingAddressSelected", false);
      component.set("v.termsAccepted", false);
      component.set("v.submitEnabled", false);
      component.set("v.useBillingAddressAccount", false);
      component.set("v.useShippingAddressAccount", false);

    },

    checkCommentHelper : function(component, event , helper) {
        
        var action = component.get("c.checkIfCaseComment");
        
        action.setParams({
          "caseId": component.get("v.recordId")
        });

        action.setCallback(this, function(response) {
            
            var state = response.getState();
            if(state === "SUCCESS"){
                var returnedData = response.getReturnValue();
                //console.log("test :" +returnedData);
                component.set("v.isResult", returnedData);
               //console.log('calling anasss calbaack '+returnedData);
            }
            
            else if (state === "INCOMPLETE") {
                // do something
            }   
                else if (state === "ERROR") {
                    var errors = response.getError();
                    if (errors) {
                        if (errors[0] && errors[0].message) {
                            /*console.log("Error message Anass: " + 
                                        errors[0].message);*/
                        }
                    } else {
                        //console.log("Unknown error");
                    }
                }
        });
        $A.enqueueAction(action);   
        
    }, 

    updateCaseForCustomer : function(component, event, helper){

      var action = component.get("c.updateCase");
      //console.log('the action of update :' +action);
      action.setParams({

        "caseId" : component.get("v.recordId"),
        "installerId" : component.get("v.shippingAddressValue"),
        "customerId"  : component.get("v.billingAddressValue"),
      });

     action.setCallback(this, function(response) {
          //console.log(response);
          var state = response.getState();
          if(state === "SUCCESS"){
              //console.log('callback successful');
              var returnedData = response.getReturnValue();
              //alert('======== AAAA : '+returnedData);
              //console.log(returnedData);
              
          }
          else if (state === "INCOMPLETE") {
              // do something
          }
          else if (state === "ERROR") {
              var errors = response.getError();
              if (errors) {
                  if (errors[0] && errors[0].message) {
                      /**console.log("Error message: " +
                               errors[0].message);*/
                  }
              } else {
                  //console.log("Unknown error");
              }
          }
      });

      $A.enqueueAction(action);
    },

    refresher: function(component,event) {
        var urlEvent = $A.get("e.force:navigateToURL");
          urlEvent.setParams({

            "url": '/case/'+component.get("v.recordId"),
            "isredirect" : true
          });
          urlEvent.fire();
    }
    
})