/**
 * Created by PE_LE on 19-Jun-17.
 */
({
    doInit : function(component, event, helper) {
        console.log('doInit My PV Plants triggered');
        //helper.getUserData(component, event);
        helper.getInstalledBaseLocation(component, event);

    },

    handleClick : function(component, event, helper) {
        console.log('arrow clicked!!!');
        console.log('event: ');
        console.log(event.target);
        console.log(event.getSource().get("v.name"));
        var buttonName = event.getSource().get("v.name");
        var buttonIconName = event.getSource().get("v.iconName");
        console.log('buttonIconName: ');
        console.log(buttonIconName);
        if(buttonIconName == "utility:chevronright") {
            event.getSource().set("v.iconName", "utility:chevrondown");
        } else if(buttonIconName == "utility:chevrondown") {
            event.getSource().set("v.iconName", "utility:chevronright");
        }

        var basesElement = document.getElementById(buttonName);
        console.log('basesElement: ');
        console.log(basesElement);
        basesElement.classList.toggle('slds-is-expanded');
        basesElement.classList.toggle('slds-is-collapsed');


    },

})