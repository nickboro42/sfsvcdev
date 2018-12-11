/**
 * Created by PE_LE on 19-Jun-17.
 */
({
    getUserID : function(component, event) {
      console.log('getUserID function triggered');

      var action = component.get("c.getUserId");

      action.setCallback(this, function(response) {
          console.log('getUserID call back');
          console.log(response);
          var state = response.getState();
          if(state === "SUCCESS"){
              console.log('getUserID callback successful');
              var returnedData = response.getReturnValue();
              console.log(returnedData);
              component.set("v.userId", returnedData[0]);
          }
          else if (state === "INCOMPLETE") {
              // do something
          }
          else if (state === "ERROR") {
              var errors = response.getError();
              if (errors) {
                  if (errors[0] && errors[0].message) {
                      console.log("Error message: " +
                               errors[0].message);
                  }
              } else {
                  console.log("Unknown error");
              }
          }
      });

      $A.enqueueAction(action);

    },

    getAccountID : function(component, event) {
      console.log('getAccountID function triggered');

      var action = component.get("c.getAccountId");

      action.setCallback(this, function(response) {
          console.log('getAccountID call back');
          console.log(response);
          var state = response.getState();
          if(state === "SUCCESS"){
              console.log('getAccountID callback successful');
              var returnedData = response.getReturnValue();
              console.log(returnedData);
              component.set("v.accountId", returnedData[0]);
          }
          else if (state === "INCOMPLETE") {
              // do something
          }
          else if (state === "ERROR") {
              var errors = response.getError();
              if (errors) {
                  if (errors[0] && errors[0].message) {
                      console.log("Error message: " +
                               errors[0].message);
                  }
              } else {
                  console.log("Unknown error");
              }
          }
      });

      $A.enqueueAction(action);

    },

    getUserData : function(component, event) {
      console.log('getUserData function triggered');

      var action = component.get("c.getUserData");

      var that = this;

      action.setCallback(this, function(response) {
          console.log('getUserData call back');
          console.log(response);
          var state = response.getState();
          if(state === "SUCCESS"){
              console.log('getUserData callback successful');
              var returnedData = response.getReturnValue();
              console.log(returnedData);
              component.set("v.userId", returnedData[0]);
              component.set("v.contactId", returnedData[1]);
              component.set("v.accountId", returnedData[2]);
              component.set("v.role", returnedData[3]);
              component.set("v.locationId", returnedData[4]);
              component.set("v.locationName", returnedData[5]);
              that.getInstalledBaseLocation(component, event);
          }
          else if (state === "INCOMPLETE") {
              // do something
          }
          else if (state === "ERROR") {
              var errors = response.getError();
              if (errors) {
                  if (errors[0] && errors[0].message) {
                      console.log("Error message: " +
                               errors[0].message);
                  }
              } else {
                  console.log("Unknown error");
              }
          }
      });

      $A.enqueueAction(action);

    },

    getInstalledBaseLocation : function(component, event) {
      console.log('getInstalledBaseLocation function triggered');
      var action = component.get("c.getInstalledBaseLocation");

      action.setCallback(this, function(response) {
          var state = response.getState();
          if(state === "SUCCESS"){
              var returnedData = response.getReturnValue();
                for(var key in returnedData) {
                    var systemsNumVar = Object.keys(returnedData[key].installedBasedSystem).length;
                    var listInstalledBasedSystems = returnedData[key].installedBasedSystem;
                    var basesNumVar = Object.keys(returnedData[key].installedBases).length;
                    var listInstalledBases = returnedData[key].installedBases;
                    if (systemsNumVar > 0 && listInstalledBasedSystems[0].Name.length > 0) {
                        returnedData[key].showBaseSystem = 'True';
                    } else {
                        returnedData[key].showBaseSystem = '';
                    }
                    if(basesNumVar > 0 && listInstalledBases[0].Name.length > 0) {
                        returnedData[key].showOrphanBases = 'True';
                    } else {
                        returnedData[key].showOrphanBases = '';
                    }
                }

                component.set("v.locationList", returnedData);

          }
          else if (state === "INCOMPLETE") {
              // do something
          }
          else if (state === "ERROR") {
              var errors = response.getError();
              if (errors) {
                  if (errors[0] && errors[0].message) {
                      console.log("Error message: " +
                               errors[0].message);
                  }
              } else {
                  console.log("Unknown error");
              }
          }
      });

      $A.enqueueAction(action);

    },
})