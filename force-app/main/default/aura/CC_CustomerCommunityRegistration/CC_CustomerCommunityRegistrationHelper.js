({


    // SPRINT 7
    // note: this function name must NOT be the same as the apex method name
    // there is a known issue caused if they are the same
    listCountryObjects: function (component, event, helper){

        console.log('listCountryObjects');

        var action = component.get("c.listCountries");
        action.setStorable();
         
        action.setCallback(this, this.onListCountryResponse);

        console.log('enqueing action - listCountries',action);

        $A.enqueueAction(action);
    },


    // SPRINT 7
    onListCountryResponse: function(response, component){

        console.log('onListCountryResponse', response);
        
        var state = response.getState();
        console.log('state', state);

        if (component.isValid() && state === "SUCCESS") {

            var countries = response.getReturnValue();
            console.log('countries', countries);
            component.set('v.countries', countries);
            console.log('v.countries', component.get('v.countries'));
                
        }
        else {
            this.handleServerError(component, state, response);
        }
        
    },



    setCountry: function (component,event,helper) {
        var action = component.get("c.getCountries");
        action.setCallback(this, function(response){
            var state = response.getState();
            console.log(state);

            if (component.isValid() && state === "SUCCESS") {
                console.log("action result: SUCCESS ");
                console.log(response);
                var options = response.getReturnValue();
                var countryPicklist = document.getElementById( "select-03" );
                var option = document.createElement("option");
                option.value = "none";
                option.label = $A.get("$Label.c.CC_SelfReg_Is_Installer_Default");
                option.selected = true;
                countryPicklist.appendChild(option);

                options.forEach(function(element) {
                    console.log(element.label);
                    console.log(element.value);
                    var option = document.createElement("option");
                    option.value = element.value;
                    option.label = element.label;
                    countryPicklist.appendChild(option);
                });
            }
            else {
                helper.handleServerError(component, state, response);
            }
        });

        console.log('enqueing action',action);

        $A.enqueueAction(action);
    },


    // Added By Anass ASBAHI
    listLanguage: function (component, event, helper){

        console.log('listLanguage');

        var action = component.get("c.getLanguages");
        action.setStorable();
         
        action.setCallback(this, function(response){

            var state = response.getState();

            if(component.isValid() && state === "SUCCESS"){

                component.set('v.languages', response.getReturnValue());

            }

        });

        console.log('enqueing action - listLanguage',action);

        $A.enqueueAction(action);
    },




    validateForm: function(component, event, helper) {
        //debugger;
        var salutionSelect = document.getElementById( "select-01" );
        var salution = salutionSelect.options[ salutionSelect.selectedIndex ].value;
        var firstName = component.get("v.firstName");
        var lastName = component.get("v.lastName");
        var email = component.get("v.email");
        var street = component.get("v.street");
        var city = component.get("v.city");
        //var regionOfCountry = component.get("v.regionOfCountry");
        var postalCode = component.get("v.postalCode");
        var country = component.get("v.country");
        //var country = countrySelect.options[ countrySelect.selectedIndex ].value;
        //var regionOfCountrySelect = document.getElementById( "select-04" );
        //var regionOfCountry = regionOfCountrySelect.options[ regionOfCountrySelect.selectedIndex ].value;
        var regionOfCountry = component.get("v.regionOfCountry");
        var salutionSelect = document.getElementById( "select-02" );
        var installerSwitch = salutionSelect.options[ salutionSelect.selectedIndex ].value;
        var invitationNumber = component.get("v.invitationNumber");
        var taxNumber = component.get("v.taxNumber");
        var language = component.get("v.language");

        var wrapperDivList = ['sfdc_Salutation_container','sfdc_firstname_container','sfdc_lastname_container','sfdc_email_container','sfdc_street_container','sfdc_city_container','sfdc_region_container','sfdc_country_container','sfdc_postalCode_container','sfdc_installerSwitch_container','sfdc_language'];

        var requiredMap = {
            'sfdc_Salutation_container' : salution,
            'sfdc_firstname_container' : firstName,
            'sfdc_lastname_container' : lastName,
            'sfdc_email_container'    : email,
            'sfdc_street_container'   : street,
            'sfdc_city_container'     : city,
            'sfdc_region_container' : regionOfCountry,
            'sfdc_country_container'  : country,
            'sfdc_installerSwitch_container': installerSwitch,
            'sfdc_postalCode_container' : postalCode,
            'sfdc_language'             : language
        };
        //alert(salution+firstName+lastName+email+street+city+postalCode+country+regionOfCountry);
        var lettersMap = {
            'sfdc_firstname_container' : firstName,
            'sfdc_lastname_container' : lastName,
            'sfdc_city_container' : city,
            'sfdc_region_container' : regionOfCountry,
        };
        var lettersWithNumbersMap = {
            'sfdc_postalCode_container' : postalCode
            //'sfdc_street_container'   : street
        };
        var numberMap = {};
        var emailMap = {'sfdc_email_container' : email};

        var validForm = false;
        var continueToOtherValidation = true;
        Object.keys(requiredMap).forEach(function(objectKey){
            console.log(requiredMap[objectKey]);
            if(!helper.required(requiredMap[objectKey])){
                component.set("v.displayButton",false);
                validForm = false;
                continueToOtherValidation = false;
            }
        });

        if(continueToOtherValidation) {

            validForm = true;

            wrapperDivList.forEach(function(element){
                helper.removeError(element);
                console.log(element);
            });
            console.log('i am hea');
            Object.keys(lettersMap).forEach(function(objectKey){
                if (!helper.allLetter(lettersMap[objectKey])) {
                    validForm = false;
                    helper.setError(objectKey,$A.get("$Label.c.SVC_LettersError"));
                }
            });
            if (helper.required(postalCode)) {
                if(!helper.allLettersAndNumbers(postalCode)){
                    validForm = false;
                    helper.setError('sfdc_postalCode_container',$A.get("$Label.c.SVC_LetterAndNumbers"));
                }
            };
            Object.keys(emailMap).forEach(function(objectKey){
                if (!helper.mailFormat(emailMap[objectKey])) {
                    validForm = false;
                    helper.setError(objectKey,$A.get("$Label.c.SVC_MailError"));
                }
            });

            if(installerSwitch == 'Installer'){
                if(!helper.required(invitationNumber)){
                    validForm = false;
                    helper.setError('sfdc_invitenumber_container',$A.get("$Label.c.SVC_requiredError"));
                }
            }

            var confirm = document.getElementById("confirm");
            if(!confirm.checked){
                validForm = false;
                component.set("v.displayButton",false);
            }
            if(validForm){
                component.set("v.displayButton",true);
            }

            var confirmCookies = document.getElementById("confirmCookies");
            if(!confirmCookies.checked){
                validForm = false;
                component.set("v.displayButton",false);
            }
            if(validForm){
                component.set("v.displayButton",true);
            }

        }
        else{
            var continueCheck = true;
            var input;
            if(event.target!=undefined) {
                input = event.target.value;
            }
            if(!input && event.getSource().get('v.value') != undefined){
                input = event.getSource().get('v.value');
            }
            if(input==undefined && event.getSource().getElement()) {
                input = event.getSource().getElement().value;
            }
            if(input!=undefined){
                var requiredCheck = helper.getKeyFromMap(requiredMap,input);
                var textCheck = helper.getKeyFromMap(lettersMap,input);
                var numbersLettersCheck = helper.getKeyFromMap(lettersWithNumbersMap,input);
                var emailCheck = helper.getKeyFromMap(emailMap,input);

                if(requiredCheck){
                    if(!helper.required(input)){
                        validForm = false;
                        continueCheck = false;
                        helper.setError(requiredCheck,$A.get("$Label.c.SVC_requiredError"));
                    }
                    else{
                        helper.removeError(requiredCheck);
                    }
                }
                if(continueCheck && textCheck){
                    if(!helper.allLetter(input)){
                        validForm = false;
                        continueCheck = false;
                        helper.setError(textCheck,$A.get("$Label.c.SVC_LettersError"));
                    }
                    else{
                        helper.removeError(textCheck);
                    }
                }
                if(continueCheck && numbersLettersCheck){
                    if(!helper.allLettersAndNumbers(input)){
                        validForm = false;
                        continueCheck = false;
                        helper.setError(numbersLettersCheck,$A.get("$Label.c.SVC_LetterAndNumbers"));
                    }
                    else{
                        helper.removeError(numbersLettersCheck);
                    }
                }
                if(continueCheck && emailCheck){
                    if(!helper.mailFormat(input)){
                        validForm = false;
                        continueCheck = false;
                        helper.setError(emailCheck,$A.get("$Label.c.SVC_MailError"));
                    }
                    else{
                        helper.removeError(emailCheck);
                    }
                }
            }
        }
        if(!validForm){
            component.set("v.displayButton",false);
        }
        return validForm;
    },
    setError : function(input, errorText){
        var elem = document.getElementById(input);
        if(elem){
            elem.classList.add("errorDiv");
            elem.nextSibling.innerText = errorText;
        }
    },
    removeError : function(input){
        var elem = document.getElementById(input);
        elem.classList.remove("errorDiv");
        elem.nextSibling.innerText = "";
    },
    getKeyFromMap : function(validateObject, inputId){
        var key;
        for(var i in validateObject){
            if(validateObject[i] == inputId){
                key = i;
            }
        }
        return key;
    },

    registerUser: function(component, event, helper){
        var isInstallerSelection = component.get("v.IsInstaller");
        if(isInstallerSelection == true){
            this.registerInstallerCall(component, event, helper);
        }
        else if(isInstallerSelection == false){
            this.registerEndCustomerCall(component, event, helper);
        }
        else{
            //TODO - validation fail, error message to make a selection
        }

    },

    registerEndCustomerCall: function(component, event, helper){

        console.log('helper.registerEndCustomerCall');
        var salutionSelect = document.getElementById( "select-01" );
        var salutation = salutionSelect.options[ salutionSelect.selectedIndex ].value;
        var firstname = encodeURIComponent(component.get("v.firstName"));
        var lastname = encodeURIComponent(component.get("v.lastName"));
        var email = component.get("v.email");
        var street = encodeURIComponent(component.get("v.street"));
        var city = encodeURIComponent(component.get("v.city"));
        //var regionOfCountry = encodeURIComponent(component.get("v.regionOfCountry"));
        //var countrySelect = document.getElementById( "select-03" );
        //var country = countrySelect.options[ countrySelect.selectedIndex ].value;
        var country = component.get("v.country");
        var language = component.get("v.language");
        //var regionOfCountrySelect = document.getElementById( "select-04" );
        //var regionOfCountry = regionOfCountrySelect.options[ regionOfCountrySelect.selectedIndex ].value;
        var regionOfCountry = component.get("v.regionOfCountry");
        var postalCode = encodeURIComponent(component.get("v.postalCode"));
        var regConfirmUrl = decodeURIComponent(component.get("v.regConfirmUrl"));

        var valid = helper.validateForm(component, event, helper);

        if(valid){
            component.set('v.displayButton', false);
            component.set('v.showSpinner', true);
            var action = component.get("c.registerEndCustomer");
        action.setParams(
            {
                salutation : salutation,
                firstName : firstname,
                lastName : lastname,
                email : email,
                street : street,
                city : city,
                regionOfCountry : regionOfCountry,
                country : country,
                language : language,
                postalCode : postalCode,
                regConfirmUrl:regConfirmUrl
            }
        );

        console.log(action.getParams());

        action.setCallback(this, function(response){
            if (component.isValid()){
                component.set('v.displayButton', false);
                component.set('v.showSpinner', false);
            }

            var state = response.getState();
            console.log(state);


            if (component.isValid() && state === "SUCCESS") {
                console.log("action result: SUCCESS ");
                console.log(response);
                console.log(response.getReturnValue());

            }
            else {
                helper.handleServerError(component, state, response);
            }
        });

        console.log('enqueing action',action);

        $A.enqueueAction(action);
    }

    },


    registerInstallerCall: function(component, event, helper){

        console.log('helper.registerInstallerCall');

        var salutionSelect = document.getElementById( "select-01" );
        var salutation = salutionSelect.options[ salutionSelect.selectedIndex ].value;
        var firstname = component.get("v.firstName");
        var lastname = component.get("v.lastName");
        var email = component.get("v.email");
        var street = component.get("v.street");
        var city = component.get("v.city");
        //var regionOfCountry = component.get("v.regionOfCountry");
        //var countrySelect = document.getElementById( "select-03" );
        //var country = countrySelect.options[ countrySelect.selectedIndex ].value;
        var postalCode = component.get("v.postalCode");
        var inviteNumber = component.get("v.invitationNumber");
        var taxCode = component.get("v.taxNumber");
        var country = component.get("v.country");
        var language = component.get("v.language");
        var regionOfCountry = component.get("v.regionOfCountry");
        var regConfirmUrl = decodeURIComponent(component.get("v.regConfirmUrl"));

        var valid = helper.validateForm(component, event, helper);

       if(valid){
        component.set('v.displayButton', false);
        component.set('v.showSpinner', true);
        var action = component.get("c.registerInstaller");
        action.setParams(
            {
                salutation : salutation,
                firstName : firstname,
                lastName : lastname,
                email : email,
                street : street,
                city : city,
                regionOfCountry : regionOfCountry,
                country : country,
                language : language,
                postalCode : postalCode,
                inviteNumber : inviteNumber,
                taxcode : taxCode,
                regConfirmUrl:regConfirmUrl
            }
        );

       component.set('v.showSpinner', true);

       console.log(action.getParams());

       action.setCallback(this, function(response){

           var state = response.getState();
           console.log(state);

           if(component.isValid()){
               component.set('v.displayButton', true);
               component.set('v.showSpinner', false);
           }

           if (component.isValid() && state === "SUCCESS") {
                console.log("action result: SUCCESS ");
                console.log(response);
                console.log(response.getReturnValue());
                component.set('v.showSpinner', false);
            }
           else {
               helper.handleServerError(component, state, response);
           }
        });
        console.log('enqueing action',action);

        $A.enqueueAction(action); 
       }
    },

    required : function(inputText){
        return (inputText === undefined || inputText == null || inputText.length <= 0 || inputText == 'none' || inputText == '') ? false : true;
    },

    allLetter : function(inputText){
        if(/[1234567890!@#$%^&*()~;?.,\-\_:{}|+=<>:{}|+=<>\x27\x22]/.exec(inputText)){
            return false;
        }
        return true;
    },

    allLettersAndNumbers : function(inputText){
        if(/[!@#$%^&*()~;?.,:{}|+=<>:{}\-\_|+=<>\x27\x22]/.exec(inputText)){
            return false;
        }
        return true;
    },

    mailFormat : function(email){
        email = email.replace(/\s+/g, '');
        if(/[\x27\x22\x20]/.exec(email)){
            return false;
        }
        var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(email);
    },

    allNumber : function(inputText){
        return isNaN(inputText) === false;
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