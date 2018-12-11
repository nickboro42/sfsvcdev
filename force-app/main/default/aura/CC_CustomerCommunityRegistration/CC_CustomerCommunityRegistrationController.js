({
    doInit : function(component, event, helper) {
        //TODO - replace helper.setCountry call with helper.listCountryObjects
            // for now, they are both called
        //helper.setCountry(component,event,helper);
        helper.listCountryObjects(component, event, helper);
        helper.listLanguage(component, event, helper);
        component.set('v.showSpinner', false);
    },


    handleSelfRegister: function (component, event, helper) {
        console.log('controller.handleSelfRegister');
        helper.registerUser(component, event, helper);
    },

    onKeyUp: function(component, event, helper){
        console.log('controller.onKeyUp');
        //checks for "enter" key
        if (event.getParam('keyCode')===13) {
            helper.validateForm(component, event, helper);
        }
    },
    
    reveilInstallerSection: function(component, event, helper){
        var yourSelect = document.getElementById( "select-02" );
        console.log( yourSelect.options[ yourSelect.selectedIndex ].value );
        if(yourSelect.options[ yourSelect.selectedIndex ].value == "Installer"){
            component.set("v.IsInstaller",true);
        }
         else{
            component.set("v.IsInstaller",false);
             
         }
        helper.validateForm(component, event, helper);
    },

    onBlur:  function(component, event, helper){
        console.log('controller.onBlur');
        helper.validateForm(component, event, helper);
    },

    displayTerms: function(component, event, helper){
        console.log('controller.displayTerms');
        component.set("v.showModal",true);
    },

    hideTerms: function(component, event, helper){
        console.log('controller.hideTerms');
        component.set("v.showModal",false);
    },

    displayCookiesUsage: function(component, event, helper){
        console.log('controller.displayTerms');
        component.set("v.showCookiesUsageBox",true);
    },

    hideCookiesUsage: function(component, event, helper){
        console.log('controller.hideTerms');
        component.set("v.showCookiesUsageBox",false);
    },

    onChangeCountryPicklist:  function(component, event, helper){
        var selectedcountry = event.getSource().get("v.value");
        var allcountries = component.get("v.countries");
        var selectedRegions = component.get("v.regions");
        for(var i = 0; i<allcountries.length; i++){
           if(allcountries[i].value == selectedcountry ){
               component.set("v.regions",allcountries[i].regions);
           }
        }

    }, 

    moreInfo : function(component, event, helper){

        console.debug('moreInfo');

        var articleId = component.get("v.FindOutWhyTextURL");
        console.debug(articleId);
        var urlEvent = $A.get("e.force:navigateToURL");
        urlEvent.setParams({
            "url": articleId,
            "isredirect":"true"
        });
        urlEvent.fire();
    },


    displayInfoLanguage: function(component, event, helper){
        console.log('controller.displayInfoLanguage');
        component.set("v.showInfoLanguage",true);
    },

    hideInfoLanguage: function(component, event, helper){
        console.log('controller.hideInfoLanguage');
        component.set("v.showInfoLanguage",false);
    },

    displayInfoInvNum: function(component, event, helper){
        console.log('controller.displayInfoInvNum');
        component.set("v.showInfoInviteNum",true);
    },

    hideInfoInvNum: function(component, event, helper){
        console.log('controller.hideInfoInvNum');
        component.set("v.showInfoInviteNum",false);
    },

})