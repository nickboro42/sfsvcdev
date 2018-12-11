({
/**
    Copyright: Salesforce 2017
    Original Author: dharfleet
    Date: 2017-05-18

    A cookie banner component
*/

	
	getUserTypeFromPlatform : function(component, event, helper) {

        console.log('debug version', 6);

		console.log('getUserTypeFromPlatform');

        var action = component.get("c.shouldShowBanner");
         
        action.setCallback(this, this.onResponse);

        console.log('enqueing action',action);

        $A.enqueueAction(action);

	},


    onResponse: function(response, component){

        console.log('onResponse', response);

        var state = response.getState();
        console.log('state', state);

        if (component.isValid() && state === "SUCCESS") {

            var shouldShowBanner = response.getReturnValue();
            console.log('shouldShowBanner initial', shouldShowBanner);
            

            if(sessionStorage){
                
                if(sessionStorage.getItem('seenAndClosedCookieBanner') == 'true'){
                    shouldShowBanner = false;
                    console.log('its a revisit in same session');
                }else{
                    console.log('its revisit in same session, but cookie not there so assume user never closed');
                    sessionStorage.getItem('seenAndClosedCookieBanner')
                }
            }
            else{
                console.log('sessionStorage NOT found');
            }

            console.log('shouldShowBanner calculated', shouldShowBanner);
            if(shouldShowBanner == true){
                this.openBanner(component);
            }
                
        }
        else {
            this.handleServerError(component, state, response);
        }
    },


    openBanner: function(component){
        var banner = component.find("banner");
        $A.util.removeClass(banner, 'bannerOff');

    },


    closeBanner: function(component){

        console.log('helper.closeBanner');

        var banner = component.find("banner");
        $A.util.addClass(banner, 'bannerOff');

        if(sessionStorage){
            console.log('setting seenAndClosedCookieBanner to true');
            sessionStorage.setItem('seenAndClosedCookieBanner', 'true');
            console.log(sessionStorage);
        }
        else{
            console.log('no session storage :-(');
        }
    },


    navigateToKnowledgeArticle: function(articleId){
        var navigationEvent = $A.get("e.force:navigateToSObject");
        navigationEvent.setParams({
          "recordId": articleId
        });
        navigationEvent.fire();
    },


	handleServerError: function(component, state, response){
        if (component.isValid() && state === "ERROR") {
            var errors = response.getError();
            var errorText = '';
            console.log('errors:');
            console.log(errors);
            if (errors) {
                if (errors[0] && errors[0].message) {
                    console.log("Error message[0]: ");
                    console.log(errors[0].message);
                    errorText = errors[0].message;
                }
                var arrayLength = errors.length;
                for (var i = 0; i < arrayLength; i++) {
                    console.log("Error message[" + i + "]: ");
                    console.log(errors[i].message);
                }
            }
            component.set("v.errorText",errorText);
        }
        else if (component.isValid && (state == "INCOMPLETE" || state == "RUNNING" || state == "ABORTED"))
        {
            console.log(state);
            component.set("v.errorText",state);
        }
    }
})